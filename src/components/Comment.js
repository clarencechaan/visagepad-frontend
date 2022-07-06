import "../styles/Comment.css";
import profilePic from "../images/profile-pic.jpeg";
import dots from "../images/dots.svg";

function Comment() {
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
              eiusmod tempor
            </div>
          </div>
          <button className="more-options-btn has-tooltip">
            <img src={dots} alt="" />
          </button>
        </div>
        <div className="comment-btns">
          <button className="like-btn">Like</button>
          <a href="" className="time-ago">
            24m
          </a>
        </div>
      </div>
    </div>
  );
}

export default Comment;
