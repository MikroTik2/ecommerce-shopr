const express = require("express");
const router = express.Router();
const { 
    createUser, 
    loginUser, 
    loginAdmin, 
    getUser, 
    resetPassword, 
    getAllUser, 
    getCartUser, 
    addressUser,
    logout, 
    forgotPasswordToken, 
    handleRefreshToken,
    updateAvatar,
    getWishlist,
    updateUser, 
    updatePassword,
    blockUser, 
    unBlockUser, 
    userQuestion,
    userContact,
    deleteUser 
} = require("../controller/userCtrl.js");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware.js");

// post
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/login-admin", loginAdmin);
router.post("/contact", userContact);
router.post('/question', userQuestion);
router.post("/forgot-password-token", forgotPasswordToken);
router.post("/reset-password/:token", resetPassword);

// get
router.get("/all-user", getAllUser);
router.get("/logout", logout);
router.get("/refresh", handleRefreshToken);
router.get("/cart", authMiddleware, getCartUser);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/:id", authMiddleware, isAdmin, getUser);

// put
router.put("/edit-user", authMiddleware, updateUser);
router.put("/update-password", authMiddleware, updatePassword);
router.put("/update-avatar", authMiddleware, updateAvatar);
router.put("/address", authMiddleware, addressUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unBlockUser);

// delete
router.delete("/", authMiddleware, isAdmin, deleteUser);



module.exports = router;