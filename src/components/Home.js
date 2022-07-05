import "../styles/Home.css";
import NavBar from "./NavBar";
import profilePic from "../images/profile-pic.jpeg";

function Home() {
  return (
    <div className="Home">
      <NavBar />
      <main>
        <div className="sidebar">
          <a href="" className="me-link">
            <img src={profilePic} alt="" />
            <div className="name">Clarence Chan</div>
          </a>
        </div>
      </main>
    </div>
  );
}

export default Home;
