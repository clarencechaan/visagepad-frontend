import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Post.css";
import profilePic from "../images/profile-pic.jpeg";
import blankUser from "../images/blank-user.png";
import photo from "../images/photo-2.jpeg";
import dots from "../images/dots.svg";
import { ThumbsUp, Chat, PencilSimple, Trash } from "phosphor-react";
import Comment from "../components/Comment";
import UserList from "./UserList";
import ComposePostForm from "./ComposePostForm";

function Post() {
  const me = useSelector((state) => state.me);
  const [commentsExpanded, setCommentsExpanded] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [viewingPrevComments, setViewingPrevComments] = useState(false);
  const [userListShowm, setUserListShown] = useState(false);
  const [editPostFormShown, setEditPostFormShown] = useState(false);
  const commentInputRef = useRef(null);

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

  return (
    <div className="Post">
      <div className="info-bar">
        <Link to="/profile/:userId" className="author-profile-pic">
          <img src={profilePic} alt="" />
        </Link>
        <div>
          <Link to="/profile/:userId" className="full-name">
            Clarence Chan
          </Link>
          <div href="" className="time-ago has-tooltip">
            11m
          </div>
        </div>
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
            <button
              onClick={(e) => {
                e.target.blur();
              }}
            >
              <Trash className="icon" />
              Delete post
            </button>
          </div>
        </div>
        {editPostFormShown ? (
          <ComposePostForm
            setComposePostFormShown={setEditPostFormShown}
            editMode={true}
            postToEdit={{
              content: "ABC DEF GHI.",
              imgUrl: "https://i.imgur.com/VCYws7K.jpg",
            }}
          />
        ) : null}
      </div>
      <div className="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris.
      </div>
      <div className="photo-container">
        <img src={photo} alt="" />
      </div>
      <div className="counts">
        <div className="like-count-container">
          <button
            className="like-count has-tooltip"
            onClick={handleLikeCountClicked}
          >
            <div className="badge">
              <ThumbsUp weight="fill" />
            </div>
            Clarence Chan and 5 others
          </button>
          {userListShowm ? (
            <UserList setUserListShown={setUserListShown} />
          ) : null}
        </div>
        <button
          className="comment-count has-tooltip"
          onClick={handleCommentCountClicked}
        >
          4 Comments
        </button>
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
      <div className={"comments" + (commentsExpanded ? "" : " hidden")}>
        <button
          type="button"
          className={
            "view-prev-comments-btn" + (viewingPrevComments ? " hidden" : "")
          }
          onClick={handleViewPrevCommentsClicked}
        >
          View 9 previous comments
        </button>
        <div>
          <div className={"prev" + (viewingPrevComments ? "" : " hidden")}>
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
          </div>
          <Comment />
        </div>
        <div className="comment-bar">
          <Link to="/profile/:userId">
            <img src={me.user.pfp || blankUser} className="pfp-small" />
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
    </div>
  );
}

export default Post;
