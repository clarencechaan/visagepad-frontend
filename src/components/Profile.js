import "../styles/Profile.css";
import profilePic from "../images/profile-pic.jpeg";
import { UserPlus, UserMinus, Check, Camera } from "phosphor-react";
import { useEffect, useRef } from "react";
import ProfilePosts from "./ProfilePosts";
import ProfileFriends from "./ProfileFriends";

function Profile() {
  const navLinksRef = useRef(null);
  const intersectionTriggerRef = useRef(null);

  useEffect(() => {
    const intersectionTriggerEl = intersectionTriggerRef.current;
    const observer = new IntersectionObserver(
      ([e]) => e.target.classList.toggle("stuck", e.intersectionRatio < 1),
      { threshold: [1] }
    );

    observer.observe(intersectionTriggerEl);
  }, []);

  return (
    <div className="Profile">
      <header>
        <div className="header-content">
          <div className="cover-photo">
            <label htmlFor="cover-input" id="cover-label">
              <img src="https://i.imgur.com/lpz9lAS.jpeg" alt="" />
              <div htmlFor="cover-input" className="add-cover-btn">
                <Camera className="icon" weight="bold" />
                Add Cover Photo
              </div>
            </label>
            <input type="file" id="cover-input" hidden />
          </div>
          <div className="user">
            <label className="pfp-label">
              <img src={profilePic} alt="" className="pfp" />
              <div className="camera">
                <Camera className="icon" weight="bold" />
              </div>
              <input type="file" hidden />
            </label>
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
      </header>
      <nav className="profile-nav">
        <div className="intersection-trigger" ref={intersectionTriggerRef} />
        <div className="nav-content">
          <div className="nav-links" ref={navLinksRef}>
            <a href="" className="posts-link selected">
              Posts
            </a>
            <a href="" className="friends-link unselected">
              Friends
            </a>
          </div>
          <button className="user-jump-to-top-btn">
            <img src={profilePic} alt="" className="jump-pfp" />
            <div className="jump-full-name">Clarence Chan</div>
          </button>
        </div>
      </nav>
      <ProfilePosts />
      {/* <ProfileFriends /> */}
    </div>
  );
}

export default Profile;
