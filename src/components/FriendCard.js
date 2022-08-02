import { Link } from "react-router-dom";
import blankUser from "../images/blank-user.png";
import { media } from "../scripts/scripts";
import { useState } from "react";
import { getUsersTooltipContent } from "../scripts/scripts";

function FriendCard({ user }) {
  const [mutuals, setMutuals] = useState([]);

  return (
    <div className="FriendCard">
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
          <div className="count">
            {mutuals.length
              ? `${mutuals.length} mutual friend${
                  mutuals.length > 1 ? "s" : ""
                }`
              : null}
          </div>
        </Link>
      </div>
    </div>
  );
}

export default FriendCard;
