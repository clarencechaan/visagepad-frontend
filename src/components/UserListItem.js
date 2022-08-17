import { Link } from "react-router-dom";
import "../styles/UserListItem.css";
import blankUser from "../images/blank-user.png";
import { media } from "../scripts/scripts";
import RelationshipBtn from "./RelationshipBtn";

function UserListItem({ user, setUserListShown }) {
  function handleLinkClicked() {
    // hide user list
    setUserListShown(false);
  }

  return (
    <div className="UserListItem">
      <Link to={`/profile/${user._id}`} onClick={handleLinkClicked}>
        {media(user.pfp || blankUser, { className: "pfp", size: "s" })}
      </Link>
      <Link
        to={`/profile/${user._id}`}
        className="full-name"
        onClick={handleLinkClicked}
      >
        {`${user.first_name} ${user.last_name}`}
      </Link>
      {<RelationshipBtn userId={user._id} />}
    </div>
  );
}

export default UserListItem;
