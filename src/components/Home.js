import { Link } from "react-router-dom";
import "../styles/Home.css";
import Feed from "./Feed";
import ContactsSidebar from "./ContactsSidebar";
import blankUser from "../images/blank-user.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { media } from "../scripts/scripts";

function Home() {
  const [homeFeed, setHomeFeed] = useState([]);
  const me = useSelector((state) => state.me);
  const feedUrl = `${process.env.REACT_APP_API_BASE_URL}/api/my-feed/`;

  return (
    <div className="Home">
      <div className="sidebar">
        <Link to={`/profile/${me.user._id}`} className="me-link">
          {media(me.user.pfp || blankUser)}
          <div className="name">{`${me.user.first_name} ${me.user.last_name}`}</div>
        </Link>
      </div>
      <div className="home-feed">
        <Feed feed={homeFeed} setFeed={setHomeFeed} url={feedUrl} />
      </div>
      <ContactsSidebar />
    </div>
  );
}

export default Home;
