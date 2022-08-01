import { Routes, Route, Link, useLocation, useParams } from "react-router-dom";
import "../styles/Profile.css";
import blankUser from "../images/blank-user.png";
import { UserPlus, UserMinus, Check, Camera } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ProfilePosts from "./ProfilePosts";
import ProfileFriends from "./ProfileFriends";
import { smoothScrollToTop, media } from "../scripts/scripts";

function Profile() {
  const me = useSelector((state) => state.me);
  const { pathname } = useLocation();
  const { userId } = useParams();
  const isMe = me.user._id === userId;
  const [selected, setSelected] = useState("");
  const [user, setUser] = useState({ first_name: "", last_name: "" });
  const [friendsList, setFriendsList] = useState([]);
  const [friendsIsLoading, setFriendsIsLoading] = useState(false);
  const navLinksRef = useRef(null);
  const intersectionTriggerRef = useRef(null);
  const [relationship, setRelationship] = useState("");

  useEffect(() => {
    const intersectionTriggerEl = intersectionTriggerRef.current;
    const observer = new IntersectionObserver(
      ([e]) => e.target.classList.toggle("stuck", e.intersectionRatio < 1),
      { threshold: [1] }
    );

    observer.observe(intersectionTriggerEl);
  }, []);

  useEffect(() => {
    if (pathname.includes("friends")) {
      setSelected("friends");
    } else {
      setSelected("posts");
    }
  }, [pathname]);

  useEffect(() => {
    // reset state if profile has changed
    setUser({ first_name: "", last_name: "" });
    setFriendsList([]);
    setRelationship("");
    fetchUser();
    fetchFriends();
    fetchRelationship();
  }, [userId]);

  useEffect(() => {
    fetchRelationship();
    fetchFriends();
  }, [me]);

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

  async function fetchFriends() {
    if (!me.token) {
      return;
    }

    setFriendsIsLoading(true);

    const url = `${process.env.REACT_APP_API_BASE_URL}/api/users/${userId}/friends`;
    const headers = {
      Authorization: "Bearer " + me.token,
    };
    try {
      const response = await fetch(url, { headers });
      const resObj = await response.json();
      if (Array.isArray(resObj)) {
        setFriendsList(resObj);
      }
    } catch (error) {
      console.log("error", error);
    }

    setFriendsIsLoading(false);
  }

  async function fetchRelationship() {
    if (!me.token) {
      return;
    }

    const url = `${process.env.REACT_APP_API_BASE_URL}/api/users/${userId}/relationship`;
    const headers = {
      Authorization: "Bearer " + me.token,
    };
    try {
      const response = await fetch(url, { headers });
      const resObj = await response.json();
      if (resObj.status) {
        setRelationship(resObj.status);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  function relationshipBtn() {
    let button1 = null;
    let button2 = null;
    if (relationship === "Self") {
    } else if (relationship === "Friends") {
      button1 = (
        <div className="is-friend">
          <Check weight="bold" className="icon" />
          <label htmlFor="">Friends</label>
        </div>
      );
      button2 = (
        <button className="unfriend-btn">
          <UserMinus weight="fill" className="icon" />
          Unfriend
        </button>
      );
    } else if (relationship === "Requesting") {
      button1 = (
        <button className="accept-request-btn">
          <UserPlus weight="fill" className="icon" />
          Accept Request
        </button>
      );
    } else if (relationship === "Requestee") {
      button1 = (
        <button className="cancel-request-btn">
          <UserMinus weight="fill" className="icon" />
          Cancel Request
        </button>
      );
    } else if (relationship === "None") {
      button1 = (
        <button className="add-friend-btn">
          <UserPlus weight="fill" className="icon" />
          Add Friend
        </button>
      );
    }

    return (
      <div className="relationship-btn-container">
        {button1}
        {button2}
      </div>
    );
  }

  return (
    <div className={"Profile" + (isMe ? "" : " not-me")}>
      <header>
        <div className="header-content">
          <div className="cover-photo">
            <label htmlFor="cover-input" id="cover-label">
              {media(user.cover)}
              {isMe && !user.cover ? (
                <div htmlFor="cover-input" className="add-cover-btn">
                  <Camera className="icon" weight="bold" />
                  Add Cover Photo
                </div>
              ) : null}
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
                  <Link to={`/profile/${user._id}`} key={user._id}>
                    {media(user.pfp || blankUser)}
                  </Link>
                ))}
              </div>
            </div>
            {relationshipBtn()}
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
      <div
        className={
          "profile-content" + (pathname.includes("friends") ? " hidden" : "")
        }
      >
        <ProfilePosts
          friends={friendsList}
          friendsIsLoading={friendsIsLoading}
        />
      </div>
      <div
        className={
          "profile-content" + (!pathname.includes("friends") ? " hidden" : "")
        }
      >
        <ProfileFriends
          friends={friendsList}
          friendsIsLoading={friendsIsLoading}
        />
      </div>
    </div>
  );
}

export default Profile;
