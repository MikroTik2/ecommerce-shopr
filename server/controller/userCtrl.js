const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const multer = require("multer");
const path = require("path");
const User = require("../models/userModel.js");
const sendEmail = require("../controller/emailCtrl.js");
const sendContact = require("../controller/contactCtrl.js");
const sendQuestion = require("../controller/questionCtrl.js");
const validateMongoDbId = require("../utils/validateMongoDbId.js");
const { generateToken } = require("../config/jwtToken.js");
const { generateRefreshToken } = require("../config/refreshToken.js");

// ====================================================== POST

// create a user
const createUser = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const findUser = await User.findOne({ email: email });

    if (!findUser) {

        const newUser = await User.create(req.body);

        const accessToken = generateToken(newUser?._id);
        const refreshToken = generateRefreshToken(newUser?._id);

        const updateUser = await User.findByIdAndUpdate(newUser._id, {
            refreshToken: refreshToken,
        });

        const userData = {
            _id: newUser._id,
            firstname: newUser?.firstname,
            username: newUser?.username,
            avatar: newUser?.avatar,
            token: accessToken,
            refreshToken: refreshToken,
        };

        res.json(userData);

    } else {
        throw new Error("user already exists");
    };
});

// login a user
const loginUser = asyncHandler (async (req, res) => {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });   

    try {

        if (findUser && (await findUser.isPasswordMatched(password))) {

            const accessToken = generateToken(findUser?._id);
            const refreshToken = generateRefreshToken(findUser?._id);
            const updateUser = await User.findByIdAndUpdate(findUser.id, {
                refreshToken: refreshToken,
            }, { new: true });
    
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge: 72 * 60 * 60 * 1000,
            });
    
            res.json({
                _id: findUser?._id,
                firstname: findUser?.firstname,
                username: findUser?.username,
                avatar: findUser?.avatar,
                token: accessToken,
                refreshToken: refreshToken,
            });
    
        } else {
            throw new Error("Invalid password")
        };
        
    } catch (error) {
        throw new Error("There was an error logging in");
    };
});

// login a admin
const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const findAdmin = await User.findOne({ email });

    if (findAdmin.role !== "admin") throw new Error("you not autorized admin");
    if (findAdmin && (await findAdmin.isPasswordMatched(password))) {

        const refreshToken = generateRefreshToken(findAdmin?._id);
        const updateAdmin = await User.findByIdAndUpdate(findAdmin.id, {
            refreshToken: refreshToken,
        }, { new: true });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });

        res.json({
            _id: findAdmin?._id,
            firstname: findAdmin?.firstname,
            username: findAdmin?.username,
            avatar: findUser?.avatar,
            email: findAdmin?.email,
            token: generateToken(findAdmin?._id),
        });

    } else {
        throw new Error("invalid credentials");
    };
});

// message contact
const userContact = asyncHandler(async (req, res) => {
    try {
        const { firstname, lastname, emailaddress, message } = req.body;

        const emailData = {
            to: 'recipient@gmail.com',
            subject: 'Contact Form Submission',
            text: `Name: ${firstname} ${lastname}\nEmail: ${emailaddress}\nMessage: ${message}`,
            html: `<p>Name: ${firstname} ${lastname}</p><p>Email: ${emailaddress}</p><p>Message: ${message}</p>`,
        };

        sendContact(emailData);

    } catch (error) {
        throw new Error(error);
    };
});

// ask question a user
const userQuestion = asyncHandler(async (req, res) => {
    try {

        const { firstname, numberPhone, emailaddress, message} = req.body;

        const emailData = {
            to: 'recipient@gmail.com',
            subject: 'Ask a Question from Submission',
            text: `Name ${firstname} Email: ${emailaddress}\nNumber Phone: ${numberPhone}\nMessage: ${message}`,
            html: `<p>Name: ${firstname}</p><p>Email: ${emailaddress}</p><p>Number Phone: ${numberPhone}</p><p>Message: ${message}</p>`,
        };

        sendQuestion(emailData);

    } catch (error) {
        throw new Error(error);
    };
});

// forgot password token 
const forgotPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) throw new Error("user not found with this");

    try {

        const token = await user.createPasswordResetPassword();

        await user.save();

        const resetURL = `hi, please follow this link to reset your password. this link is valid till 10 minutes from now. <a href="http://localhost:4000/api/user/reset-password/${token}">Click here</a>`

        const data = {
            to: email,
            text: "Hey user!",
            subject: "Forgot password token",
            html: resetURL,
        };

        sendEmail(data);

        res.json(token);

    } catch (error) {
        throw new Error(error);
    };

});

// reset password
const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;

    try {

        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() },
        });

        if (!user) throw new Error("token expired, please try again later");

        user.password = password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        await user.save();

        res.json(user);

    } catch (error) {

        throw new Error(error);
    };
});

// ====================================================== GET

// logout a user
const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;

    if (!cookie?.refreshToken) throw new Error("no refresh token in cookies");
  
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
  
    if (!user) {
  
      res.clearCookie("refreshToken", {

        httpOnly: true,
        secure: true,

      });
  
      return res.sendStatus(204); 
  
    };
  
    await User.findOneAndUpdate({ refreshToken }, {

      refreshToken: "",

    });
  
    res.clearCookie("refreshToken", {

      httpOnly: true,
      secure: true,

    });
  
    res.sendStatus(204);
  
});

// handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;

    if (!cookie?.refreshToken) throw new Error("no refresh token in cookies");

    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });

    if (!user) throw new Error("no refresh token present in db or not matched");

    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {

        if (err || user.id !== decoded.id) {
          throw new Error("there is something wrong with refresh token");
        };
    
        const accessToken = generateToken(user?._id);
    
        res.json({ accessToken });

    });
});

// get a cart
const getCartUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);

    try {

        const cart = await User.findById(_id).populate("cart");
        res.json(cart);

    } catch (error) {
        throw new Error(error);
    };
});

// get a wishlist
const getWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);

    try {

        const wishlist = await User.findById(_id).populate("wishlist");
        res.json(wishlist);

    } catch (error) {
        throw new Error(error);
    };
});

// get a user
const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {

        const findUser = await User.findById(id);
        res.json(findUser);

    } catch (error) {
        throw new Error(error);
    };
});

// get all a user
const getAllUser = asyncHandler(async (req, res) => {
    try {

        const findAllUser = await User.find()
        res.json(findAllUser);

    } catch (error) {
        throw new Error(error);
    };
});

// ====================================================== UPDATE

// update a user
const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);

    try {

        const updateUser = await User.findByIdAndUpdate(_id, {
            firstname: req?.body?.firstname,
            username: req?.body?.username,
        }, { new: true });

        res.json(updateUser);
        
    } catch (error) {
        throw new Error(error);
    };
});

// update a password
const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { newPassword, oldPassword, repeatNewPassword } = req.body;
    validateMongoDbId(_id);

    try {

        const user = await User.findById(_id);

        if (!user) throw new Error("User not found");
        if (!await user.isPasswordMatched(oldPassword)) throw new Error("Old password is incorrect");
        if (newPassword !== repeatNewPassword) throw new Error("New password and repeat password do not match");

        user.password = newPassword;
        user.passwordChangeAt = new Date();

        const updateUser = await user.save();
        res.json(updateUser);

    } catch (error) {
        throw new Error(error);
    };
});

// update a avatar
const updateAvatar = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { avatar } = req.body;
    
    try {

        const user = await User.findById(_id);

        if (avatar) {
            
            user.avatar = avatar;

            const updateAvatar = await user.save();
            res.json(updateAvatar);

        } else {

            res.json(user);

        };

    } catch (error) {
        throw new Error(error);
    };
});

// address a user
const addressUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { street, country, city, state, zip } = req.body;

    try {

        const user = await User.findById(_id);

        user.address = {
            street, 
            country, 
            city, 
            state, 
            zip,
        };

        const updateAddress = await user.save();

        res.json(updateAddress);

    } catch (error) {
        throw new Error(error);
    };
});
 
// block a user
const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {

        const block = await User.findByIdAndUpdate(id, {
            isBlocked: true
        }, { new: true });

        res.json(block);
        
    } catch (error) {
        throw new Error(error);
    };
});

// unblock a user
const unBlockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {

        const unBlock = await User.findByIdAndUpdate(id, {
            isBlocked: false,
        }, { new: true });

        res.json(unBlock);

    } catch (error) {
        throw new Error(error);
    };
});

// ====================================================== DELETE

// delete a user
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {

        const deleteUser = await User.findByIdAndDelete(id);
        res.json(deleteUser);

    } catch (error) {
        throw new Error(error);
    };
});

module.exports = { 
    createUser, 
    loginUser, 
    loginAdmin, 
    resetPassword, 
    getUser, 
    getAllUser, 
    getCartUser, 
    getWishlist, 
    logout, 
    forgotPasswordToken, 
    handleRefreshToken, 
    updateUser, 
    updateAvatar,
    updatePassword, 
    addressUser,
    blockUser, 
    unBlockUser, 
    deleteUser,
    userContact,
    userQuestion,
};