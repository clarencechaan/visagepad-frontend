import { Link } from "react-router-dom";
import "../styles/Home.css";
import Feed from "./Feed";
import ContactsSidebar from "./ContactsSidebar";
import blankUser from "../images/blank-user.png";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { media } from "../scripts/scripts";

function Home({ homeFeed, setHomeFeed }) {
  const me = useSelector((state) => state.me);
  const [reachedFeedEnd, setReachedFeedEnd] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const nextPageTriggerRef = useRef(null);
  const feedUrl = `${process.env.REACT_APP_API_BASE_URL}/api/my-feed/`;

  useEffect(() => {
    startObserving();
  }, []);

  useEffect(() => {
    fetchNextPage(pageNumber);
  }, [pageNumber]);

  function startObserving() {
    const nextPageTrigger = nextPageTriggerRef.current;
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (each, index) {
          if (each.isIntersecting) {
            console.log("triggered");
            setPageNumber((prev) => prev + 1);
          }
        });
      },
      { rootMargin: "400px" }
    );

    observer.observe(nextPageTrigger);
  }

  async function fetchNextPage(pageNumber) {
    console.log("call fetch on ", pageNumber);
    if (!me.token || !feedUrl || reachedFeedEnd) {
      return;
    }

    const nextPageUrl = feedUrl + pageNumber;
    const headers = {
      Authorization: "Bearer " + me.token,
    };
    try {
      const response = await fetch(nextPageUrl, { headers });
      const resObj = await response.json();
      if (Array.isArray(resObj)) {
        setHomeFeed((prev) => {
          let newFeed = [...prev];
          const idx = (pageNumber - 1) * 3;
          newFeed[idx] = { ...newFeed[idx], ...resObj[0] };
          newFeed[idx + 1] = { ...newFeed[idx + 1], ...resObj[1] };
          newFeed[idx + 2] = { ...newFeed[idx + 2], ...resObj[2] };
          console.log("setting new feed", newFeed);
          return newFeed;
        });
        if (resObj.length < 3) {
          setReachedFeedEnd(true);
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  function setFeedComments(postId, comments) {
    setHomeFeed((prev) => {
      let newHomeFeed = [...prev];
      const idx = newHomeFeed.findIndex((post) => post._id === postId);
      newHomeFeed[idx] = { ...newHomeFeed[idx], comments };
      return newHomeFeed;
    });
  }

  return (
    <div className="Home">
      <div className="sidebar">
        <Link to={`/profile/${me.user._id}`} className="me-link">
          {media(me.user.pfp || blankUser)}
          <div className="name">{`${me.user.first_name} ${me.user.last_name}`}</div>
        </Link>
      </div>
      <div className="home-feed">
        <Feed
          feed={homeFeed.slice(0, pageNumber * 3)}
          url={feedUrl}
          setFeedComments={setFeedComments}
        />
        <div className="next-page-trigger" ref={nextPageTriggerRef}></div>
      </div>
      <ContactsSidebar />
    </div>
  );
}

export default Home;
