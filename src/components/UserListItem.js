import { Link } from "react-router-dom";
import "../styles/UserListItem.css";
import profilePic from "../images/profile-pic.jpeg";
import { UserPlus, UserMinus, Check } from "phosphor-react";

function UserListItem() {
  return (
    <div className="UserListItem">
      <Link to="/profile/:userId">
        <img src={profilePic} alt="" className="pfp" />
      </Link>
      <Link to="/profile/:userId" className="full-name">
        Clarence Chan
      </Link>
      <button className="add-friend-btn hidden">
        <UserPlus weight="fill" className="icon" />
        Add Friend
      </button>
      <button className="cancel-request-btn hidden">
        <UserMinus weight="fill" className="icon" />
        Cancel request
      </button>
      <div className="is-friend">
        <Check weight="bold" className="icon" />
        <label htmlFor="">Friends</label>
      </div>
    </div>
  );
}

export default UserListItem;
