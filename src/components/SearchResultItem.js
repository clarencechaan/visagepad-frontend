import "../styles/SearchResultItem.css";
import { Link } from "react-router-dom";
import blankUser from "../images/blank-user.png";
import { media } from "../scripts/scripts";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function SearchResultItem({ user, query }) {
  const me = useSelector((state) => state.me);
  const [relationship, setRelationship] = useState("");

  useEffect(() => {
    // fetchRelationship();
  }, [user._id]);

  async function fetchRelationship() {
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/users/${user._id}/relationship`;
    const headers = {
      Authorization: "Bearer " + me.token,
    };
    try {
      const response = await fetch(url, { headers });
      const resObj = await response.json();

      if (resObj.status === "Friends") {
        setRelationship("Friend");
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  function fullname() {
    const firstName = user.first_name;
    const lastName = user.last_name;
    const lcFirstName = firstName.toLowerCase();
    const lcLastName = lastName.toLowerCase();

    let firstNameStart = "";
    let firstNameEnd = firstName;
    let lastNameStart = "";
    let lastNameEnd = lastName;

    const terms = query.toLowerCase().split(" ");

    // separate query match from rest of string
    if (lcFirstName.includes(terms[0]) && !terms[1]) {
      firstNameStart = firstName.substring(0, terms[0].length);
      firstNameEnd = firstName.substring(terms[0].length);
    } else if (lcLastName.includes(terms[0]) && !terms[1]) {
      lastNameStart = lastName.substring(0, terms[0].length);
      lastNameEnd = lastName.substring(terms[0].length);
    } else if (
      lcFirstName.includes(terms[0]) &&
      lcLastName.includes(terms[1])
    ) {
      firstNameStart = firstName.substring(0, terms[0].length);
      firstNameEnd = firstName.substring(terms[0].length);
      lastNameStart = lastName.substring(0, terms[1].length);
      lastNameEnd = lastName.substring(terms[1].length);
    } else if (
      lcLastName.includes(terms[0]) &&
      lcFirstName.includes(terms[1])
    ) {
      firstNameStart = firstName.substring(0, terms[1].length);
      firstNameEnd = firstName.substring(terms[1].length);
      lastNameStart = lastName.substring(0, terms[0].length);
      lastNameEnd = lastName.substring(terms[0].length);
    }

    return (
      <div className="full-name">
        <span className="match">{firstNameStart}</span>
        {firstNameEnd} <span className="match">{lastNameStart}</span>
        {lastNameEnd}
      </div>
    );
  }

  return (
    <Link
      to={`/profile/${user._id}`}
      className="SearchResultItem"
      onClick={() => {
        document.activeElement.blur();
      }}
    >
      {media(user.pfp || blankUser)}
      <div className="text">
        {fullname()}
        <div className="relationship">{relationship}</div>
      </div>
    </Link>
  );
}

export default SearchResultItem;
