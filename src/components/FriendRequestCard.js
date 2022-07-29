import { Link } from "react-router-dom";
import "../styles/FriendRequestCard.css";
import blankUser from "../images/blank-user.png";
import { media } from "../scripts/scripts";
import { useState, useEffect } from "react";
import { getUsersTooltipContent } from "../scripts/scripts";

function FriendRequestCard({ user, fetchMutuals }) {
  const [mutuals, setMutuals] = useState([]);

  useEffect(() => {
    fetchMutuals(user, setMutuals);
  }, []);

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
