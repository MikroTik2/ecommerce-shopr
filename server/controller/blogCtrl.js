const Blog = require("../models/blogModel.js");
const asyncHandler = require("express-async-handler");

// create a blog
const createBlog = asyncHandler(async (req, res) => {
    try {

        const createBlog = await Blog.create(req.body);
        res.json(createBlog);

    } catch (error) {
        throw new Error(error);
    };
});

// get a blog
const getBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {

        const findBlog = await Blog.findById(id).populate({ path: "commentUser.postedby", select: "-password" });
        const updateBlog = await Blog.findByIdAndUpdate(id, {
            $inc: { numViews: 1 },
        }, { new: true });
        
        res.json(findBlog);

    } catch (error) {
        throw new Error(error);
    };
});

// get all a blog
const getAllBlog = asyncHandler(async (req, res) => {
    try {

        const queryObj = { ...req.query };
        const excludeFields = ["page", "sort", "limit", "fields"];

        excludeFields.forEach((el) => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

        let query = Blog.find(JSON.parse(queryStr));

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

            const blogCount = await Blog.countDocuments();
            if (skip >= blogCount) throw new Error("This page does not exists");

        };

        query = query.populate({
            path: "commentUser.postedby",
            select: "-password",
        });

        const blogs = await query;
        res.json(blogs);

    } catch (error) {
        throw new Error(error);
    };
});

// comment 
const userComment = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { comment, blogId } = req.body;

    try {

        const blog = await Blog.findById(blogId);
        if (!blog) throw new Error("Not found blog");

        let alreadyComment = blog.commentUser.find(
            (userId) => userId.postedby.toString() === _id.toString()
        );
        
        if (alreadyComment) {

            const blogComment = await Blog.findOneAndUpdate(
                { "commentUser._id": alreadyComment._id },
                { $set: { "commentUser.$.comment": comment } },
                { new: true }
            );

        } else {

            blog.commentUser.push({
                comment: comment,
                postedby: _id,
            });

            await blog.save();
        };

        res.json(blog);

    } catch (error) {
        throw new Error(error);
    };
});

// update a blog
const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {

        const updateBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updateBlog);

    } catch (error) {
        throw new Error(error);
    };
});

// delete a blog
const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {

        const deleteBlog = await Blog.findByIdAndDelete(id);
        res.json(deleteBlog);

    } catch (error) {
        throw new Error(error);
    };
});

module.exports = { createBlog, getAllBlog, getBlog, userComment, updateBlog, deleteBlog };