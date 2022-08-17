import "../styles/SearchBar.css";
import { MagnifyingGlass, ArrowLeft } from "phosphor-react";
import SearchResultItem from "./SearchResultItem";
import { useState, useEffect } from "react";
import { addEscKeyDownListener } from "../scripts/scripts";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [resultItems, setResultItems] = useState([]);

  useEffect(() => {
    if (query.length === 0) {
      setResultItems([]);
    } else {
      fetchResults();
    }

    return addEscKeyDownListener();
  }, [query]);

  async function fetchResults() {
    const terms = normalize(query).split(" ");
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/search-users/${query}`;
    try {
      const response = await fetch(url);
      const resObj = await response.json();
      if (Array.isArray(resObj)) {
        setResultItems(
          resObj.sort((a, b) =>
            normalize(a.first_name).substring(0, terms[0].length) === terms[0]
              ? -1
              : 1
          )
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  function handleInputChanged(e) {
    setQuery(e.target.value);
  }

  function normalize(str) {
    return str.trim().toLowerCase();
  }

  function handleInputFocused(e) {
    e.preventDefault();
  }

  return (
    <div className="SearchBar" tabIndex={-1}>
      <input
        type="text"
        placeholder="Search VisagePad"
        value={query}
        onChange={handleInputChanged}
        onFocus={handleInputFocused}
      />
      <MagnifyingGlass className="magnifying-glass" />
      <div className="window">
        <div className="top-bar">
          <button
            type="button"
            className="back-btn"
            onClick={() => {
              document.activeElement.blur();
            }}
          >
            <ArrowLeft className="arrow-left" />
          </button>
        </div>
        <div className="results">
          {resultItems.length ? (
            resultItems.map((user) => (
              <SearchResultItem user={user} query={query} key={user._id} />
            ))
          ) : (
            <div className="no-results">
              {!query ? "Start typing to find friends!" : "No results found"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
