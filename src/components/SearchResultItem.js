import "../styles/SearchResultItem.css";
import { Link } from "react-router-dom";
import blankUser from "../images/blank-user.png";
import { media } from "../scripts/scripts";

function SearchResultItem({ user, query }) {
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
      {media(user.pfp || blankUser, { size: "s" })}
      <div className="text">{fullname()}</div>
    </Link>
  );
}

export default SearchResultItem;
