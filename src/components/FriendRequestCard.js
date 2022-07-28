import { Link } from "react-router-dom";
import "../styles/FriendRequestCard.css";
import profilePic from "../images/profile-pic.jpeg";

function FriendRequestCard() {
  return (
    <div className="FriendRequestCard">
      <Link to="/profile/:userId" className="pfp-anchor">
        <img src={profilePic} alt="" className="pfp" />
      </Link>
      <div className="details">
        <Link to="/profile/:userId" className="full-name">
          Clarence Chan
        </Link>
        <div className="mutual-friends has-tooltip">
          <div className="pfps">
            <img src={profilePic} alt="" className="mutual-pfp" />
            <img src={profilePic} alt="" className="mutual-pfp" />
          </div>
          <div className="count">24 mutual friends</div>
        </div>
        <button type="button" className="confirm-btn">
          Confirm
        </button>
        <button type="button" className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
}

export default FriendRequestCard;
