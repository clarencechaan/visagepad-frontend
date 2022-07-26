import { Link } from "react-router-dom";
import "../styles/Home.css";
import Feed from "./Feed";
import ContactsSidebar from "./ContactsSidebar";
import blankUser from "../images/blank-user.png";
import { useSelector } from "react-redux";
import { media } from "../scripts/scripts";

function Home({ homeFeed, setHomeFeed }) {
  const me = useSelector((state) => state.me);

  return (
    <div className="Home">
      <div className="sidebar">
        <Link to={`/profile/${me.user._id}`} className="me-link">
          {media(me.user.pfp || blankUser)}
          <div className="name">{`${me.user.first_name} ${me.user.last_name}`}</div>
        </Link>
      </div>
      <div className="home-feed">
        <Feed feed={homeFeed} setFeed={setHomeFeed} />
      </div>
      <ContactsSidebar />
    </div>
  );
}

export default Home;
