import "../styles/NavBar.css";
import SearchBar from "./SearchBar";

function NavBar() {
  return (
    <div className="NavBar">
      <a href="" className="logo-small">
        v
      </a>
      <SearchBar />
    </div>
  );
}

export default NavBar;
