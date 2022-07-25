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
import { media, getTimeAgo, getLongDateTime } from "../scripts/scripts";

function Post({ post }) {
  const me = useSelector((state) => state.me);
  const [commentsExpanded, setCommentsExpanded] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [viewingPrevComments, setViewingPrevComments] = useState(false);
  const [userListShown, setUserListShown] = useState(false);
  const [editPostFormShown, setEditPostFormShown] = useState(false);
  const [comments, setComments] = useState([]);
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

  function likeCount(likes) {
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
          data-descr={likeCountDescr(likes)}
        >
          <div className="badge">
            <ThumbsUp weight="fill" />
          </div>
          {string}
        </button>
        {userListShown ? (
          <UserList setUserListShown={setUserListShown} />
        ) : null}
      </div>
    );
  }

  function likeCountDescr(likes) {
    let string = "";

    for (let i = 0; i < likes.length && i < 9; i++) {
      string += `${likes[i].first_name} ${likes[i].last_name}\u000D\u000A`;
    }

    if (likes.length >= 10) {
      string += `and ${likes.length - 9} more...\u000D\u000A`;
    }

    return string;
  }

  function commentCount(comments) {
    if (comments.length === 0) {
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
        data-descr={commentCountDescr(comments)}
      >
        {string}
      </button>
    );
  }

  function commentCountDescr(comments) {
    let authorArr = [];
    for (const comment of comments) {
      if (!authorArr.includes(comment.author)) {
        authorArr.push(comment.author);
      }
    }

    let string = "";
    for (let i = 0; i < authorArr.length && i < 9; i++) {
      string += `${authorArr[i].first_name} ${authorArr[i].last_name}\u000D\u000A`;
    }

    if (authorArr.length >= 10) {
      string += `and ${authorArr.length - 9} more...\u000D\u000A`;
    }

    return string;
  }

  async function fetchComments() {
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/posts/${post._id}/comments`;
    try {
      const response = await fetch(url);
      const resObj = await response.json();
      if (Array.isArray(resObj)) {
        setComments(resObj);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  function commentsSection() {
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
              <Comment comment={comment} />
            ))}
          </div>
          {latestComment ? <Comment comment={latestComment} /> : null}
        </div>
        <div className="comment-bar">
          <Link to={`/profile/${me.user._id}`}>
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

  return (
    <div className="Post">
      <div className="info-bar">
        <Link to={`/profile/${post.author._id}`} className="author-profile-pic">
          {media(post.author.pfp || blankUser)}
        </Link>
        <div>
          <Link to={`/profile/${post.author._id}`} className="full-name">
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
      <div className="content">{post.content}</div>
      {post.img_url ? (
        <div className="photo-container">{media(post.img_url)}</div>
      ) : null}
      <div className="counts">
        {likeCount(post.likes)}
        {commentCount(comments)}
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
