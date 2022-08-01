import { Link } from "react-router-dom";
import "../styles/Home.css";
import Feed from "./Feed";
import ContactsSidebar from "./ContactsSidebar";
import Contact from "./Contact";
import blankUser from "../images/blank-user.png";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { media } from "../scripts/scripts";

function Home({
  homeFeed,
  setHomeFeed,
  fetchPeopleYouMayKnow,
  peopleYouMayKnow,
}) {
  const me = useSelector((state) => state.me);
  const [reachedFeedEnd, setReachedFeedEnd] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const nextPageTriggerRef = useRef(null);
  const feedUrl = `${process.env.REACT_APP_API_BASE_URL}/api/my-feed/`;

  useEffect(() => {
    startObserving();

    if (!peopleYouMayKnow.length) {
      // fetch only on first load
      fetchPeopleYouMayKnow(me.token);
    }
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
            setPageNumber((prev) => prev + 1);
          }
        });
      },
      { rootMargin: "400px" }
    );

    observer.observe(nextPageTrigger);
  }

  async function fetchNextPage(pageNumber) {
    if (!me.token || !feedUrl || reachedFeedEnd) {
      return;
    }

    setIsLoading(true);

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
          for (let i = 0; i <= 3; i++) {
            const idx = (pageNumber - 1) * 3 + i;
            const newPost = resObj[i];
            if (!newPost) {
              break;
            } else {
              newFeed[idx] = { ...newFeed[idx], ...newPost };
            }
          }
          return newFeed;
        });
        if (resObj.length < 3) {
          setReachedFeedEnd(true);
        }
      }
    } catch (error) {
      console.log("error", error);
    }

    setIsLoading(false);
  }

  function setFeedComments(postId, comments) {
    setHomeFeed((prev) => {
      let newHomeFeed = [...prev];
      const idx = newHomeFeed.findIndex((post) => post && post._id === postId);
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
        <div className="people-you-may-know">
          <div className="title">People you may know</div>
          <div className="contacts">
            {peopleYouMayKnow.map((user) => (
              <Contact user={user} />
            ))}
          </div>
        </div>
      </div>
      <div className="home-feed">
        <Feed
          feed={homeFeed.slice(0, pageNumber * 3)}
          url={feedUrl}
          setFeedComments={setFeedComments}
          isLoading={isLoading}
        />
        <div className="next-page-trigger" ref={nextPageTriggerRef}></div>
      </div>
      <ContactsSidebar />
    </div>
  );
}

export default Home;
