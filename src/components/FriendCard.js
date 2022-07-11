import "../styles/FriendCard.css";
import profilePic from "../images/profile-pic.jpeg";

function FriendCard() {
  return (
    <div className="FriendCard">
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
      </div>
    </div>
  );
}

export default FriendCard;
