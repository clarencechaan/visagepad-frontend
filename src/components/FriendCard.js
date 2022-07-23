import { Link } from "react-router-dom";
import "../styles/FriendCard.css";
import profilePic from "../images/profile-pic.jpeg";

function FriendCard() {
  return (
    <div className="FriendCard">
      <Link to="/profile/:userId" className="pfp-anchor">
        <img src={profilePic} alt="" className="pfp" />
      </Link>
      <div className="details">
        <Link to="/profile/:userId" className="full-name">
          Clarence Chan
        </Link>
        <div className="mutual-friends">
          <div className="pfps">
            <img src={profilePic} alt="" className="mutual-pfp" />
            <img src={profilePic} alt="" className="mutual-pfp" />
          </div>
          <div className="count">24 mutual friends</div>
        </div>
      </div>
    </div>
  );
}

export default FriendCard;
