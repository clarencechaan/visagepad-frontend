import "../styles/ProfileFriends.css";
import { Link } from "react-router-dom";
import { MagnifyingGlass, UserPlus, UserMinus, Check } from "phosphor-react";
import profilePic from "../images/profile-pic.jpeg";

function ProfileFriends() {
  function friendItem() {
    return (
      <div className="friend-item">
        <Link to="/profile/:userId">
          <img src={profilePic} alt="" />
        </Link>
        <div className="text">
          <Link to="/profile/:userId" className="full-name">
            Clarence Chan
          </Link>
          <Link to="/profile/:userId/friends" className="mutual-friend-count">
            19 mutual friends
          </Link>
        </div>
        <div className="relationship">
          <button className="add-friend-btn">
            <UserPlus weight="fill" className="icon" />
            Add Friend
          </button>
          <button className="cancel-request-btn hidden">
            <UserMinus weight="fill" className="icon" />
            Cancel request
          </button>
          <div className="is-friend hidden">
            <Check weight="bold" className="icon" />
            <label htmlFor="">Friends</label>
          </div>
          <button className="unfriend-btn hidden">
            <UserMinus weight="fill" className="icon" />
            Unfriend
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ProfileFriends">
      <div className="top-bar">
        <button className="title">All Friends</button>
        <div className="search-bar">
          <MagnifyingGlass className="icon" />
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className="grid">{[...Array(17)].map((e) => friendItem())}</div>
    </div>
  );
}

export default ProfileFriends;
