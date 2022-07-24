import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/NewPostBtn.css";
import blankUser from "../images/blank-user.png";
import ComposePostForm from "./ComposePostForm";

function NewPostBtn() {
  const me = useSelector((state) => state.me);
  const [newPostFormShown, setNewPostFormShown] = useState(false);

  function handleNewPostBtnClicked() {
    setNewPostFormShown(true);
  }

  return (
    <div className="NewPostBtn">
      <Link to="/profile/:userId">
        <img
          src={me.user.pfp || blankUser}
          alt=""
          className="new-post-btn-pfp"
        />
      </Link>
      <div className="new-post-form-container">
        <button
          type="button"
          className="new-post-btn"
          onClick={handleNewPostBtnClicked}
        >
          {`What's on your mind, ${me.user.first_name}?`}
        </button>
        <ComposePostForm
          setComposePostFormShown={setNewPostFormShown}
          hidden={!newPostFormShown}
        />
      </div>
    </div>
  );
}

export default NewPostBtn;
