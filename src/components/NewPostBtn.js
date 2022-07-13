import "../styles/NewPostBtn.css";
import profilePic from "../images/profile-pic.jpeg";

function NewPostBtn() {
  return (
    <div className="NewPostBtn">
      <a href="">
        <img src={profilePic} alt="" className="new-post-btn-pfp" />
      </a>
      <div className="new-post-form-container">
        <button className="new-post-btn" tabIndex={-1}>
          What's on your mind, Clarence?
        </button>
        <div className="new-post-form" tabIndex={-1}>
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
              <div className="title">Create post</div>
            </div>
            <div className="content">
              <div className="author-bar">
                <a href="">
                  <img src={profilePic} alt="" className="pfp" />
                </a>
                <div className="text">
                  <div className="surtitle">posting as</div>
                  <div className="full-name">Clarence Chan</div>
                </div>
              </div>
              <textarea
                name="post-content"
                id="post-content"
                placeholder="What's on your mind, Clarence?"
              ></textarea>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewPostBtn;
