import "../styles/Feed.css";
import Post from "./Post";
import NewPostBtn from "./NewPostBtn";

function Feed({ feed, newPostBtnHidden, setFeedComments }) {
  return (
    <div className="Feed">
      {newPostBtnHidden ? null : <NewPostBtn />}
      {feed.map((post, idx) => (
        <Post post={post} key={post._id} setFeedComments={setFeedComments} />
      ))}
    </div>
  );
}

export default Feed;
