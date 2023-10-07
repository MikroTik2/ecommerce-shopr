const express = require("express");
const router = express.Router();
const { createBlog, getBlog, getAllBlog, userComment, updateBlog, deleteBlog } = require("../controller/blogCtrl.js");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware.js");

// post
router.post("/", createBlog);

// get
router.get("/all-blog", getAllBlog);
router.get("/:id", getBlog);

// put
router.put("/comment", authMiddleware, userComment);
router.put("/:id", updateBlog);

// delete
router.delete("/:id", deleteBlog);

module.exports = router;