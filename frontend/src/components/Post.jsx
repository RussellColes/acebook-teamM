import { likePost } from "../services/posts";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Post(props) {
  // const date = props.post.date ? new Date(props.post.date) : null;

  const [likeCount, setLikeCount] = useState(props.post.likeCount);
  const [isLiked, setIsLiked] = useState((false));
  useEffect(() => {
    setIsLiked(props.post.likes.includes(props.post.currentUserId));
  },
    [] // Empty dependency array - run on page load
  );
  console.log(props.post.likes);
  console.log('does it include')
  console.log(props.post.currentUserId)
  console.log(props.post.likes.includes(props.post.currentUserId))
  console.log(isLiked);
  
  const handleIsLiked = () => {
    setIsLiked(!isLiked);
  }

  //Function to handle liking/unlkining posts
  const handleLike = async () => {
    const token = localStorage.getItem('token');
    const response = await likePost(token,props.post._id)
    if ((response === 0 || response) && typeof(response) === 'number'){
      setLikeCount(response)
      handleIsLiked();
    }
    else{
      console.error('Error: Did not get like count')
    }
    
    
  }

  // Function to handle deleting the post
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/posts/${props.post._id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert(`Post with ID ${props.post._id} has been deleted.`);
        if (props.onDelete) {
          props.onDelete(props.post._id); // Notify parent component if a callback is provided
        }
      } else {
        const errorData = await response.json();
        alert(`Failed to delete post: ${errorData.err || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error deleting the post:", error);
      alert("An error occurred while trying to delete the post.");
    }
  };


  return (
    <article key={props.post._id}>
      {/* <p>
        <small>Posted on: {date ? date.toLocaleString("en-GB") : "Unknown Date"}</small>
      </p> */}

      <img src={`${BACKEND_URL}/${props.post.filePath}`} width="50"></img>
      <p></p>
      <Link className="other-profile-link" to={`/profile/${props.post.username}`}>{props.post.firstName} {props.post.lastName}</Link>
      <p>{props.post.message}</p>
      <p>{props.post.username}</p>
      <button onClick={handleDelete}>Delete Post</button>
      <button onClick={handleLike}>{isLiked ? 'Unlike' : 'Like'}</button>
      <p>{likeCount}</p>
    </article>
  );
}

export default Post;
