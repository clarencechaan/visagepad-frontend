import "../styles/FriendRequestCard.css";
import profilePic from "../images/profile-pic.jpeg";

function FriendRequestCard() {
  return (
    <div className="FriendRequestCard">
      <a href="" className="pfp-anchor">
        <img src={profilePic} alt="" className="pfp" />
      </a>
      <div className="details">
        <a href="" className="full-name">
          Clarence Chan
        </a>
        <div className="mutual-friends">
          <div className="pfps">
            <img src={profilePic} alt="" className="mutual-pfp" />
            <img src={profilePic} alt="" className="mutual-pfp" />
          </div>
          <div className="count">24 mutual friends</div>
        </div>
        <button className="confirm-btn">Confirm</button>
        <button className="delete-btn">Delete</button>
      </div>
    </div>
  );
}

export default FriendRequestCard;
