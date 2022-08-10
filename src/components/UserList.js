import "../styles/UserList.css";
import { ThumbsUp } from "phosphor-react";
import UserListItem from "./UserListItem";
import { addEscKeyDownListener } from "../scripts/scripts";
import { useEffect } from "react";

function UserList({ setUserListShown, users }) {
  useEffect(() => {
    return addEscKeyDownListener(setUserListShown);
  });

  function handleCloseBtnClicked() {
    setUserListShown(false);
  }

  return (
    <div className="UserList">
      <div className="user-list-window">
        <div className="top-bar">
          <div className="user-list-count">
            <div className="badge">
              <ThumbsUp weight="fill" />
            </div>
            <div className="count">{users.length}</div>
          </div>
          <button
            type="button"
            className="close-btn"
            onClick={handleCloseBtnClicked}
          >
            ✕
          </button>
        </div>
        <div className="user-list">
          {users.map((user) => (
            <UserListItem
              user={user}
              setUserListShown={setUserListShown}
              key={user._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserList;
