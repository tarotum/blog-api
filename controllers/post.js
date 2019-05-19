/* eslint-disable no-underscore-dangle */
const Post = require("../models/post");

const PostController = {
  getAll: async (req, res) => {
    try {
      const posts = await Post.find({});
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: "Getting all post error", ...error });
    }
  },
  get: async (req, res) => {
    const { id } = req.params;
    try {
      const post = await Post.findById(id);
      if (!post) {
        res.status(404).json({ message: "Post not found" });
      } else {
        res.status(200).json(post);
      }
    } catch (error) {
      res.status(500).json({ message: "Getting all post error", ...error });
    }
  },
  create: async (req, res) => {
    const { title, content } = req.body;
    const newPost = new Post({
      title,
      content
    });

    try {
      const savedPost = await newPost.save();
      return res
        .status(201)
        .json({ message: "Post successful save", ...savedPost._doc });
    } catch (error) {
      if (error.name === "ValidationError") return res.status(400).json(error);
      return res.status(500).json({ message: "Saving post error", ...error });
    }
  },
  update: async (req, res) => {
    const { id } = req.params;

    const { title, content } = req.body;
    if (title === "")
      return res.status(400).json({ message: "Title is required" });
    if (content === "")
      return res.status(400).json({ message: "Content is required" });

    try {
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        {
          $set: req.body
        },
        { new: true }
      );
      return res
        .status(200)
        .json({ message: "Post successful updated", ...updatedPost._doc });
    } catch (error) {
      if (error.name === "ValidationError") return res.status(400).json(error);
      return res.status(500).json({ message: "Updating post error", ...error });
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      await Post.findByIdAndDelete(id);

      res.status(200).json({ message: "Post successful deleted" });
    } catch (error) {
      res.status(500).json({ message: "Deleting post error", ...error });
    }
  }
};

module.exports = PostController;
