import { Link } from "react-router-dom";
import "../styles/NewPostBtn.css";
import profilePic from "../images/profile-pic.jpeg";
import { useState } from "react";
import ComposePostForm from "./ComposePostForm";

function NewPostBtn() {
  const [newPostFormShown, setNewPostFormShown] = useState(false);

  function handleNewPostBtnClicked() {
    setNewPostFormShown(true);
  }

  return (
    <div className="NewPostBtn">
      <Link to="/profile/:userId">
        <img src={profilePic} alt="" className="new-post-btn-pfp" />
      </Link>
      <div className="new-post-form-container">
        <button
          type="button"
          className="new-post-btn"
          onClick={handleNewPostBtnClicked}
        >
          What's on your mind, Clarence?
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
