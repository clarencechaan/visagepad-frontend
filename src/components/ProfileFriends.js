import "../styles/ProfileFriends.css";
import { MagnifyingGlass, UserPlus, UserMinus, Check } from "phosphor-react";
import { smoothScrollToTop } from "../scripts/scripts";
import ProfileFriendItem from "./ProfileFriendItem";
import { useState } from "react";

function ProfileFriends({ friends }) {
  const [query, setQuery] = useState("");

  function handleInputChanged(e) {
    setQuery(e.target.value);
  }

  return (
    <div className="ProfileFriends">
      <div className="top-bar">
        <button className="title" onClick={smoothScrollToTop}>
          All Friends
        </button>
        <div className="search-bar">
          <MagnifyingGlass className="icon" />
          <input
            type="text"
            placeholder="Search"
            onChange={handleInputChanged}
            value={query}
          />
        </div>
      </div>
      <div className="grid">
        {friends.map((user) => (
          <ProfileFriendItem user={user} key={user._id} query={query} />
        ))}
      </div>
    </div>
  );
}

export default ProfileFriends;
