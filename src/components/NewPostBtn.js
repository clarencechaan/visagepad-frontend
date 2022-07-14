import "../styles/NewPostBtn.css";
import profilePic from "../images/profile-pic.jpeg";
import { Image } from "phosphor-react";
import { useRef, useState } from "react";

function NewPostBtn() {
  const photoPreviewRef = useRef(null);
  const photoPickerRef = useRef(null);
  const photoPickerInput = useRef(null);
  const textInputRef = useRef(null);
  const [newPostFormShown, setNewPostFormShown] = useState(false);

  function handlePhotoPicked() {
    photoPreviewRef.current.hidden = false;
    photoPickerRef.current.hidden = true;
  }

  function handleRemovePhotoBtnClicked() {
    photoPreviewRef.current.hidden = true;
    photoPickerRef.current.hidden = false;
    photoPickerInput.current.value = "";
  }

  function handleNewPostBtnClicked() {
    setNewPostFormShown(true);
    setTimeout(focusTextInput, 1);
  }

  function handleCloseFormBtnClicked() {
    setNewPostFormShown(false);
  }

  function focusTextInput() {
    textInputRef.current.focus();
  }

  function resizeTextInput() {
    textInputRef.current.style.minHeight = "0px";
    textInputRef.current.style.minHeight =
      textInputRef.current.scrollHeight + "px";
  }

  return (
    <div className="NewPostBtn">
      <a href="">
        <img src={profilePic} alt="" className="new-post-btn-pfp" />
      </a>
      <div className="new-post-form-container">
        <button
          type="button"
          className="new-post-btn"
          onClick={handleNewPostBtnClicked}
        >
          What's on your mind, Clarence?
        </button>
        <div className={"new-post-form" + (newPostFormShown ? "" : " hidden")}>
          <form action="">
            <button
              type="button"
              className="close-btn"
              onClick={handleCloseFormBtnClicked}
            >
              ✕
            </button>
            <div className="title-bar">
              <div className="title">Create post</div>
            </div>
            <div className="author-bar">
              <a href="">
                <img src={profilePic} alt="" className="pfp" />
              </a>
              <div className="text">
                <div className="surtitle">posting as</div>
                <div className="full-name">Clarence Chan</div>
              </div>
            </div>
            <div className="content">
              <textarea
                name="post-content"
                id="post-content"
                placeholder="What's on your mind, Clarence?"
                maxLength={1500}
                ref={textInputRef}
                onChange={resizeTextInput}
              ></textarea>
              <input
                type="file"
                name="photo"
                id="photo-picker-input"
                accept="image/png, image/jpeg"
                onChange={handlePhotoPicked}
                ref={photoPickerInput}
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
            <button type="button" className="post-btn">
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewPostBtn;
