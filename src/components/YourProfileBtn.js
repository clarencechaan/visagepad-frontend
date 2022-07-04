import "../styles/NavBar.css";
import "../styles/YourProfileBtn.css";
import profilePic from "../images/profile-pic.jpeg";
import { SignOut } from "phosphor-react";

function YourProfileBtn() {
  return (
    <div className="YourProfileBtn" tabIndex={"-1"}>
      <button>
        <img src={profilePic} alt="" />
      </button>
      <div className="window">
        <div className="user">
          <a href="" className="link">
            <img src={profilePic} alt="" />
            <div className="name">Clarence Chan</div>
          </a>
        </div>
        <a href="" className="log-out-link">
          <div className="icon">
            <SignOut />
          </div>
          <span>Log Out</span>
        </a>
      </div>
    </div>
  );
}

export default YourProfileBtn;
