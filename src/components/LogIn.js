import "../styles/LogIn.css";
import SignUpForm from "./SignUpForm";

function LogIn() {
  return (
    <div className="LogIn">
      <div className="logo-container">
        <label className="logo">visagepad</label>
        <div className="logo-subtext">
          Connect with friends and the world around you on VisagePad.
        </div>
      </div>
      <div className="window">
        <form action="" className="log-in-form">
          <input
            type="text"
            className="username"
            placeholder="Username"
            minLength={1}
            maxLength={24}
            required
          />
          <input
            type="password"
            className="password"
            placeholder="Password"
            minLength={1}
            maxLength={24}
            required
          />
          <button className="log-in-btn">Log In</button>
        </form>
        <a href="" class="fb connect">
          Log In with Facebook
        </a>
        <div className="divider" />
        <div className="new-account-container">
          <button className="new-account-btn">Create new account</button>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}

export default LogIn;
