import { Link } from "react-router-dom";
import "../styles/FriendRequestCard.css";
import blankUser from "../images/blank-user.png";
import { media } from "../scripts/scripts";
import { useEffect } from "react";
import { getUsersTooltipContent } from "../scripts/scripts";
import { useSelector } from "react-redux";

function FriendRequestCard({ user, setFriendRequests }) {
  const me = useSelector((state) => state.me);
  const mutuals = user.mutuals || [];

  useEffect(() => {
    fetchMutuals(user, setMutuals);
  }, []);

  async function fetchMutuals(user, setMutuals) {
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/users/${user._id}/mutuals`;
    const headers = {
      Authorization: "Bearer " + me.token,
    };
    try {
      const response = await fetch(url, {
        headers,
        // signal: fetchController.signal,
      });
      const resObj = await response.json();
      if (Array.isArray(resObj)) {
        setMutuals(resObj);
      }
    } catch (error) {
      if (!error.toString().includes("The user aborted a request")) {
        console.log("error", error);
      }
    }
  }

  function setMutuals(fetchedMutuals) {
    setFriendRequests((prev) => {
      let newFriendRequests = [...prev];
      const idx = prev.findIndex((u) => u._id === user._id);
      newFriendRequests[idx].mutuals = fetchedMutuals;
      return newFriendRequests;
    });
  }

  return (
    <div className="FriendRequestCard">
      <Link to={`/profile/${user._id}`} className="pfp-anchor">
        {media(user.pfp || blankUser, "pfp")}
      </Link>
      <div className="details">
        <Link to={`/profile/${user._id}`} className="full-name">
          {`${user.first_name} ${user.last_name}`}
        </Link>
        <Link
          to={`/profile/${user._id}/friends`}
          className="mutual-friends has-tooltip"
          data-descr={getUsersTooltipContent(mutuals)}
        >
          {/* <div className="pfps">
            {mutuals
              .slice(0, 2)
              .map((user) => media(user.pfp || blankUser, "mutual-pfp"))}
          </div> */}
          <div className="count">
            {mutuals.length
              ? `${mutuals.length} mutual friend${
                  mutuals.length > 1 ? "s" : ""
                }`
              : null}
          </div>
        </Link>
        <button type="button" className="confirm-btn">
          Confirm
        </button>
        <button type="button" className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
}

export default FriendRequestCard;
