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
import ConfirmDeletePopup from "./ConfirmDeletePopup";
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
  const [isLiked, setIsLiked] = useState(
    post && post.likes && post.likes.some((user) => user._id === me.user._id)
  );
  const [viewingPrevComments, setViewingPrevComments] = useState(false);
  const [userListShown, setUserListShown] = useState(false);
  const [editPostFormShown, setEditPostFormShown] = useState(false);
  const [confirmDeletePopupShown, setConfirmDeletePopupShown] = useState(false);
  const [commentMessage, setCommentMessage] = useState("");
  const [previousComments, setPreviousComments] = useState(
    (post.comments && post.comments.slice(0, -1)) || []
  );
  const [newComments, setNewComments] = useState(
    (post.comments && post.comments.length && [post.comments.slice(-1)[0]]) ||
      []
  );
  const [moreOptionsShown, setMoreOptionsShown] = useState(false);
  const commentInputRef = useRef(null);

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    setPreviousComments((post.comments && post.comments.slice(0, -1)) || []);
    setNewComments(
      (post.comments && post.comments.length && [post.comments.slice(-1)[0]]) ||
        []
    );
  }, [post.comments]);

  useEffect(() => {
    resizeTextInput();
  }, [commentMessage]);

  function handleCommentCountClicked() {
    // show/hide comments section
    setCommentsExpanded((prev) => !prev);
  }

  function handleViewPrevCommentsClicked() {
    // show/hide previous comments
    setViewingPrevComments((prev) => !prev);
  }

  async function fetchPost(postId) {
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/posts/${postId}`;

    try {
      const response = await fetch(url);
      const resObj = await response.json();
      if (resObj._id) {
        return resObj;
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  async function handleLikeBtnClicked() {
    // post is not liked
    // like post
    if (!isLiked) {
      setIsLiked(true);
      const didLikePost = await uploadLike();

      if (didLikePost) {
        const fetchedPost = await fetchPost(post._id);
        setFeed((prev) => {
          const idx = prev.findIndex(
            (feedPost) => feedPost && feedPost._id === post._id
          );
          let newFeed = [...prev];
          if (idx >= 0) {
            newFeed[idx] = { ...newFeed[idx], ...fetchedPost };
          }
          return newFeed;
        });
      }
    } else {
      // post is liked
      // unlike post
      setIsLiked(false);
      const didUnlikePost = await uploadUnlike();

      if (didUnlikePost) {
        const fetchedPost = await fetchPost(post._id);
        setFeed((prev) => {
          const idx = prev.findIndex(
            (feedPost) => feedPost && feedPost._id === post._id
          );
          let newFeed = [...prev];
          if (idx >= 0) {
            newFeed[idx] = { ...newFeed[idx], ...fetchedPost };
          }
          return newFeed;
        });
      }
    }
  }

  async function uploadLike() {
    const method = "PUT";
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/posts/${post._id}/like`;
    const headers = {
      Authorization: "Bearer " + me.token,
    };

    try {
      const response = await fetch(url, { headers, method });
      const resObj = await response.json();
      if (resObj.msg === "Post successfully liked.") {
        return true;
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  async function uploadUnlike() {
    const method = "PUT";
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/posts/${post._id}/unlike`;
    const headers = {
      Authorization: "Bearer " + me.token,
    };

    try {
      const response = await fetch(url, { headers, method });
      const resObj = await response.json();
      if (resObj.msg === "Post successfully unliked.") {
        return true;
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  function handleCommentBtnClicked() {
    setCommentsExpanded(true);
    setTimeout(focusCommentInput, 1);
  }

  function focusCommentInput() {
    commentInputRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    commentInputRef.current.focus({ preventScroll: true });
  }

  function handleLikeCountClicked() {
    setUserListShown(true);
  }

  function resizeTextInput() {
    if (commentInputRef && commentInputRef.current) {
      commentInputRef.current.style.minHeight = "0px";
      commentInputRef.current.style.minHeight =
        commentInputRef.current.scrollHeight + "px";
    }
  }

  function handleTextInputChanged(e) {
    setCommentMessage(e.target.value);
  }

  async function handleTextInputKeyDown(e) {
    const key = e.keyCode;

    // enter key pressed
    if (key === 13) {
      e.preventDefault();
      const commentId = await uploadComment();
      if (commentId) {
        const fetchedCommment = await fetchComment(commentId);
        setNewComments((prev) => [...prev, fetchedCommment]);
        setCommentMessage("");
      }
    }
  }

  async function uploadComment() {
    const method = "POST";
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/posts/${post._id}/comments`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + me.token,
    };
    const body = JSON.stringify({ message: commentMessage });
    try {
      const response = await fetch(url, { headers, method, body });
      const resObj = await response.json();
      if (resObj.commentId) {
        return resObj.commentId;
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  async function fetchComment(commentId) {
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/comments/${commentId}`;

    try {
      const response = await fetch(url);
      const resObj = await response.json();
      if (resObj._id) {
        return resObj;
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  function handleEditBtnClicked() {
    setEditPostFormShown(true);
  }

  function handleDropdownDeleteBtnClicked(e) {
    e.target.blur();
    setConfirmDeletePopupShown(true);
  }

  async function deletePost() {
    const didDeletePost = await fetchDeletePost();
    if (didDeletePost) {
      setFeed((prev) => {
        const idx = prev.findIndex(
          (feedPost) => feedPost && feedPost._id === post._id
        );
        let newFeed = [...prev];
        if (idx >= 0) {
          newFeed[idx] = null;
        }
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
      if (resObj.msg === "Post successfully deleted.") {
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
    const count =
      (previousComments && previousComments.length) +
      (newComments && newComments.length);
    if (!count) {
      return null;
    }

    let string = "";
    if (count === 1) {
      string = "1 comment";
    } else {
      string = count + " comments";
    }

    return (
      <button
        className="comment-count has-tooltip"
        onClick={handleCommentCountClicked}
        data-descr={getUsersTooltipContent([
          ...previousComments.map((comment) => comment.author),
          ...newComments.map((comment) => comment.author),
        ])}
      >
        {string}
      </button>
    );
  }

  async function fetchComments() {
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
    if (!Array.isArray(previousComments)) {
      return;
    }

    const previousCommentCount = previousComments.length;
    const viewPreviousCommentsStr =
      previousComments.length === 1
        ? "View 1 previous comment"
        : `View ${previousComments.length} previous comments`;

    return (
      <div className={"comments" + (commentsExpanded ? "" : " hidden")}>
        <button
          type="button"
          className={
            "view-prev-comments-btn" +
            (viewingPrevComments || previousCommentCount < 1 ? " hidden" : "")
          }
          onClick={handleViewPrevCommentsClicked}
        >
          {viewPreviousCommentsStr}
        </button>
        <div>
          {viewingPrevComments ? (
            <div className="prev">
              {previousComments.map((comment) => (
                <Comment
                  comment={comment}
                  key={comment._id}
                  setComments={setPreviousComments}
                />
              ))}
            </div>
          ) : null}
          {newComments.length
            ? newComments.map((comment) => (
                <Comment
                  comment={comment}
                  setComments={setNewComments}
                  key={comment._id}
                />
              ))
            : null}
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
              onKeyDown={handleTextInputKeyDown}
              minLength={1}
              maxLength={1500}
              value={commentMessage}
              placeholder="Write a comment..."
            />
          </div>
        </div>
      </div>
    );
  }

  const moreOptions =
    post && post.author && post.author._id === me.user._id ? (
      <div className="more-options">
        <button
          onClick={handleMoreOptionsBtnClicked}
          onBlur={handleMoreOptionsBlurred}
        >
          <img src={dots} alt="" />
        </button>
        <div
          className={"dropdown" + (moreOptionsShown ? "" : " invisible")}
          tabIndex={-1}
        >
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
    ) : null;

  function handleMoreOptionsBtnClicked() {
    setMoreOptionsShown(true);
    document.addEventListener("touchend", handleMoreOptionsBlurred);
  }

  function handleMoreOptionsBlurred() {
    setMoreOptionsShown(false);
    document.removeEventListener("touchend", handleMoreOptionsBlurred);
  }

  return (
    <div className="Post">
      {confirmDeletePopupShown ? (
        <ConfirmDeletePopup
          deletePost={deletePost}
          setConfirmDeletePopupShown={setConfirmDeletePopupShown}
        />
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
        {moreOptions}
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
      {(post && post.likes && post.likes.length) ||
      (previousComments && previousComments.length) ||
      (newComments && newComments.length) ? (
        <div className="counts">
          {likeCount()}
          {commentCount()}
        </div>
      ) : null}
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
