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
        {media(user.pfp || blankUser, { className: "pfp", size: "l" })}
      </Link>
      <div className="details">
        <Link to={`/profile/${user._id}`} className="full-name">
          {`${user.first_name} ${user.last_name}`}
        </Link>
      </div>
    </div>
  );
}

export default FriendCard;
