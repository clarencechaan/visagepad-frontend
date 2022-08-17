import { Link, useParams } from "react-router-dom";
import "../styles/ProfilePosts.css";
import blankUser from "../images/blank-user.png";
import Feed from "./Feed";
import { media } from "../scripts/scripts";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";

function ProfilePosts({ friends, friendsIsLoading }) {
  const me = useSelector((state) => state.me);
  const { userId } = useParams();
  const [profileFeed, setProfileFeed] = useState([]);
  const [pageNumber, setPageNumber] = useState(null);
  const [reachedFeedEnd, setReachedFeedEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const nextPageTriggerRef = useRef(null);
  const feedUrl = `${process.env.REACT_APP_API_BASE_URL}/api/users/${userId}/posts/`;

  useEffect(() => {
    startObserving();
  }, []);

  useEffect(() => {
    if (pageNumber === 0) {
      setPageNumber(1);
      return;
    } else if (pageNumber === null) {
      return;
    }

    fetchNextPage(pageNumber);
  }, [pageNumber]);

  useEffect(() => {
    setProfileFeed([]);
    setPageNumber(0);
    setReachedFeedEnd(false);
  }, [feedUrl]);

  function startObserving() {
    const nextPageTrigger = nextPageTriggerRef.current;
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (each, index) {
          if (each.isIntersecting) {
            setPageNumber((prev) => prev + 1);
          }
        });
      },
      { rootMargin: "200px" }
    );

    observer.observe(nextPageTrigger);
  }

  async function fetchNextPage(pageNumber) {
    if (!me.token || !feedUrl || reachedFeedEnd) {
      return;
    }

    setIsLoading((prev) => prev + 1);

    const nextPageUrl = feedUrl + pageNumber;
    const headers = {
      Authorization: "Bearer " + me.token,
    };
    try {
      const response = await fetch(nextPageUrl, { headers });
      const resObj = await response.json();
      if (Array.isArray(resObj)) {
        setProfileFeed((prev) => {
          let newFeed = [...prev];
          newFeed = newFeed.slice(0, (pageNumber - 1) * 3);
          newFeed = [...newFeed, ...resObj];
          return newFeed;
        });
        if (resObj.length < 3) {
          setReachedFeedEnd(true);
        }
      }
    } catch (error) {
      console.log("error", error);
    }

    setIsLoading((prev) => prev - 1);
  }

  function friendsSmallItem(user) {
    return (
      <div className="friend-item" key={user._id}>
        <Link to={`/profile/${user._id}`}>
          {media(user.pfp || blankUser, { className: "pfp", size: "m" })}
        </Link>
        <Link to={`/profile/${user._id}`} className="full-name">
          {`${user.first_name} ${user.last_name}`}
        </Link>
      </div>
    );
  }

  function setFeedComments(postId, comments) {
    setProfileFeed((prev) => {
      let newProfileFeed = [...prev];
      const idx = newProfileFeed.findIndex(
        (post) => post && post._id === postId
      );
      if (idx >= 0) {
        newProfileFeed[idx] = { ...newProfileFeed[idx], comments };
      }
      return newProfileFeed;
    });
  }

  return (
    <div className="ProfilePosts">
      <div className="friends-small ">
        <div className="top-bar">
          <div className="upper">
            <Link to={`/profile/${userId}/friends`} className="title">
              Friends
            </Link>
            <Link
              to={`/profile/${userId}/friends`}
              className="all-friends-link"
            >
              See all friends
            </Link>
          </div>
          <div className="friend-count">
            {friends.length !== 0 &&
              (friends.length === 1 ? "1 friend" : friends.length + " friends")}
          </div>
        </div>
        <div className="grid">
          {friends.length || friendsIsLoading ? (
            friends.slice(0, 9).map((user) => friendsSmallItem(user))
          ) : (
            <div className="no-friends-msg">No friends found</div>
          )}
        </div>
      </div>
      <div className="profile-feed">
        <Feed
          feed={profileFeed}
          newPostBtnHidden={userId !== me.user._id}
          setFeedComments={setFeedComments}
          isLoading={isLoading}
          setFeed={setProfileFeed}
        />
        <div className="next-page-trigger" ref={nextPageTriggerRef}></div>
      </div>
    </div>
  );
}

export default ProfilePosts;
