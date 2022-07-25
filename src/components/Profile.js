import { Routes, Route, Link, useLocation, useParams } from "react-router-dom";
import "../styles/Profile.css";
import profilePic from "../images/profile-pic.jpeg";
import blankUser from "../images/blank-user.png";
import { UserPlus, UserMinus, Check, Camera } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import ProfilePosts from "./ProfilePosts";
import ProfileFriends from "./ProfileFriends";
import { smoothScrollToTop } from "../scripts/scripts";

function Profile() {
  const { pathname } = useLocation();
  const { userId } = useParams();
  const [selected, setSelected] = useState("");
  const [user, setUser] = useState({ first_name: "", last_name: "" });
  const [friendsList, setFriendsList] = useState([]);
  const navLinksRef = useRef(null);
  const intersectionTriggerRef = useRef(null);

  useEffect(() => {
    const intersectionTriggerEl = intersectionTriggerRef.current;
    const observer = new IntersectionObserver(
      ([e]) => e.target.classList.toggle("stuck", e.intersectionRatio < 1),
      { threshold: [1] }
    );

    observer.observe(intersectionTriggerEl);

    fetchUser();
  }, []);

  useEffect(() => {
    fetchUser();
  }, [pathname]);

  async function fetchUser() {
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/users/${userId}`;
    try {
      const response = await fetch(url);
      const resObj = await response.json();
      if (resObj._id) {
        setUser(resObj);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    if (pathname.includes("friends")) {
      setSelected("friends");
    } else {
      setSelected("posts");
    }
  }, [pathname]);

  return (
    <div className="Profile">
      <header>
        <div className="header-content">
          <div className="cover-photo">
            <label htmlFor="cover-input" id="cover-label">
              <img src={user.cover} alt="" />
              <div htmlFor="cover-input" className="add-cover-btn">
                <Camera className="icon" weight="bold" />
                Add Cover Photo
              </div>
            </label>
            <input
              type="file"
              id="cover-input"
              accept="image/png, image/jpeg"
              hidden
            />
          </div>
          <div className="user">
            <label className="pfp-label">
              <img src={user.pfp || blankUser} alt="" className="pfp" />
              <div className="camera">
                <Camera className="icon" weight="bold" />
              </div>
              <input type="file" accept="image/png, image/jpeg" hidden />
            </label>
            <div className="info">
              <div className="full-name">{`${user.first_name} ${user.last_name}`}</div>
              <Link to={`/profile/${userId}/friends`} className="friend-count">
                41 friends
              </Link>
              <div className="friends-pfps">
                <Link to="/profile/:userId">
                  <img src={profilePic} alt="" />
                </Link>
                <Link to="/profile/:userId">
                  <img src={profilePic} alt="" />
                </Link>
                <Link to="/profile/:userId">
                  <img src={profilePic} alt="" />
                </Link>
                <Link to="/profile/:userId">
                  <img src={profilePic} alt="" />
                </Link>
                <Link to="/profile/:userId">
                  <img src={profilePic} alt="" />
                </Link>
                <Link to="/profile/:userId">
                  <img src={profilePic} alt="" />
                </Link>
                <Link to="/profile/:userId">
                  <img src={profilePic} alt="" />
                </Link>
                <Link to="/profile/:userId">
                  <img src={profilePic} alt="" />
                </Link>
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
            <Link
              to={`/profile/${userId}`}
              className={
                "posts-link" +
                (selected === "posts" ? " selected" : " unselected")
              }
            >
              Posts
            </Link>
            <Link
              to={`/profile/${userId}/friends`}
              className={
                "friends-link" +
                (selected === "friends" ? " selected" : " unselected")
              }
            >
              Friends
            </Link>
          </div>
          <button className="user-jump-to-top-btn" onClick={smoothScrollToTop}>
            <img src={user.pfp || blankUser} alt="" className="jump-pfp" />
            <div className="jump-full-name">{`${user.first_name} ${user.last_name}`}</div>
          </button>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<ProfilePosts />} />
        <Route path="/friends" element={<ProfileFriends />} />
      </Routes>
    </div>
  );
}

export default Profile;
