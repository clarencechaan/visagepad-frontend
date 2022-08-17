import { Link } from "react-router-dom";
import "../styles/Comment.css";
import blankUser from "../images/blank-user.png";
import dots from "../images/dots.svg";
import { PencilSimple, Trash, ThumbsUp } from "phosphor-react";
import { useState, useRef, useEffect } from "react";
import UserList from "./UserList";
import {
  media,
  getTimeAgoShort,
  getLongDateTime,
  getUsersTooltipContent,
  smoothScrollToTop,
  addEscKeyDownListener,
} from "../scripts/scripts";
import { useSelector } from "react-redux";

function Comment({ comment, setComments }) {
  const me = useSelector((state) => state.me);
  const textInputRef = useRef(null);
  const [isLiked, setIsLiked] = useState(
    comment.likes.some((like) => like._id === me.user._id)
  );
  const [isEditing, setIsEditing] = useState(false);
  const [userListShowm, setUserListShown] = useState(false);
  const [message, setMessage] = useState(comment.message);
  const [editedMessage, setEditedMessage] = useState(comment.message);
  const [moreOptionsShown, setMoreOptionsShown] = useState(false);

  useEffect(() => {
    return addEscKeyDownListener(setIsEditing);
  }, []);

  useEffect(() => {
    setMessage(comment.message);
  }, [comment.message]);

  async function handleLikeBtnClicked() {
    // comment is not liked
    // like comment
    if (!isLiked) {
      setIsLiked(true);
      const didLikeComment = await uploadLike();

      if (didLikeComment) {
        const fetchedComment = await fetchComment();
        setComments((prev) => {
          const idx = prev.findIndex((c) => c._id === comment._id);
          let newComments = [...prev];
          if (idx >= 0) {
            newComments[idx] = fetchedComment;
          }
          return newComments;
        });
      }
    } else {
      // comment is liked
      // unlike comment
      setIsLiked(false);
      const didUnlikeComment = await uploadUnlike();

      if (didUnlikeComment) {
        const fetchedComment = await fetchComment();
        setComments((prev) => {
          const idx = prev.findIndex((c) => c._id === comment._id);
          let newComments = [...prev];
          if (idx >= 0) {
            newComments[idx] = fetchedComment;
          }
          return newComments;
        });
      }
    }
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
    focusTextInput();
    resizeTextInput();

    setTimeout(() => {
      resizeTextInput();
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
      document.activeElement.blur();
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

  const moreOptions =
    comment && comment.author && comment.author._id === me.user._id ? (
      <div className="more-options">
        <button className="has-tooltip" onClick={handleMoreOptionsBtnClicked}>
          <img src={dots} alt="" />
        </button>
        <div
          className={"dropdown" + (moreOptionsShown ? "" : " invisible")}
          tabIndex={-1}
        >
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
    ) : null;

  function handleMoreOptionsBtnClicked() {
    setMoreOptionsShown(true);
    document.addEventListener("touchend", hideMoreOptionsDropdown);
    document.addEventListener("mousedown", hideMoreOptionsDropdown);
  }

  function hideMoreOptionsDropdown() {
    setMoreOptionsShown(false);
    document.removeEventListener("touchend", hideMoreOptionsDropdown);
    document.removeEventListener("mousedown", hideMoreOptionsDropdown);
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

  async function uploadLike() {
    const method = "PUT";
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/comments/${comment._id}/like`;
    const headers = {
      Authorization: "Bearer " + me.token,
    };

    try {
      const response = await fetch(url, { headers, method });
      const resObj = await response.json();
      if (resObj.msg === "Comment successfully liked.") {
        return true;
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  async function uploadUnlike() {
    const method = "PUT";
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/comments/${comment._id}/unlike`;
    const headers = {
      Authorization: "Bearer " + me.token,
    };

    try {
      const response = await fetch(url, { headers, method });
      const resObj = await response.json();
      if (resObj.msg === "Comment successfully unliked.") {
        return true;
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  async function fetchComment() {
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/comments/${comment._id}`;

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

  return (
    <div className="Comment">
      <Link to={`/profile/${comment.author._id}`} onClick={smoothScrollToTop}>
        {media(comment.author.pfp || blankUser, {
          className: "pfp-small",
        })}
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
          {moreOptions}
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
      <div className={"editing" + (isEditing ? "" : " no-space")}>
        <div className="bubble">
          <textarea
            name="edit-message"
            className="edit-message"
            minLength={1}
            maxLength={1500}
            ref={textInputRef}
            onChange={handleTextInputChanged}
            onKeyDown={handleTextInputKeyDown}
            inputMode="search"
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
