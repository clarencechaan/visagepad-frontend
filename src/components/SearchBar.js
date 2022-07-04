import "../styles/SearchBar.css";
import { MagnifyingGlass, ArrowLeft } from "phosphor-react";

function SearchBar() {
  return (
    <div className="SearchBar" tabIndex={"-1"}>
      <input type="text" placeholder="Search VisagePad" />
      <MagnifyingGlass className="magnifying-glass" />
      <div className="window">
        <div className="top-bar">
          <button
            className="back-btn"
            onClick={(e) => {
              e.target.blur();
            }}
          >
            <ArrowLeft className="arrow-left" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
