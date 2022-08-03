import { Link } from "react-router-dom";
import "../styles/UserListItem.css";
import blankUser from "../images/blank-user.png";
import { UserPlus, UserMinus, Check } from "phosphor-react";
import { media } from "../scripts/scripts";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function UserListItem({ user, setUserListShown }) {
  const me = useSelector((state) => state.me);
  const [relationship, setRelationship] = useState("");

  function handleLinkClicked() {
    // hide user list
    setUserListShown(false);
  }

  useEffect(() => {
    fetchRelationship();
  }, []);

  function relationshipBtn() {
    let button = null;
    if (relationship === "Self") {
    } else if (relationship === "Friends") {
      button = (
        <div className="is-friend">
          <Check weight="bold" className="icon" />
          <label htmlFor="">Friend</label>
        </div>
      );
    } else if (relationship === "Requesting") {
      button = (
        <button className="accept-request-btn">
          <UserPlus weight="fill" className="icon" />
          Accept Request
        </button>
      );
    } else if (relationship === "Requestee") {
      button = (
        <button className="cancel-request-btn">
          <UserMinus weight="fill" className="icon" />
          Cancel Request
        </button>
      );
    } else if (relationship === "None") {
      button = (
        <button className="add-friend-btn">
          <UserPlus weight="fill" className="icon" />
          Add Friend
        </button>
      );
    }

    return <div className="relationship-btn-container">{button}</div>;
  }

  async function fetchRelationship() {
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/users/${user._id}/relationship`;
    const headers = {
      Authorization: "Bearer " + me.token,
    };
    try {
      const response = await fetch(url, { headers });
      const resObj = await response.json();
      if (resObj.status) {
        setRelationship(resObj.status);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div className="UserListItem">
      <Link to={`/profile/${user._id}`} onClick={handleLinkClicked}>
        {media(user.pfp || blankUser, "pfp")}
      </Link>
      <Link
        to={`/profile/${user._id}`}
        className="full-name"
        onClick={handleLinkClicked}
      >
        {`${user.first_name} ${user.last_name}`}
      </Link>
      {relationshipBtn()}
    </div>
  );
}

export default UserListItem;
