import "../styles/ProfileFriends.css";
import { MagnifyingGlass, UserPlus, UserMinus, Check } from "phosphor-react";
import profilePic from "../images/profile-pic.jpeg";

function ProfileFriends() {
  function friendItem() {
    return (
      <div className="friend-item">
        <a href="">
          <img src={profilePic} alt="" />
        </a>
        <div className="text">
          <a href="" className="full-name">
            Clarence Chan
          </a>
          <a href="" className="mutual-friend-count">
            19 mutual friends
          </a>
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
        <button className="title">Friends</button>
        <div className="search-bar">
          <MagnifyingGlass className="icon" />
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className="grid"> {[...Array(18)].map((e) => friendItem())}</div>
    </div>
  );
}

export default ProfileFriends;
