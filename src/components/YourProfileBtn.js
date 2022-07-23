import { Link } from "react-router-dom";
import { SignOut } from "phosphor-react";
import "../styles/NavBar.css";
import "../styles/YourProfileBtn.css";
import profilePic from "../images/profile-pic.jpeg";
import { smoothScrollToTop } from "../scripts/scripts";

function YourProfileBtn() {
  return (
    <div className="YourProfileBtn" tabIndex={-1}>
      <button className="has-tooltip">
        <img src={profilePic} alt="" />
      </button>
      <div className="window">
        <div className="user">
          <Link
            to="/profile/:userId"
            className="link"
            onClick={() => {
              document.activeElement.blur();
              smoothScrollToTop();
            }}
          >
            <img src={profilePic} alt="" />
            <div className="name">Clarence Chan</div>
          </Link>
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
