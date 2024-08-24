const express = require("express");
const Post = require("../models/Post");
const jwt = require("jsonwebtoken");

const router = express.Router();

const auth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

// Fetch all posts
router.get("/", async (req, res) => {
  const { zilla, content } = req.query;
  try {
    const query = {};
    if (zilla) {
      query.zilla = zilla;
    }
    if (content) {
      query.content = { $regex: content, $options: "i" };
    }
    const posts = await Post.find(query);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Create a new post
router.post("/", auth, async (req, res) => {
  const { content, selectedDivision, selectedZilla, contactname, contactnumber } = req.body;
  try {
    const post = new Post({
      userId: req.user.userId,
      content,
      division: selectedDivision,
      contactname,
      phonenumber: contactnumber,
      zilla: selectedZilla,
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all posts for a user
router.get("/user/:userId", auth, async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a post
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.userId.toString() !== req.user.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await post.remove();
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a post
router.put("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.userId.toString() !== req.user.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    post.content = req.body.content;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// stats/count how many post by zila
router.get("/zilla-count", async (_, res) => {
  try {
    const zillaCounts = await Post.aggregate([
      {
        $group: {
          _id: "$zilla",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          zilla: "$_id",
          count: 1,
        },
      },
    ]);

    res.json(zillaCounts);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
