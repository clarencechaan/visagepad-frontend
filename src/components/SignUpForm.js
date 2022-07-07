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
        <input
          type="text"
          placeholder="First name"
          minLength={1}
          maxLength={24}
          required
        />
        <input
          type="text"
          placeholder="Last name"
          minLength={1}
          maxLength={24}
          required
        />
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
      </form>
    </div>
  );
}

export default SignUpForm;
