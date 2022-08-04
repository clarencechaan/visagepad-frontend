import { Link } from "react-router-dom";
import "../styles/Comment.css";
import blankUser from "../images/blank-user.png";
import dots from "../images/dots.svg";
import { PencilSimple, Trash, ThumbsUp } from "phosphor-react";
import { useState, useRef } from "react";
import UserList from "./UserList";
import {
  media,
  getTimeAgoShort,
  getLongDateTime,
  getUsersTooltipContent,
} from "../scripts/scripts";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function Comment({ comment, setComments }) {
  const me = useSelector((state) => state.me);
  const textInputRef = useRef(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userListShowm, setUserListShown] = useState(false);
  const [message, setMessage] = useState(comment.message);
  const [editedMessage, setEditedMessage] = useState(comment.message);

  useEffect(() => {
    setMessage(comment.message);
  }, [comment.message]);

  function handleLikeBtnClicked() {
    setIsLiked((prev) => !prev);
  }

  function handleLikeCountClicked() {
    setUserListShown(true);
  }

  function focusTextInput() {
    textInputRef.current.setSelectionRange(
      textInputRef.current.value.length,
      textInputRef.current.value.length
    );
    textInputRef.current.focus();
  }

  function resizeTextInput() {
    textInputRef.current.style.minHeight = "0px";
    textInputRef.current.style.minHeight =
      textInputRef.current.scrollHeight + "px";
  }

  function handleTextInputChanged(e) {
    resizeTextInput();
    setEditedMessage(e.target.value);
  }

  function handleEditBtnClicked() {
    setIsEditing(true);
    setTimeout(() => {
      resizeTextInput();
      focusTextInput();
    }, 1);
  }

  function handleCancelBtnClicked() {
    setIsEditing(false);
  }

  async function uploadEditedComment() {
    const method = "PUT";
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/comments/${comment._id}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + me.token,
    };
    const body = JSON.stringify({ message: editedMessage });
    try {
      const response = await fetch(url, { headers, method, body });
      const resObj = await response.json();
      if (resObj.msg === "Comment successfully edited.") {
        return true;
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  async function handleTextInputKeyDown(e) {
    const key = e.keyCode;

    // enter key pressed
    if (key === 13) {
      e.preventDefault();
      const didEditComment = await uploadEditedComment();
      if (didEditComment) {
        setMessage(editedMessage);
        setIsEditing(false);
      }
    }
  }

  async function handleDeleteBtnClicked(e) {
    e.target.blur();
    const didDeleteComment = await uploadDelete();
    if (didDeleteComment) {
      setComments((prev) => {
        const idx = prev.findIndex((c) => c._id === comment._id);
        let newComments = [...prev];
        if (idx >= 0) {
          newComments.splice(idx, 1);
        }
        return newComments;
      });
    }
  }

  async function uploadDelete() {
    const method = "DELETE";
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/comments/${comment._id}`;
    const headers = {
      Authorization: "Bearer " + me.token,
    };
    try {
      const response = await fetch(url, { headers, method });
      const resObj = await response.json();
      if (resObj.msg === "Comment successfully deleted.") {
        return true;
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  function moreOptions() {
    if (comment && comment.author && comment.author._id === me.user._id) {
      return (
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
            <button onClick={handleDeleteBtnClicked}>
              <Trash className="icon" />
              Delete comment
            </button>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  function likeCount() {
    if (comment.likes.length === 0) {
      return null;
    } else {
      return (
        <div className="like-count-container">
          <button
            className="like-count has-tooltip"
            data-descr={getUsersTooltipContent(comment.likes)}
            onClick={handleLikeCountClicked}
          >
            <div className="badge">
              <ThumbsUp weight="fill" />
            </div>
            <span>{comment.likes.length}</span>
          </button>
          {userListShowm ? (
            <UserList
              setUserListShown={setUserListShown}
              users={comment.likes}
            />
          ) : null}
        </div>
      );
    }
  }

  return (
    <div className="Comment">
      <Link to={`/profile/${comment.author._id}`}>
        {media(comment.author.pfp || blankUser, "pfp-small")}
      </Link>
      <div className={"display" + (isEditing ? " hidden" : "")}>
        <div>
          <div className="bubble">
            <Link
              to={`/profile/${comment.author._id}`}
              className="author-full-name"
            >
              {`${comment.author.first_name} ${comment.author.last_name}`}
            </Link>
            <div className="message">{message}</div>
            {likeCount()}
          </div>
          {moreOptions()}
        </div>
        <div className="comment-btns">
          <button
            type="button"
            className={"like-btn" + (isLiked ? " liked" : "")}
            onClick={handleLikeBtnClicked}
          >
            Like
          </button>
          <div
            className="time-ago has-tooltip"
            data-descr={getLongDateTime(comment.date)}
          >
            {getTimeAgoShort(comment.date)}
          </div>
        </div>
      </div>
      <div className={"editing" + (isEditing ? "" : " hidden")}>
        <div className="bubble">
          <textarea
            name="edit-message"
            className="edit-message"
            minLength={1}
            maxLength={1500}
            ref={textInputRef}
            onChange={handleTextInputChanged}
            onKeyDown={handleTextInputKeyDown}
            defaultValue={editedMessage}
          />
        </div>
        <button className="cancel-btn" onClick={handleCancelBtnClicked}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Comment;
