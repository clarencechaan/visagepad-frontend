import "../styles/Comment.css";
import profilePic from "../images/profile-pic.jpeg";
import dots from "../images/dots.svg";
import { PencilSimple, Trash, ThumbsUp } from "phosphor-react";
import { useState } from "react";

function Comment() {
  const [isLiked, setIsLiked] = useState(false);

  function handleLikeBtnClicked() {
    setIsLiked((prev) => !prev);
  }

  return (
    <div className="Comment">
      <a href="">
        <img src={profilePic} className="pfp-small" alt="" />
      </a>
      <div>
        <div>
          <div className="bubble">
            <a href="" className="author-full-name">
              Clarence Chan
            </a>
            <div className="message">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud.
            </div>
            <button className="like-count has-tooltip">
              <div className="badge">
                <ThumbsUp weight="fill" />
              </div>
              <span>5</span>
            </button>
          </div>
          <div className="more-options">
            <button className="has-tooltip">
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
                Edit comment
              </button>
              <button
                onClick={(e) => {
                  e.target.blur();
                }}
              >
                <Trash className="icon" />
                Delete comment
              </button>
            </div>
          </div>
        </div>
        <div className="comment-btns">
          <button
            type="button"
            className={"like-btn" + (isLiked ? " liked" : "")}
            onClick={handleLikeBtnClicked}
          >
            Like
          </button>
          <a href="" className="time-ago has-tooltip">
            24m
          </a>
        </div>
      </div>
    </div>
  );
}

export default Comment;
