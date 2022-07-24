import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../slices/meSlice";
import "../styles/SignUpForm.css";

function SignUpForm() {
  const dispatch = useDispatch();
  const [signUpMessage, setSignUpMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleFormSubmitted(e) {
    e.preventDefault();

    const firstName = e.target[1].value;
    const lastName = e.target[2].value;
    const username = e.target[3].value;
    const password = e.target[4].value;

    createUser(firstName, lastName, username, password);
    e.target.reset();
  }

  async function createUser(first_name, last_name, username, password) {
    setIsLoading(true);

    const method = "POST";
    const signUpUrl = process.env.REACT_APP_API_BASE_URL + "/api/users";
    const headers = {
      "Content-Type": "application/json",
    };
    const body = JSON.stringify({ first_name, last_name, username, password });

    try {
      const signUpResponse = await fetch(signUpUrl, { method, headers, body });
      const signUpResObj = await signUpResponse.json();
      console.log(signUpResObj);
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

    setIsLoading(false);
  }

  return (
    <div className="SignUpForm" tabIndex={-1}>
      <form action="" onSubmit={handleFormSubmitted}>
        <button
          type="button"
          className="close-btn"
          onClick={(e) => {
            e.target.blur();
          }}
        >
          ✕
        </button>
        <div className="title-bar">
          <div className="title">Sign Up</div>
          <div className="subtitle">It's quick and easy.</div>
        </div>
        <div className={"content" + (isLoading ? " disabled" : "")}>
          <div className="full-name-inputs">
            <input
              type="text"
              placeholder="First name"
              minLength={1}
              maxLength={24}
              className="first-name"
              required
            />
            <input
              type="text"
              placeholder="Last name"
              minLength={1}
              maxLength={24}
              className="last-name"
              required
            />
          </div>
          <input
            type="text"
            placeholder="Username"
            minLength={1}
            maxLength={24}
            required
          />
          <input
            type="password"
            placeholder="Password"
            minLength={1}
            maxLength={24}
            required
          />
          <div className="sign-up-message">{signUpMessage}</div>
          <button className="sign-up-btn">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
