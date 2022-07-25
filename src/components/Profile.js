import { Routes, Route, Link, useLocation, useParams } from "react-router-dom";
import "../styles/Profile.css";
import profilePic from "../images/profile-pic.jpeg";
import blankUser from "../images/blank-user.png";
import { UserPlus, UserMinus, Check, Camera } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ProfilePosts from "./ProfilePosts";
import ProfileFriends from "./ProfileFriends";
import { smoothScrollToTop, media } from "../scripts/scripts";

function Profile() {
  const { pathname } = useLocation();
  const { userId } = useParams();
  const notMe = useSelector((state) => state.me).user._id !== userId;
  const [selected, setSelected] = useState("");
  const [user, setUser] = useState({ first_name: "", last_name: "" });
  const [profileFeed, setProfileFeed] = useState([]);
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
  }, []);

  useEffect(() => {
    fetchUser();
    fetchFeed();
    fetchFriends();

    if (pathname.includes("friends")) {
      setSelected("friends");
    } else {
      setSelected("posts");
    }
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

  async function fetchFeed() {
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/users/${userId}/posts`;
    try {
      const response = await fetch(url);
      const resObj = await response.json();
      if (Array.isArray(resObj)) {
        setProfileFeed(resObj);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  async function fetchFriends() {
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/users/${userId}/friends`;
    try {
      const response = await fetch(url);
      const resObj = await response.json();
      if (Array.isArray(resObj)) {
        setFriendsList(resObj);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div className={"Profile" + (notMe ? " not-me" : "")}>
      <header>
        <div className="header-content">
          <div className="cover-photo">
            <label htmlFor="cover-input" id="cover-label">
              {media(user.cover)}
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
              {media(user.pfp || blankUser, "pfp")}
              <div className="camera">
                <Camera className="icon" weight="bold" />
              </div>
              <input type="file" accept="image/png, image/jpeg" hidden />
            </label>
            <div className="info">
              <div className="full-name">{`${user.first_name} ${user.last_name}`}</div>
              <Link to={`/profile/${userId}/friends`} className="friend-count">
                {friendsList.length !== 0 &&
                  (friendsList.length === 1
                    ? "1 friend"
                    : friendsList.length + " friends")}
              </Link>
              <div className="friends-pfps">
                {friendsList.slice(0, 8).map((user) => (
                  <Link to={`/profile/${user._id}`}>
                    {media(user.pfp || blankUser)}
                  </Link>
                ))}
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
            {media(user.pfp || blankUser, "jump-pfp")}
            <div className="jump-full-name">{`${user.first_name} ${user.last_name}`}</div>
          </button>
        </div>
      </nav>
      <Routes>
        <Route
          path="/"
          element={<ProfilePosts feed={profileFeed} friends={friendsList} />}
        />
        <Route
          path="/friends"
          element={<ProfileFriends friends={friendsList} />}
        />
      </Routes>
    </div>
  );
}

export default Profile;
