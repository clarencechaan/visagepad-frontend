import "../styles/NavBar.css";
import SearchBar from "./SearchBar";
import YourProfileBtn from "./YourProfileBtn";
import homeSelected from "../images/home-selected.svg";
import friendsUnselected from "../images/friends-unselected.svg";

function NavBar() {
  return (
    <div className="NavBar">
      <div className="left third">
        <a href="" className="logo-small">
          v
        </a>
        <SearchBar />
      </div>
      <div className="middle third">
        <a href="" className="home-link selected">
          <img src={homeSelected} alt="" />
        </a>
        <a href="" className="friends-link unselected">
          <img src={friendsUnselected} alt="" />
        </a>
      </div>
      <div className="right third">
        <YourProfileBtn />
      </div>
    </div>
  );
}

export default NavBar;
