import "../styles/NewPostBtn.css";
import profilePic from "../images/profile-pic.jpeg";
import { Image } from "phosphor-react";
import { useRef } from "react";

function NewPostBtn() {
  const photoPreviewRef = useRef(null);
  const photoPickerRef = useRef(null);

  function handlePhotoPicked() {
    photoPreviewRef.current.hidden = false;
    photoPickerRef.current.hidden = true;
  }

  function handleRemovePhotoBtnClicked() {
    photoPreviewRef.current.hidden = true;
    photoPickerRef.current.hidden = false;
  }

  return (
    <div className="NewPostBtn">
      <a href="">
        <img src={profilePic} alt="" className="new-post-btn-pfp" />
      </a>
      <div className="new-post-form-container">
        <button type="button" className="new-post-btn" tabIndex={-1}>
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
              <input
                type="file"
                name="photo"
                id="photo-picker-input"
                accept="image/png, image/jpeg"
                onChange={handlePhotoPicked}
                hidden
              />
              <label
                htmlFor="photo-picker-input"
                className="photo-picker-label"
                ref={photoPickerRef}
              >
                <div className="prompt">
                  <Image weight="fill" className="icon" />
                  Add a photo to your post
                </div>
              </label>
              <div
                className="photo-preview-container"
                ref={photoPreviewRef}
                hidden
              >
                <img
                  src="https://i.imgur.com/w0EF8bN.jpeg"
                  alt=""
                  className="photo-preview"
                />
                <button
                  type="button"
                  className="remove-btn"
                  onClick={handleRemovePhotoBtnClicked}
                >
                  ✕
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewPostBtn;
