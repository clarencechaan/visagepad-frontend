import "../styles/Post.css";
import profilePic from "../images/profile-pic.jpeg";
import dots from "../images/dots.svg";
import { ThumbsUp, Chat, PencilSimple, Trash } from "phosphor-react";
import Comment from "../components/Comment";
import UserList from "./UserList";
import { useState, useRef } from "react";

function Post() {
  const [commentsExpanded, setCommentsExpanded] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [viewingPrevComments, setViewingPrevComments] = useState(false);
  const [userListShowm, setUserListShown] = useState(false);
  const commentInput = useRef(null);

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
    commentInput.current.focus();
  }

  function handleLikeCountClicked() {
    setUserListShown(true);
  }

  return (
    <div className="Post">
      <div className="info-bar">
        <a href="" className="author-profile-pic">
          <img src={profilePic} alt="" />
        </a>
        <div>
          <a href="" className="full-name">
            Clarence Chan
          </a>
          <a href="" className="time-ago has-tooltip">
            11m
          </a>
        </div>
        <div className="more-options">
          <button>
            <img src={dots} alt="" />
          </button>
          <div className="dropdown" tabIndex={-1}>
            <div className="triangle"></div>
            <button
              onClick={(e) => {
                e.target.blur();
              }}
            >
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
      </div>
      <div className="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris.
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
          <a href="">
            <img src={profilePic} className="pfp-small" />
          </a>
          <input
            type="text"
            placeholder="Write a comment..."
            minLength={1}
            maxLength={1500}
            ref={commentInput}
          />
        </div>
      </div>
    </div>
  );
}

export default Post;
