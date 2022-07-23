import { Link } from "react-router-dom";
import "../styles/Home.css";
import Feed from "./Feed";
import ContactsSidebar from "./ContactsSidebar";
import profilePic from "../images/profile-pic.jpeg";

function Home() {
  return (
    <div className="Home">
      <div className="sidebar">
        <Link to="/profile/:userId" className="me-link">
          <img src={profilePic} alt="" />
          <div className="name">Clarence Chan</div>
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
