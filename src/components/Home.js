import { Link } from "react-router-dom";
import "../styles/Home.css";
import Feed from "./Feed";
import ContactsSidebar from "./ContactsSidebar";
import blankUser from "../images/blank-user.png";
import { useSelector } from "react-redux";

function Home() {
  const me = useSelector((state) => state.me);

  return (
    <div className="Home">
      <div className="sidebar">
        <Link to="/profile/:userId" className="me-link">
          <img src={me.user.pfp || blankUser} alt="" />
          <div className="name">{`${me.user.first_name} ${me.user.last_name}`}</div>
        </Link>
      </div>
      <div className="home-feed">
        <Feed />
      </div>
      <ContactsSidebar />
    </div>
  );
}

export default Home;
