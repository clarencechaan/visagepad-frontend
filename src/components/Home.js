import "../styles/Home.css";
import NavBar from "./NavBar";
import Feed from "./Feed";
import ContactsSidebar from "./ContactsSidebar";
import profilePic from "../images/profile-pic.jpeg";

function Home() {
  return (
    <div className="Home">
      <div className="sidebar">
        <a href="" className="me-link">
          <img src={profilePic} alt="" />
          <div className="name">Clarence Chan</div>
        </a>
      </div>
      <div className="home-feed">
        <Feed />
      </div>
      <ContactsSidebar />
    </div>
  );
}

export default Home;
