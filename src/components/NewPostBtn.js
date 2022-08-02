import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/NewPostBtn.css";
import blankUser from "../images/blank-user.png";
import ComposePostForm from "./ComposePostForm";
import { media } from "../scripts/scripts";

function NewPostBtn({ setHomeFeed }) {
  const me = useSelector((state) => state.me);
  const [newPostFormShown, setNewPostFormShown] = useState(false);

  function handleNewPostBtnClicked() {
    setNewPostFormShown(true);
  }

  return (
    <div className="NewPostBtn">
      <Link to={`/profile/${me.user._id}`}>
        {media(me.user.pfp || blankUser, "new-post-btn-pfp")}
      </Link>
      <div className="new-post-form-container">
        <button
          type="button"
          className="new-post-btn"
          onClick={handleNewPostBtnClicked}
        >
          {`What's on your mind, ${me.user.first_name}?`}
        </button>
        {newPostFormShown ? (
          <ComposePostForm
            setComposePostFormShown={setNewPostFormShown}
            setHomeFeed={setHomeFeed}
          />
        ) : null}
      </div>
    </div>
  );
}

export default NewPostBtn;
