import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/NavBar.css";
import SearchBar from "./SearchBar";
import YourProfileBtn from "./YourProfileBtn";
import homeSelected from "../images/home-selected.svg";
import homeUnselected from "../images/home-unselected.svg";
import friendsSelected from "../images/friends-selected.svg";
import friendsUnselected from "../images/friends-unselected.svg";
import { smoothScrollToTop } from "../scripts/scripts";

function NavBar() {
  const { pathname } = useLocation();
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (pathname === "/") {
      setSelected("home");
    } else if (pathname === "/my-friends") {
      setSelected("my-friends");
    } else {
      setSelected("");
    }
  }, [pathname]);

  const homeLink = (
    <Link
      to="/"
      className={
        "home-link has-tooltip" +
        (selected === "home" ? " selected" : " unselected")
      }
      onClick={smoothScrollToTop}
    >
      <img src={selected === "home" ? homeSelected : homeUnselected} alt="" />
    </Link>
  );

  const friendsLink = (
    <Link
      to="/my-friends"
      className={
        "friends-link has-tooltip" +
        (selected === "my-friends" ? " selected" : " unselected")
      }
      onClick={smoothScrollToTop}
    >
      <img
        src={selected === "my-friends" ? friendsSelected : friendsUnselected}
        alt=""
      />
    </Link>
  );

  return (
    <nav className="NavBar">
      <div className="left third">
        <Link to="/" className="logo-small" onClick={smoothScrollToTop}>
          v
        </Link>
        <SearchBar />
      </div>
      <div className="middle third">
        {homeLink}
        {friendsLink}
      </div>
      <div className="right third">
        <YourProfileBtn />
      </div>
    </nav>
  );
}

export default NavBar;
