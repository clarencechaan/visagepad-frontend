import "../styles/Feed.css";
import Post from "./Post";
import NewPostBtn from "./NewPostBtn";
import SpinThrobber from "./SpinThrobber";

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
      {isLoading ? <SpinThrobber className="hidden" /> : null}
    </div>
  );
}

export default Feed;
