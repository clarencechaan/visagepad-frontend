import "../styles/Comment.css";
import profilePic from "../images/profile-pic.jpeg";
import dots from "../images/dots.svg";
import { PencilSimple, Trash, ThumbsUp } from "phosphor-react";
import { useState, useRef } from "react";
import UserList from "./UserList";

function Comment() {
  const textInputRef = useRef(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userListShowm, setUserListShown] = useState(false);

  function handleLikeBtnClicked() {
    setIsLiked((prev) => !prev);
  }

  function handleLikeCountClicked() {
    setUserListShown(true);
  }

  function focusTextInput() {
    textInputRef.current.focus();
  }

  function resizeTextInput() {
    textInputRef.current.style.minHeight = "0px";
    textInputRef.current.style.minHeight =
      textInputRef.current.scrollHeight + "px";
  }

  function handleTextInputChanged(e) {
    resizeTextInput();
    // setPostContent(e.target.value);
  }

  function handleEditBtnClicked() {
    setIsEditing(true);
    setTimeout(() => {
      resizeTextInput();
    }, 1);
  }

  function handleCancelBtnClicked() {
    setIsEditing(false);
  }

  return (
    <div className="Comment">
      <a href="">
        <img src={profilePic} className="pfp-small" alt="" />
      </a>
      <div className={"display" + (isEditing ? " hidden" : null)}>
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
            <div className="like-count-container">
              <button
                className="like-count has-tooltip"
                onClick={handleLikeCountClicked}
              >
                <div className="badge">
                  <ThumbsUp weight="fill" />
                </div>
                <span>5</span>
              </button>
              {userListShowm ? (
                <UserList setUserListShown={setUserListShown} />
              ) : null}
            </div>
          </div>
          <div className="more-options">
            <button className="has-tooltip">
              <img src={dots} alt="" />
            </button>
            <div className="dropdown" tabIndex={-1}>
              <div className="triangle"></div>
              <button onClick={handleEditBtnClicked}>
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
      <div className={"editing" + (isEditing ? "" : " hidden")}>
        <div className="bubble">
          <textarea
            name="edit-message"
            id="edit-message"
            ref={textInputRef}
            onChange={handleTextInputChanged}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud.
          </textarea>
        </div>
        <button className="cancel-btn" onClick={handleCancelBtnClicked}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Comment;
