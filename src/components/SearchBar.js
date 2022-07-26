import { Link } from "react-router-dom";
import "../styles/SearchBar.css";
import { MagnifyingGlass, ArrowLeft } from "phosphor-react";
import profilePic from "../images/profile-pic.jpeg";

function SearchBar() {
  function resultItem() {
    return (
      <Link
        to="/profile/:userId"
        className="result-item"
        onClick={() => {
          document.activeElement.blur();
        }}
      >
        <img src={profilePic} alt="" />
        <div className="text">
          <div className="full-name">Clarence Chan</div>
          <div className="relationship">Friend</div>
        </div>
      </Link>
    );
  }

  return (
    <div className="SearchBar" tabIndex={-1}>
      <input type="text" placeholder="Search VisagePad" />
      <MagnifyingGlass className="magnifying-glass" />
      <div className="window">
        <div className="top-bar">
          <button
            type="button"
            className="back-btn"
            onClick={(e) => {
              e.target.blur();
            }}
          >
            <ArrowLeft className="arrow-left" />
          </button>
        </div>
        <div className="results">
          {/* {[...Array(12)].map((e) => resultItem())} */}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
