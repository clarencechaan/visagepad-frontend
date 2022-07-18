import "../styles/Profile.css";
import profilePic from "../images/profile-pic.jpeg";
import { UserPlus, UserMinus, Check } from "phosphor-react";

function Profile() {
  return (
    <div className="Profile">
      <div className="header">
        <div className="header-content">
          <div className="cover-photo"></div>
          <div className="user">
            <img src={profilePic} alt="" className="pfp" />
            <div className="info">
              <div className="full-name">Clarence Chan</div>
              <a href="" className="friend-count">
                41 friends
              </a>
              <div className="friends-pfps">
                <a href="">
                  <img src={profilePic} alt="" />
                </a>
                <a href="">
                  <img src={profilePic} alt="" />
                </a>
                <a href="">
                  <img src={profilePic} alt="" />
                </a>
                <a href="">
                  <img src={profilePic} alt="" />
                </a>
                <a href="">
                  <img src={profilePic} alt="" />
                </a>
                <a href="">
                  <img src={profilePic} alt="" />
                </a>
                <a href="">
                  <img src={profilePic} alt="" />
                </a>
                <a href="">
                  <img src={profilePic} alt="" />
                </a>
              </div>
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
        </div>
      </div>
    </div>
  );
}

export default Profile;
