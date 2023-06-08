import { useSelector, useDispatch } from "react-redux";
import { clearMe } from "../slices/meSlice";
import { Link } from "react-router-dom";
import { SignOut } from "phosphor-react";
import "../styles/NavBar.css";
import "../styles/YourProfileBtn.css";
import blankUser from "../images/blank-user.png";
import { media } from "../scripts/scripts";

function YourProfileBtn({ setHomeFeed, setFriendRequests }) {
  const me = useSelector((state) => state.me);
  const dispatch = useDispatch();

  function handleLogOutBtnClicked() {
    // clear me from state
    dispatch(clearMe());

    // clear home feed and friend requests
    setHomeFeed([]);
    setFriendRequests([]);

    // clear me from localstorage
    localStorage.removeItem("me");

    // log out from facebook
    window.FB.logout();
  }

  return (
    <div className="YourProfileBtn" tabIndex={-1}>
      <button className="has-tooltip">
        {media(me.user.pfp || blankUser, { size: "s" })}
      </button>
      <div className="window">
        <div className="user">
          <Link
            to={`/profile/${me.user._id}`}
            className="link"
            onClick={() => {
              document.activeElement.blur();
            }}
          >
            {media(me.user.pfp || blankUser, { size: "s" })}
            <div className="name">{`${me.user.first_name} ${me.user.last_name}`}</div>
          </Link>
        </div>
        <Link to="/" className="log-out-link" onClick={handleLogOutBtnClicked}>
          <div className="icon">
            <SignOut />
          </div>
          <span>Log Out</span>
        </Link>
        <a className="privacy-link" href="/privacy-policy.pdf">
          Privacy Policy
        </a>
      </div>
    </div>
  );
}

export default YourProfileBtn;
