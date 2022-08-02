import "../styles/Feed.css";
import Post from "./Post";
import NewPostBtn from "./NewPostBtn";
import SpinThrobber from "./SpinThrobber";

function Feed({
  feed,
  newPostBtnHidden,
  setFeedComments,
  isLoading,
  setHomeFeed,
}) {
  return (
    <div className="Feed">
      {newPostBtnHidden ? null : <NewPostBtn setHomeFeed={setHomeFeed} />}
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
      {isLoading ? <SpinThrobber /> : null}
    </div>
  );
}

export default Feed;
