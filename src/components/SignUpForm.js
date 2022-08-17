import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../slices/meSlice";
import { disableScrolling, addEscKeyDownListener } from "../scripts/scripts";
import "../styles/SignUpForm.css";

function SignUpForm({ setSignUpFormShown }) {
  const dispatch = useDispatch();
  const [signUpMessage, setSignUpMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const enableScrolling = disableScrolling();
    const removeEscKeyDownListener = addEscKeyDownListener(setSignUpFormShown);

    return () => {
      enableScrolling();
      removeEscKeyDownListener();
    };
  }, []);

  function handleFormSubmitted(e) {
    e.preventDefault();
    createUser(e.target);
  }

  async function createUser(form) {
    setIsLoading(true);

    const first_name = form[1].value;
    const last_name = form[2].value;
    const username = form[3].value;
    const password = form[4].value;

    const method = "POST";
    const signUpUrl = process.env.REACT_APP_API_BASE_URL + "/api/users";
    const headers = {
      "Content-Type": "application/json",
    };
    const body = JSON.stringify({ first_name, last_name, username, password });

    try {
      const signUpResponse = await fetch(signUpUrl, { method, headers, body });
      const signUpResObj = await signUpResponse.json();
      if (signUpResObj.userId) {
        // log in to API if user created
        const logInUrl = process.env.REACT_APP_API_BASE_URL + "/auth/login";
        const logInResponse = await fetch(logInUrl, { method, headers, body });
        const logInResObj = await logInResponse.json();
        if (logInResObj.user) {
          // save user to state and localstorage if logged in successfully
          dispatch(setUser(logInResObj.user));
          dispatch(setToken(logInResObj.token));
          localStorage.setItem(
            "me",
            JSON.stringify({
              user: logInResObj.user,
              token: logInResObj.token,
            })
          );
        } else {
          setSignUpMessage(logInResObj.msg);
        }
      } else {
        setSignUpMessage(signUpResObj.msg);
      }
    } catch (error) {
      console.log("error", error);
    }

    form[3].value = "";
    form[4].value = "";
    setIsLoading(false);
  }

  function handleCloseBtnClicked() {
    setSignUpFormShown(false);
  }

  return (
    <div className="SignUpForm" tabIndex={-1}>
      <form
        action=""
        onSubmit={handleFormSubmitted}
        className={isLoading ? "disabled" : ""}
      >
        <button
          type="button"
          className="close-btn"
          onClick={handleCloseBtnClicked}
          disabled={isLoading}
        >
          ✕
        </button>
        <div className="title-bar">
          <div className="title">Sign Up</div>
          <div className="subtitle">It's quick and easy.</div>
        </div>
        <div className="content">
          <div className="full-name-inputs">
            <input
              type="text"
              placeholder="First name"
              minLength={1}
              maxLength={24}
              className="first-name"
              disabled={isLoading}
              required
            />
            <input
              type="text"
              placeholder="Last name"
              minLength={1}
              maxLength={24}
              className="last-name"
              disabled={isLoading}
              required
            />
          </div>
          <input
            type="text"
            placeholder="Username"
            minLength={1}
            maxLength={24}
            disabled={isLoading}
            required
          />
          <input
            type="password"
            placeholder="Password"
            minLength={1}
            maxLength={24}
            autoComplete="off"
            disabled={isLoading}
            required
          />
          <div className="sign-up-message">{signUpMessage}</div>
          <button className="sign-up-btn" disabled={isLoading}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
