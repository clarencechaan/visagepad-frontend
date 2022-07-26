import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../styles/Feed.css";
import Post from "./Post";
import NewPostBtn from "./NewPostBtn";

function Feed({ feed, newPostBtnHidden, setFeed }) {
  const me = useSelector((state) => state.me);
  const nextPageTriggerRef = useRef(null);
  const [pageNumber, setPageNumber] = useState(1);

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
            setPageNumber((prev) => prev + 1);
          }
        });
      },
      { rootMargin: "800px" }
    );

    observer.observe(nextPageTrigger);
  }

  async function fetchNextPage(pageNumber) {
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/my-feed/${pageNumber}`;
    const headers = {
      Authorization: "Bearer " + me.token,
    };
    try {
      const response = await fetch(url, { headers });
      const resObj = await response.json();
      if (Array.isArray(resObj)) {
        setFeed((prev) => {
          const newFeed = [...prev, ...resObj];
          return newFeed;
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  }
  return (
    <div className="Feed">
      {newPostBtnHidden ? null : <NewPostBtn />}
      {feed.map((post) => (
        <Post post={post} />
      ))}
      <div className="next-page-trigger" ref={nextPageTriggerRef}></div>
    </div>
  );
}

export default Feed;
