import "../styles/ProfileFriends.css";
import { MagnifyingGlass, UserPlus, UserMinus, Check } from "phosphor-react";
import { smoothScrollToTop } from "../scripts/scripts";
import ProfileFriendItem from "./ProfileFriendItem";
import { useState } from "react";

function ProfileFriends({ friends, friendsIsLoading }) {
  const [query, setQuery] = useState("");

  function handleInputChanged(e) {
    setQuery(e.target.value);
  }

  const sorted = [...friends].sort((a, b) =>
    a.first_name > b.first_name ? 1 : -1
  );

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
        {friends.length || friendsIsLoading ? (
          sorted.map((user) => (
            <ProfileFriendItem user={user} key={user._id} query={query} />
          ))
        ) : (
          <div className="no-friends-msg">No friends found</div>
        )}
      </div>
    </div>
  );
}

export default ProfileFriends;
