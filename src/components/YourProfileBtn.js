import { useSelector, useDispatch } from "react-redux";
import { clearMe } from "../slices/meSlice";
import { Link } from "react-router-dom";
import { SignOut } from "phosphor-react";
import "../styles/NavBar.css";
import "../styles/YourProfileBtn.css";
import blankUser from "../images/blank-user.png";
import { smoothScrollToTop } from "../scripts/scripts";
import { media } from "../scripts/scripts";

function YourProfileBtn() {
  const me = useSelector((state) => state.me);
  const dispatch = useDispatch();

  function handleLogOutBtnClicked() {
    // clear me from state
    dispatch(clearMe());

    // clear me from localstorage
    localStorage.removeItem("me");
  }

  return (
    <div className="YourProfileBtn" tabIndex={-1}>
      <button className="has-tooltip">{media(me.user.pfp || blankUser)}</button>
      <div className="window">
        <div className="user">
          <Link
            to={`/profile/${me.user._id}`}
            className="link"
            onClick={() => {
              document.activeElement.blur();
              smoothScrollToTop();
            }}
          >
            {media(me.user.pfp || blankUser)}
            <div className="name">{`${me.user.first_name} ${me.user.last_name}`}</div>
          </Link>
        </div>
        <Link to="/" className="log-out-link" onClick={handleLogOutBtnClicked}>
          <div className="icon">
            <SignOut />
          </div>
          <span>Log Out</span>
        </Link>
      </div>
    </div>
  );
}

export default YourProfileBtn;
