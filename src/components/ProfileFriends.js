import "../styles/ProfileFriends.css";
import { MagnifyingGlass, UserPlus, UserMinus, Check } from "phosphor-react";
import { smoothScrollToTop } from "../scripts/scripts";
import ProfileFriendItem from "./ProfileFriendItem";

function ProfileFriends({ friends }) {
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
      <div className="grid">
        {friends.map((user) => (
          <ProfileFriendItem user={user} />
        ))}
      </div>
    </div>
  );
}

export default ProfileFriends;
