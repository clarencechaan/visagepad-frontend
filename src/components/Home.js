import { Link } from "react-router-dom";
import "../styles/Home.css";
import Feed from "./Feed";
import ContactsSidebar from "./ContactsSidebar";
import blankUser from "../images/blank-user.png";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function Home({ homeFeed, setHomeFeed }) {
  const me = useSelector((state) => state.me);

  useEffect(() => {
    fetchFeed();
  }, []);

  async function fetchFeed() {
    const url = process.env.REACT_APP_API_BASE_URL + "/api/my-feed";
    const headers = {
      Authorization: "Bearer " + me.token,
    };
    try {
      const response = await fetch(url, { headers });
      const resObj = await response.json();
      if (Array.isArray(resObj)) {
        setHomeFeed(resObj.slice(0, 10));
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div className="Home">
      <div className="sidebar">
        <Link to={`/profile/${me.user._id}`} className="me-link">
          <img src={me.user.pfp || blankUser} alt="" />
          <div className="name">{`${me.user.first_name} ${me.user.last_name}`}</div>
        </Link>
      </div>
      <div className="home-feed">
        <Feed feed={homeFeed} />
      </div>
      <ContactsSidebar />
    </div>
  );
}

export default Home;
