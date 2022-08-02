import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Post.css";
import blankUser from "../images/blank-user.png";
import dots from "../images/dots.svg";
import { ThumbsUp, Chat, PencilSimple, Trash } from "phosphor-react";
import Comment from "../components/Comment";
import UserList from "./UserList";
import ComposePostForm from "./ComposePostForm";
import {
  media,
  getTimeAgo,
  getLongDateTime,
  getUsersTooltipContent,
  smoothScrollToTop,
} from "../scripts/scripts";

function Post({ post, setFeedComments, setFeed }) {
  const me = useSelector((state) => state.me);
  const [commentsExpanded, setCommentsExpanded] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [viewingPrevComments, setViewingPrevComments] = useState(false);
  const [userListShown, setUserListShown] = useState(false);
  const [editPostFormShown, setEditPostFormShown] = useState(false);
  const [confirmDeletePopupShown, setConfirmDeletePopupShown] = useState(false);
  const comments = post.comments;
  const commentInputRef = useRef(null);

  useEffect(() => {
    fetchComments();
  }, []);

  function handleCommentCountClicked() {
    // show/hide comments section
    setCommentsExpanded((prev) => !prev);
  }

  function handleViewPrevCommentsClicked() {
    // show/hide previous comments
    setViewingPrevComments((prev) => !prev);
  }

  function handleLikeBtnClicked() {
    setIsLiked((prev) => !prev);
  }

  function handleCommentBtnClicked() {
    setCommentsExpanded(true);
    setTimeout(focusCommentInput, 1);
  }

  function focusCommentInput() {
    commentInputRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
    commentInputRef.current.focus({ preventScroll: true });
  }

  function handleLikeCountClicked() {
    setUserListShown(true);
  }

  function resizeTextInput() {
    commentInputRef.current.style.minHeight = "0px";
    commentInputRef.current.style.minHeight =
      commentInputRef.current.scrollHeight + "px";
  }

  function handleTextInputChanged() {
    resizeTextInput();
  }

  function handleEditBtnClicked() {
    setEditPostFormShown(true);
  }

  function handleDropdownDeleteBtnClicked(e) {
    e.target.blur();
    setConfirmDeletePopupShown(true);
  }

  async function deletePost() {
    const postDidDelete = await fetchDeletePost();
    if (postDidDelete) {
      setFeed((prev) => {
        const idx = prev.findIndex(
          (feedPost) => feedPost && feedPost._id === post._id
        );
        // const newFeed = [...prev.slice(0, idx), ...prev.slice(idx + 1)];
        let newFeed = [...prev];
        newFeed[idx] = null;
        return newFeed;
      });
    }
  }

  async function fetchDeletePost() {
    const method = "DELETE";
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/posts/${post._id}`;
    const headers = {
      Authorization: "Bearer " + me.token,
    };

    try {
      const response = await fetch(url, { headers, method });
      const resObj = await response.json();
      if ((resObj.msg = "Post successfully deleted.")) {
        return true;
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  function likeCount() {
    const likes = post.likes;

    if (likes.length === 0) {
      return null;
    }

    let string = "";
    if (likes.length >= 1) {
      string += `${likes[0].first_name} ${likes[0].last_name}`;
    }

    if (likes.length >= 2) {
      string += `, ${likes[1].first_name} ${likes[1].last_name}`;
    }

    if (likes.length === 3) {
      string += " and 1 other";
    } else if (likes.length > 3) {
      string += ` and ${likes.length - 2} others`;
    }

    return (
      <div className="like-count-container">
        <button
          className="like-count has-tooltip"
          onClick={handleLikeCountClicked}
          data-descr={getUsersTooltipContent(likes)}
        >
          <div className="badge">
            <ThumbsUp weight="fill" />
          </div>
          {string}
        </button>
        {userListShown ? (
          <UserList setUserListShown={setUserListShown} users={post.likes} />
        ) : null}
      </div>
    );
  }

  function commentCount() {
    if (!Array.isArray(comments) || comments.length === 0) {
      return null;
    }

    let string = "";
    if (comments.length === 1) {
      string = "1 comment";
    } else {
      string = comments.length + " comments";
    }

    return (
      <button
        className="comment-count has-tooltip"
        onClick={handleCommentCountClicked}
        data-descr={getUsersTooltipContent(
          comments.map((comment) => comment.author)
        )}
      >
        {string}
      </button>
    );
  }

  async function fetchComments() {
    if (Array.isArray(comments)) {
      return;
    }

    const url = `${process.env.REACT_APP_API_BASE_URL}/api/posts/${post._id}/comments`;
    try {
      const response = await fetch(url);
      const resObj = await response.json();
      if (Array.isArray(resObj)) {
        setFeedComments(post._id, resObj);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  function commentsSection() {
    if (!Array.isArray(comments)) {
      return;
    }

    const commentCount = comments.length;
    const viewPreviousCommentsStr =
      comments.length === 2
        ? "View 1 previous comment"
        : `View ${comments.length - 1} previous comments`;
    const previousComments = comments.slice(0, commentCount - 1);
    const latestComment = comments[commentCount - 1];

    return (
      <div className={"comments" + (commentsExpanded ? "" : " hidden")}>
        <button
          type="button"
          className={
            "view-prev-comments-btn" +
            (viewingPrevComments || commentCount <= 1 ? " hidden" : "")
          }
          onClick={handleViewPrevCommentsClicked}
        >
          {viewPreviousCommentsStr}
        </button>
        <div>
          <div className={"prev" + (viewingPrevComments ? "" : " hidden")}>
            {previousComments.map((comment) => (
              <Comment comment={comment} key={comment._id} />
            ))}
          </div>
          {latestComment ? <Comment comment={latestComment} /> : null}
        </div>
        <div className="comment-bar">
          <Link to={`/profile/${me.user._id}`} onClick={smoothScrollToTop}>
            {media(me.user.pfp || blankUser, "pfp-small")}
          </Link>
          <div className="bubble">
            <textarea
              name="comment-input"
              id="comment-input"
              ref={commentInputRef}
              onChange={handleTextInputChanged}
              minLength={1}
              maxLength={1500}
              placeholder="Write a comment..."
            />
          </div>
        </div>
      </div>
    );
  }

  function moreOptions() {
    if (post && post.author && post.author._id === me.user._id) {
      return (
        <div className="more-options">
          <button>
            <img src={dots} alt="" />
          </button>
          <div className="dropdown" tabIndex={-1}>
            <div className="triangle"></div>
            <button onClick={handleEditBtnClicked}>
              <PencilSimple className="icon" />
              Edit post
            </button>
            <button onClick={handleDropdownDeleteBtnClicked}>
              <Trash className="icon" />
              Delete post
            </button>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  function closeConfirmDeletePopup() {
    setConfirmDeletePopupShown(false);
  }

  async function handleConfirmDeleteBtnClicked() {
    await deletePost();
    closeConfirmDeletePopup();
  }

  return (
    <div className="Post">
      {confirmDeletePopupShown ? (
        <div className="confirm-delete-popup">
          <div className="window">
            <div className="title-bar">
              <button
                type="button"
                className="close-btn"
                onClick={closeConfirmDeletePopup}
              >
                ✕
              </button>
              <div className="title">Delete this post?</div>
            </div>
            <div className="content">
              Are you sure you want to delete this post forever? This action
              cannot be undone.
              <div className="delete-btns">
                <button
                  className="cancel-btn"
                  onClick={closeConfirmDeletePopup}
                >
                  Cancel
                </button>
                <button
                  className="confirm-btn"
                  onClick={handleConfirmDeleteBtnClicked}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="info-bar">
        <Link
          to={`/profile/${post.author._id}`}
          className="author-profile-pic"
          onClick={smoothScrollToTop}
        >
          {media(post.author.pfp || blankUser)}
        </Link>
        <div>
          <Link
            to={`/profile/${post.author._id}`}
            className="full-name"
            onClick={smoothScrollToTop}
          >
            {`${post.author.first_name} ${post.author.last_name}`}
          </Link>
          <div
            href=""
            className="time-ago has-tooltip"
            data-descr={getLongDateTime(post.date)}
          >
            {getTimeAgo(post.date)}
          </div>
        </div>
        {moreOptions()}
        {editPostFormShown ? (
          <ComposePostForm
            setComposePostFormShown={setEditPostFormShown}
            editMode={true}
            postToEdit={post}
            setFeed={setFeed}
          />
        ) : null}
      </div>
      <div className="content">{post.content}</div>
      {post.img_url ? (
        <div className="photo-container">{media(post.img_url)}</div>
      ) : null}
      <div className="counts">
        {likeCount()}
        {commentCount()}
      </div>
      <div className="action-btns">
        <button
          type="button"
          className={"like-btn" + (isLiked ? " liked" : "")}
          onClick={handleLikeBtnClicked}
        >
          <ThumbsUp className="icon" weight={isLiked ? "fill" : "regular"} />
          Like
        </button>
        <button
          type="button"
          className="comment-btn"
          onClick={handleCommentBtnClicked}
        >
          <Chat className="icon" />
          Comment
        </button>
      </div>
      {commentsSection()}
    </div>
  );
}

export default Post;
