const Post = require("../models/post");
const { generateToken } = require("../lib/token");
const User = require("../models/user");

const mongoose = require("mongoose");
const Photo = require("../models/photo");

async function getAllPosts(req, res) {
  const posts = await Post.find();
  // console.log("posts:", posts)


  const postsWithUserDetails = await Promise.all( 
    posts.map(async (post) => {
    // console.log(post.user_id)
    const user_id = post.user_id;
    // console.log('CURRENT, user id: '+req.user_id);
    const currentUserId = new mongoose.Types.ObjectId(req.user_id);


    const user_data = await User.find({ _id: user_id });

    const photo = await Photo.find({ user_id: user_id })
    let filePath
    if (photo.length === 0) {
      filePath = "uploads/default_photo.webp"
    } else {
      filePath = photo[0].photoFilePath
    }


    const enrichedPost = {
      ...post._doc,
      firstName: user_data[0].firstName,
      lastName: user_data[0].lastName,
      filePath: filePath,
      currentUserId: currentUserId,
      username: user_data[0].username
    };
    // console.log('enrichedPost:');
    // console.log(enrichedPost);
    return enrichedPost;
  })
);
  const filteredPosts = postsWithUserDetails.sort((a, b) => b._id.getTimestamp() - a._id.getTimestamp());
  const token = generateToken(req.user_id);
  res.status(200).json({ posts: filteredPosts, token: token });
}

async function createPost(req, res) {

  const newPostData = {
    message: req.body.message,
    user_id: new mongoose.Types.ObjectId(req.user_id),
    likes: [],
    likeCount: 0,
    currentUserId: new mongoose.Types.ObjectId()


  }
  const post = new Post(newPostData);
  post.save();

  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "Post created", token: newToken });
}

async function likePost(req, res) {
  try {
    const postId = req.body.post_id;
    const user_id = new mongoose.Types.ObjectId(req.user_id);
    postObjectId = new mongoose.Types.ObjectId(postId)
    const post = await Post.findById(postObjectId);

    if (!post) {
      return res.status(404).json({message: "Post not found"});
    }

    const hasLiked = post.likes.includes(user_id);

    if (hasLiked) {
      post.likes = post.likes.filter(id => id.toString() !== req.user_id);
      post.likeCount -= 1;
    } else {
      post.likes.push(user_id);
      post.likeCount += 1;
    }
    
    await post.save();
    const newToken = generateToken(user_id);

    res.status(200).json({
      message: hasLiked ? "Post Unliked" : "Post Liked",
      likeCount: post.likeCount,
      token: newToken
    });
  } catch (error) {
    res.status(500).json({ message: "Error liking post", error: error.message});
  }
}

const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
  likePost: likePost,
};

module.exports = PostsController;




//CODE FOR GETTING OWN POST
// async function getAllPosts(req, res) {
//   const posts = await Post.find({ userId: req.user_id });
//   const token = generateToken(req.user_id);
//   // console.log(req.user_id)
//   res.status(200).json({ posts: posts, token: token });
// }
