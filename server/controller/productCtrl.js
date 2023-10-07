const Product = require("../models/productModel.js");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateMongoDbId = require("../utils/validateMongoDbId.js");

// ====================================================== POST

// create a product
const createProduct = asyncHandler(async (req, res) => {
    try {

        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        };

        const newProduct = await Product.create(req.body);
        res.json(newProduct);

        req.body.new = true;

        setTimeout(async () => {
            await Product.findByIdAndUpdate(newProduct._id, { $set: { newDateProduct: false } });
        }, 3 * 24 * 60 * 60 * 1000);

    } catch (error) {
        throw new Error(error);
    };
});

// ====================================================== GET
 
// get a product
const getProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {

        const findProduct = await Product.findById(id).populate({ path: "ratings.postedby", select: "-password" });
        const updateViews = await Product.findByIdAndUpdate(id, {
            $inc: { numViews: 1 },
        }, { new: true });
        res.json(findProduct);

    } catch (error) {
        throw new Error(error);
    };
});

// get all a product
const getAllProduct = asyncHandler(async (req, res) => {
    try {

    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];

    excludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));

    if (req.query.sort) {

        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);

    } else {
        query = query.sort("-createdAt");
    };

    if (req.query.fields) {

        const fields = req.query.fields.split(",").join(" ");
        query = query.select(fields);

    } else {
        query = query.select("-__v");
    };

    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);
    
    if (req.query.page) {
        const productCount = await Product.countDocuments();
        if (skip >= productCount) throw new Error("This page does not exists");
    };

    query = query.populate({
        path: "ratings.postedby",
        select: "-password",
    });

    const product = await query;
    res.json(product);
        
    } catch (error) {
        throw new Error(error);
    }
});

// ====================================================== UPDATE

// add to wishlist
const addToWWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { prodId } = req.body;

    try {

        const user = await User.findById(_id);
        const alreadyAdded = user.wishlist.find((id) => id.toString() === prodId);

        if (alreadyAdded) {

            let user = await User.findByIdAndUpdate(_id, {
                $pull: { wishlist: prodId },
            }, { new: true });

            res.json(user);

        } else {
            
            let user = await User.findByIdAndUpdate(_id, {
                $push: { wishlist: prodId },
            }, { new: true });

            res.json(user);

        };

    } catch (error) {
        throw new Error(error);
    };
});

// add to cart 
const addToCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { prodId } = req.body;

    try {

        const user = await User.findById(_id);
        const alreadyAdded = user.cart.find((id) => id.toString() === prodId);

        if (alreadyAdded) {

            let user = await User.findByIdAndUpdate(_id, {
                $pull: { cart: prodId },
            }, { new: true });

            res.json(user);

        } else {

            const user = await User.findByIdAndUpdate(_id, {
                $push: { cart: prodId },
            }, { new: true });

            res.json(user);

        };

    } catch (error) {
        throw new Error(error);
    };
});

// add to color and size
const selectColorAndSize = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { colorchose, sizechose } = req.body;

    try {
        
        const product = await Product.findByIdAndUpdate(id, {
            $set: { colorchose, sizechose },
        }, { new: true });

        res.json(product);

    } catch (error) {
        throw new Error(error);
    };
});

// quantity 
const updateCartItemQuantity = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    validateMongoDbId(id);

    try {

        const product = await Product.findById(id);
        if (!product) throw new Error("product not found");

        product.quantity = quantity;

        await product.save();

        res.json(product);

    } catch (error) {
        throw new Error(error);
    };
});

// rating
const rating = asyncHandler(async (req, res) => {
    const { _id } = req.user; 
    const { star, comment, prodId } = req.body;
  
    try {
  
      const product = await Product.findById(prodId);
      if (!product) throw new Error("Not found product");
  
      let alreadyRated = product.ratings.find(
        (userId) => userId.postedby.toString() === _id.toString()
      );
    
      if (alreadyRated) {
   
        const updateRating = await Product.updateOne({
          ratings: { $elemMatch: alreadyRated },
        }, {
          $set: { "ratings.$.star": star, "ratings.$.comment": comment },
        }, { new: true });
         
      } else {
  
        const rateProduct = await Product.findByIdAndUpdate(prodId, {

            $push: {
                ratings: {
                    star: star,
                    comment: comment,
                    postedby: _id,
                },
            }}, { new: true });
        };
  
        const getAllRatings = await Product.findById(prodId);
    
        let totalRating = getAllRatings.ratings.length;
        let ratingSum = getAllRatings.ratings
            .map((item) => item.star)
            .reduce((prev, curr) => prev + curr, 0);
    
        let actualRating = Math.round(ratingSum / totalRating);
        let finalProduct = await Product.findByIdAndUpdate(prodId, {
            totalrating: actualRating,
        }, { new: true });
  
        res.json(finalProduct); 
  
    } catch (error) {
      throw new Error(error);
    };
});

// update a product
const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {

        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        };

        const updateProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updateProduct);

    } catch (error) {
        throw new Error(error);
    };
});

// ====================================================== DELETE

// remove a cart
const removeProduct = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { prodId } = req.body;

    try {

        let user = await User.findByIdAndUpdate(_id, {
            $pull: { cart: prodId },
        }, { new: true });
        
        res.json(user);

    } catch (error) {
        throw new Error(error);
    };
});

// remove a wishlist
const removeProductWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { prodId } = req.body;

    try {

        let user = await User.findByIdAndUpdate(_id, {
            $pull: { wishlist: prodId },
        }, { new: true });
        
        res.json(user);

    } catch (error) {
        throw new Error(error);
    };
});

 // delete a product
const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {

        const deleteProduct = await Product.findByIdAndDelete(id);
        res.json(deleteProduct);

    } catch (error) {
        throw new Error(error);
    };
});

module.exports = { createProduct, getAllProduct, getProduct, addToCart, removeProductWishlist, addToWWishlist, updateProduct, updateCartItemQuantity, selectColorAndSize, rating, removeProduct, deleteProduct };