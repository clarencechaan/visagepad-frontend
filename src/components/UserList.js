import "../styles/UserList.css";
import { ThumbsUp } from "phosphor-react";
import { useState } from "react";
import UserListItem from "./UserListItem";

function UserList({ setUserListShown }) {
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
            <div className="count">1</div>
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
          <UserListItem />
          <UserListItem />
          <UserListItem />
          <UserListItem />
          <UserListItem />
          <UserListItem />
          <UserListItem />
          <UserListItem />
          <UserListItem />
          <UserListItem />
          <UserListItem />
          <UserListItem />
          <UserListItem />
          <UserListItem />
          <UserListItem />
          <UserListItem />
          <UserListItem />
          <UserListItem />
          <UserListItem />
          <UserListItem />
          <UserListItem />
          <UserListItem />
        </div>
      </div>
    </div>
  );
}

export default UserList;
