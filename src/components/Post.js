import "../styles/Post.css";
import profilePic from "../images/profile-pic.jpeg";
import dots from "../images/dots.svg";
import { ThumbsUp, Chat, PencilSimple, Trash } from "phosphor-react";
import Comment from "../components/Comment";
import { useState } from "react";

function Post() {
  const [commentsExpanded, setCommentsExpanded] = useState(true);
  const [viewingMoreComments, setViewingMoreComments] = useState(false);

  function handleCommentCountClicked() {
    // show/hide comments section
    setCommentsExpanded((prev) => !prev);
  }

  function handleViewMoreCommentsClicked() {
    // show/hide more comments
    setViewingMoreComments((prev) => !prev);
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
        veniam, quis nostrud exercitation ullamco laboris
      </div>
      <button
        href=""
        className="comment-count has-tooltip"
        onClick={handleCommentCountClicked}
      >
        4 Comments
      </button>
      <div className="action-btns">
        <button className="like-btn">
          <ThumbsUp className="icon" />
          Like
        </button>
        <button className="comment-btn">
          <Chat className="icon" />
          Comment
        </button>
      </div>
      <div className={"comments" + (commentsExpanded ? "" : " hidden")}>
        <div>
          <Comment />
          <Comment />
          <div className={"more" + (viewingMoreComments ? "" : " hidden")}>
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
          </div>
          <button
            className={
              "view-more-comments-btn" + (viewingMoreComments ? " hidden" : "")
            }
            onClick={handleViewMoreCommentsClicked}
          >
            View 9 more comments
          </button>
        </div>
        <div className="comment-bar">
          <a href="">
            <img src={profilePic} className="pfp-small" />
          </a>
          <input type="text" placeholder="Write a comment..." />
        </div>
      </div>
    </div>
  );
}

export default Post;
