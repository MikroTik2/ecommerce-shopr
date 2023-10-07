const express = require("express");
const router = express.Router();
const { createProduct, getAllProduct, getProduct, addToCart, removeProductWishlist, addToWWishlist, updateProduct, updateCartItemQuantity, selectColorAndSize, rating, removeProduct, deleteProduct } = require("../controller/productCtrl.js");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware.js");

// post
router.post("/", authMiddleware, isAdmin, createProduct);

// get
router.get("/", getAllProduct);
router.get("/:id", getProduct);

// put
router.put("/cart", authMiddleware, addToCart);
router.put("/wishlist", authMiddleware, addToWWishlist);
router.put("/rating", authMiddleware, rating);
router.put("/quantity/:id", authMiddleware, updateCartItemQuantity);
router.put("/select/:id", authMiddleware, selectColorAndSize);
router.put("/:id", updateProduct);

// delete
router.delete("/remove", authMiddleware, removeProduct);
router.delete("/remove-wishlist", authMiddleware, removeProductWishlist);
router.delete("/:id", deleteProduct);

module.exports = router;