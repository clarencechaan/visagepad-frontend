import "../styles/SignUpForm.css";

function SignUpForm() {
  return (
    <div className="SignUpForm" tabIndex={-1}>
      <form action="">
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
        <div className="content">
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
          <button className="sign-up-btn">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
