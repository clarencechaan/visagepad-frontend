import "../styles/Feed.css";
import Post from "./Post";
import NewPostBtn from "./NewPostBtn";

function Feed({ feed, newPostBtnHidden, setFeedComments, isLoading }) {
  return (
    <div className="Feed">
      {newPostBtnHidden ? null : <NewPostBtn />}
      {feed.length || isLoading ? (
        feed.map(
          (post, idx) =>
            post && (
              <Post
                post={post}
                key={post._id}
                setFeedComments={setFeedComments}
              />
            )
        )
      ) : (
        <div className="no-posts-msg">No posts found</div>
      )}
    </div>
  );
}

export default Feed;
