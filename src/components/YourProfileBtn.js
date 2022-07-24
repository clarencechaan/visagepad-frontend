import { useSelector, useDispatch } from "react-redux";
import { clearMe } from "../slices/meSlice";
import { Link } from "react-router-dom";
import { SignOut } from "phosphor-react";
import "../styles/NavBar.css";
import "../styles/YourProfileBtn.css";
import blankUser from "../images/blank-user.png";
import { smoothScrollToTop } from "../scripts/scripts";

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
      <button className="has-tooltip">
        <img src={me.user.pfp || blankUser} alt="" />
      </button>
      <div className="window">
        <div className="user">
          <Link
            to="/profile/:userId"
            className="link"
            onClick={() => {
              document.activeElement.blur();
              smoothScrollToTop();
            }}
          >
            <img src={me.user.pfp || blankUser} alt="" />
            <div className="name">{`${me.user.first_name} ${me.user.last_name}`}</div>
          </Link>
        </div>
        <button className="log-out-btn" onClick={handleLogOutBtnClicked}>
          <div className="icon">
            <SignOut />
          </div>
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}

export default YourProfileBtn;
