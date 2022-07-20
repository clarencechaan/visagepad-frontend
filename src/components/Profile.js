import "../styles/Profile.css";
import profilePic from "../images/profile-pic.jpeg";
import { UserPlus, UserMinus, Check } from "phosphor-react";
import Feed from "./Feed";
import { useEffect, useRef } from "react";

function Profile() {
  const navLinksRef = useRef(null);
  const intersectionTriggerRef = useRef(null);

  useEffect(() => {
    const navLinksEl = navLinksRef.current;
    const intersectionTriggerEl = intersectionTriggerRef.current;
    const observer = new IntersectionObserver(
      ([e]) => e.target.classList.toggle("stuck", e.intersectionRatio < 1),
      { threshold: [1] }
    );

    observer.observe(intersectionTriggerEl);
  }, []);

  function friendsSmallItem() {
    return (
      <div className="friend-item">
        <a href="">
          <img src={profilePic} alt="" className="pfp" />
        </a>
        <a href="" className="full-name">
          Clarence Chan
        </a>
      </div>
    );
  }

  return (
    <div className="Profile">
      <header>
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
      <main>
        <div className="friends-small ">
          <div className="top-bar">
            <div className="upper">
              <a href="" className="title">
                Friends
              </a>
              <a href="" className="all-friends-link">
                See all friends
              </a>
            </div>
            <div className="friend-count">41 friends</div>
          </div>
          <div className="grid">
            {[...Array(9)].map((e) => friendsSmallItem())}
          </div>
        </div>
        <div className="profile-feed">
          <Feed />
        </div>
      </main>
    </div>
  );
}

export default Profile;
