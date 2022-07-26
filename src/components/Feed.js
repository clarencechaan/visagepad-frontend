import "../styles/Feed.css";
import Post from "./Post";
import NewPostBtn from "./NewPostBtn";

function Feed({ feed, newPostBtnHidden, setHfComments, setPfComments }) {
  return (
    <div className="Feed">
      {newPostBtnHidden ? null : <NewPostBtn />}
      {feed.map((post, idx) => (
        <Post
          post={post}
          key={post._id}
          setHfComments={setHfComments}
          setPfComments={setPfComments}
        />
      ))}
    </div>
  );
}

export default Feed;
