import { Link, useLocation, useParams } from "react-router-dom";
import "../styles/Profile.css";
import blankUser from "../images/blank-user.png";
import { Camera } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProfilePosts from "./ProfilePosts";
import ProfileFriends from "./ProfileFriends";
import RelationshipBtn from "./RelationshipBtn";
import { setUser as setUserMe } from "../slices/meSlice";
import { smoothScrollToTop, media } from "../scripts/scripts";
import SpinThrobber from "./SpinThrobber";
import DotsThrobber from "./DotsThrobber";

function Profile() {
  const me = useSelector((state) => state.me);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { userId } = useParams();
  const isMe = me && me.user && me.user._id === userId;
  const [selected, setSelected] = useState("");
  const [user, setUser] = useState({ first_name: "", last_name: "" });
  const [friendsList, setFriendsList] = useState([]);
  const [friendsIsLoading, setFriendsIsLoading] = useState(false);
  const [isUploadingPfp, setIsUploadingPfp] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
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
    fetchUser();
    fetchFriends();
  }, [userId]);

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

  async function uploadImage(file) {
    const CLIENT_ID = "f78d31a8887d509";

    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Client-ID ${CLIENT_ID}`);

    let formdata = new FormData();
    formdata.append("image", file);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://api.imgur.com/3/image",
        requestOptions
      );
      const result = await response.text();
      const json = JSON.parse(result).data.link;
      return json;
    } catch (error) {
      console.log("error", error);
    }
  }

  async function handlePfpPicked(e) {
    if (!e.target.files[0]) return;
    if (e.target.files[0].size > 10485760) {
      alert("File is too big. Max size is 10MB.");
      return;
    }

    setIsUploadingPfp(true);
    setUser((prev) => ({ ...prev, pfp: "" }));
    const imgUrlResponse = await uploadImage(e.target.files[0]);
    const didUploadPfp = await uploadPfpCover({ pfp: imgUrlResponse });
    if (didUploadPfp) {
      const updatedMe = { ...me, user: { ...me.user, pfp: imgUrlResponse } };
      dispatch(setUserMe(updatedMe.user));
      fetchUser();
      localStorage.setItem("me", JSON.stringify(updatedMe));
    }
    setIsUploadingPfp(false);
  }

  async function handleCoverPicked(e) {
    if (!e.target.files[0]) return;
    if (e.target.files[0].size > 10485760) {
      alert("File is too big. Max size is 10MB.");
      return;
    }

    setIsUploadingCover(true);
    setUser((prev) => ({ ...prev, cover: "" }));
    const imgUrlResponse = await uploadImage(e.target.files[0]);
    const didUploadCover = await uploadPfpCover({ cover: imgUrlResponse });
    if (didUploadCover) {
      fetchUser();
    }
    setIsUploadingCover(false);
  }

  // update pfp or cover in database
  async function uploadPfpCover(changes) {
    const method = "PUT";
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/update-photo`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + me.token,
    };
    const body = JSON.stringify(changes);

    try {
      const response = await fetch(url, { headers, method, body });
      const resObj = await response.json();
      if (resObj.msg === "Photo successfully updated.") {
        return true;
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div className={"Profile" + (isMe ? "" : " not-me")}>
      <header>
        <div className="header-content">
          <div className="cover-photo">
            <label
              htmlFor="cover-input"
              id="cover-label"
              className={isUploadingCover ? "is-uploading" : ""}
            >
              {isUploadingCover ? <DotsThrobber /> : media(user.cover)}
              {isMe && !user.cover && !isUploadingCover ? (
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
              onChange={handleCoverPicked}
              hidden
            />
          </div>
          <div className="user">
            <label
              className={"pfp-label" + (isUploadingPfp ? " is-uploading" : "")}
            >
              {isUploadingPfp ? (
                <div className="pfp">
                  <SpinThrobber />
                </div>
              ) : (
                media(user.pfp || blankUser, "pfp")
              )}
              {isUploadingPfp ? null : (
                <div className="camera">
                  <Camera className="icon" weight="bold" />
                </div>
              )}
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handlePfpPicked}
                hidden
              />
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
            {<RelationshipBtn unfriendBtn={true} userId={user._id} />}
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
