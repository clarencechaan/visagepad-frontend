import "../styles/ProfileFriendItem.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { media } from "../scripts/scripts";
import blankUser from "../images/blank-user.png";
import { Check, UserMinus, UserPlus } from "phosphor-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function ProfileFriendItem({ user, query }) {
  const me = useSelector((state) => state.me);
  const [relationship, setRelationship] = useState("");
  const [mutualCount, setMutualCount] = useState(0);
  const [isShown, setIsShown] = useState(true);
  let fetchController = new AbortController();
  let abortFetchEnabled = false;

  useEffect(() => {
    setTimeout(() => {
      abortFetchEnabled = true;
    }, 1);

    fetchRelationship();
    fetchMutualsCount();

    return () => {
      if (abortFetchEnabled) {
        fetchController.abort();
      }
    };
  }, []);

  useEffect(() => {
    const firstName = normalize(user.first_name);
    const lastName = normalize(user.last_name);
    const terms = normalize(query).split(" ");

    const userMatches =
      (firstName.substring(0, terms[0].length) === terms[0] ||
        lastName.substring(0, terms[0].length) === terms[0]) &&
      (!terms[1] ||
        firstName.substring(0, terms[1].length) === terms[1] ||
        lastName.substring(0, terms[1].length) === terms[1]);

    if (userMatches) {
      setIsShown(true);
    } else {
      setIsShown(false);
    }
  }, [query]);

  function normalize(str) {
    return str.trim().replace(/  +/g, " ").toLowerCase();
  }

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
      const response = await fetch(url, {
        headers,
        signal: fetchController.signal,
      });
      const resObj = await response.json();
      if (resObj.status) {
        setRelationship(resObj.status);
      }
    } catch (error) {
      if (!error.toString().includes("The user aborted a request")) {
        console.log("error", error);
      }
    }
  }

  async function fetchMutualsCount() {
    if (me && me.user && me.user._id === user._id) {
      return;
    }
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/users/${user._id}/mutuals`;
    const headers = {
      Authorization: "Bearer " + me.token,
    };
    try {
      const response = await fetch(url, {
        headers,
        signal: fetchController.signal,
      });
      const resObj = await response.json();
      if (Array.isArray(resObj)) {
        setMutualCount(resObj.length);
      }
    } catch (error) {
      if (!error.toString().includes("The user aborted a request")) {
        console.log("error", error);
      }
    }
  }

  return (
    <div className={"ProfileFriendItem" + (isShown ? "" : " hidden")}>
      <Link to={`/profile/${user._id}`}>{media(user.pfp || blankUser)}</Link>
      <div className="text">
        <Link to={`/profile/${user._id}`} className="full-name">
          {`${user.first_name} ${user.last_name}`}
        </Link>
        {mutualCount ? (
          <Link
            to={`/profile/${user._id}/friends`}
            className="mutual-friend-count"
          >
            {mutualCount === 1
              ? "1 mutual friend"
              : mutualCount + " mutual friends"}
          </Link>
        ) : null}
      </div>
      {relationshipBtn()}
    </div>
  );
}

export default ProfileFriendItem;
