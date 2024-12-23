import Post from "./Post"


export function PostList({ posts, handleReloadPosts }) {

  console.log(posts)
  console.log(handleReloadPosts);
  return (
    <div className="feed" role="feed">
      {posts.map((post) => (
        <Post post={post} key={post._id} handleReloadPosts={handleReloadPosts}/>
      ))}
    </div>
  );
}
