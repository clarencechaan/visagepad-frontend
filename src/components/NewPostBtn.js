import "../styles/NewPostBtn.css";
import profilePic from "../images/profile-pic.jpeg";
import { Image } from "phosphor-react";
import { useRef, useState } from "react";
import Throbber from "./Throbber";

function NewPostBtn() {
  const textInputRef = useRef(null);
  const [newPostFormShown, setNewPostFormShown] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function uploadImage(file) {
    const CLIENT_ID = "f78d31a8887d509";

    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Client-ID ${CLIENT_ID}`);

    let formdata = new FormData();
    formdata.append("image", file);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    return fetch("https://api.imgur.com/3/image", requestOptions)
      .then((response) => response.text())
      .then((result) => JSON.parse(result).data.link)
      .catch((error) => console.log("error", error));
  }

  async function handlePhotoPicked(e) {
    if (!e.target.files[0]) return;
    if (e.target.files[0].size > 10485760) {
      alert("File is too big. Max size is 10MB.");
      return;
    }

    setIsLoading(true);
    const imgUrlResponse = await uploadImage(e.target.files[0]);
    setImgUrl(imgUrlResponse);
    setIsLoading(false);
  }

  function handleRemovePhotoBtnClicked() {
    setImgUrl("");
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

  function handleTextInputChanged(e) {
    resizeTextInput();
    setPostContent(e.target.value);
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
                onChange={handleTextInputChanged}
                value={postContent}
              ></textarea>
              <input
                type="file"
                name="photo"
                id="photo-picker-input"
                accept="image/png, image/jpeg"
                onChange={handlePhotoPicked}
                hidden
              />
              {!imgUrl && !isLoading ? (
                <label
                  htmlFor="photo-picker-input"
                  className="photo-picker-label"
                >
                  <div className="prompt">
                    <Image weight="fill" className="icon" />
                    Add a photo to your post
                  </div>
                </label>
              ) : (
                <div className="photo-preview-container">
                  {isLoading ? (
                    <Throbber />
                  ) : (
                    <div>
                      <img src={imgUrl} alt="" className="photo-preview" />
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={handleRemovePhotoBtnClicked}
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <button
              type="button"
              className={"post-btn"}
              disabled={!postContent}
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewPostBtn;
