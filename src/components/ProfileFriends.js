import "../styles/ProfileFriends.css";
import { Link } from "react-router-dom";
import { MagnifyingGlass, UserPlus, UserMinus, Check } from "phosphor-react";
import blankUser from "../images/blank-user.png";
import { media, smoothScrollToTop } from "../scripts/scripts";

function ProfileFriends({ friends }) {
  function friendItem(user) {
    return (
      <div className="friend-item">
        <Link to={`/profile/${user._id}`}>{media(user.pfp || blankUser)}</Link>
        <div className="text">
          <Link to={`/profile/${user._id}`} className="full-name">
            {`${user.first_name} ${user.last_name}`}
          </Link>
          <Link to="/profile/:userId/friends" className="mutual-friend-count">
            19 mutual friends
          </Link>
        </div>
        <div className="relationship">
          <button className="add-friend-btn">
            <UserPlus weight="fill" className="icon" />
            Add Friend
          </button>
          <button className="cancel-request-btn hidden">
            <UserMinus weight="fill" className="icon" />
            Cancel request
          </button>
          <div className="is-friend hidden">
            <Check weight="bold" className="icon" />
            <label htmlFor="">Friends</label>
          </div>
          <button className="unfriend-btn hidden">
            <UserMinus weight="fill" className="icon" />
            Unfriend
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ProfileFriends">
      <div className="top-bar">
        <button className="title" onClick={smoothScrollToTop}>
          All Friends
        </button>
        <div className="search-bar">
          <MagnifyingGlass className="icon" />
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className="grid">{friends.map((user) => friendItem(user))}</div>
    </div>
  );
}

export default ProfileFriends;
