import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setToken } from "../slices/meSlice";
import "../styles/LogIn.css";
import SignUpForm from "./SignUpForm";

function LogIn() {
  const me = useSelector((state) => state.me);
  const dispatch = useDispatch();
  const [loginMessage, setLoginMessage] = useState("");

  async function login(username, password) {
    console.log(me);
    const method = "POST";
    const url = process.env.REACT_APP_API_BASE_URL + "/auth/login";
    const headers = {
      "Content-Type": "application/json",
    };
    const body = JSON.stringify({ username, password });
    const response = await fetch(url, { method, headers, body });
    const resObj = await response.json();
    if (resObj.user) {
      dispatch(setUser(resObj.user));
      dispatch(setToken(resObj.token));
    } else {
      setLoginMessage(resObj.info);
    }
  }

  function handleFormSubmitted(e) {
    e.preventDefault();

    const username = e.target[0].value;
    const password = e.target[1].value;
    e.target.reset();

    login(username, password);
  }

  function clearLoginMessage() {
    setLoginMessage("");
  }

  return (
    <div className="LogIn">
      <div className="logo-container">
        <label className="logo">visagepad</label>
        <div className="logo-subtext">
          Connect with friends and the world around you on VisagePad.
        </div>
      </div>
      <div className="window">
        <form action="" className="log-in-form" onSubmit={handleFormSubmitted}>
          <input
            type="text"
            className="username"
            placeholder="Username"
            minLength={1}
            maxLength={24}
            onChange={clearLoginMessage}
            required
          />
          <input
            type="password"
            className="password"
            placeholder="Password"
            minLength={1}
            maxLength={24}
            onChange={clearLoginMessage}
            required
          />
          <div className="login-message">{loginMessage}</div>
          <button className="log-in-btn">Log In</button>
        </form>
        <a href="" className="fb connect">
          Log In with Facebook
        </a>
        <div className="divider" />
        <div className="new-account-container">
          <button type="button" className="new-account-btn">
            Create new account
          </button>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}

export default LogIn;
