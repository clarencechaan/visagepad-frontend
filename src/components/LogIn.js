import "../styles/LogIn.css";

function LogIn() {
  return (
    <div className="LogIn">
      <div className="logo-container">
        <label className="logo">visagepad</label>
        <div className="logo-subtext">
          Connect with friends and the world around you on VisagePad.
        </div>
      </div>
      <form action="">
        <input
          type="text"
          className="username"
          placeholder="Email or phone number"
        />
        <input type="password" className="password" placeholder="Password" />
        <button className="log-in-btn">Log In</button>
        <div className="divider"></div>
        <button className="new-account-btn">Create new account</button>
      </form>
    </div>
  );
}

export default LogIn;
