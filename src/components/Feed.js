import "../styles/Feed.css";
import Post from "./Post";
import NewPostBtn from "./NewPostBtn";

function Feed({ feed }) {
  return (
    <div className="Feed">
      <NewPostBtn />
      {feed.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
}

export default Feed;
