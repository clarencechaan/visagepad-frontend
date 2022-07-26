import { Link } from "react-router-dom";
import "../styles/Comment.css";
import blankUser from "../images/blank-user.png";
import dots from "../images/dots.svg";
import { PencilSimple, Trash, ThumbsUp } from "phosphor-react";
import { useState, useRef } from "react";
import UserList from "./UserList";
import { media, getTimeAgoShort, getLongDateTime } from "../scripts/scripts";
import { useSelector } from "react-redux";

function Comment({ comment }) {
  const me = useSelector((state) => state.me);
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

  function handleTextInputChanged() {
    resizeTextInput();
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

  function moreOptions() {
    if (comment.author._id === me.user._id) {
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
            data-descr={userListDescr(comment.likes)}
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

  function userListDescr(user) {
    let string = "";

    for (let i = 0; i < user.length && i < 9; i++) {
      string += `${user[i].first_name} ${user[i].last_name}\u000D\u000A`;
    }

    if (user.length >= 10) {
      string += `and ${user.length - 9} more...\u000D\u000A`;
    }

    return string;
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
            <div className="message">{comment.message}</div>
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
            defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud."
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
