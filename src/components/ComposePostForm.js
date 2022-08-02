import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/ComposePostForm.css";
import DotsThrobber from "./DotsThrobber";
import blankUser from "../images/blank-user.png";
import { Image } from "phosphor-react";
import { media } from "../scripts/scripts";

function ComposePostForm({
  setComposePostFormShown,
  editMode,
  postToEdit,
  setHomeFeed,
}) {
  const me = useSelector((state) => state.me);
  const textInputRef = useRef(null);
  const [post, setPost] = useState(postToEdit || {});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editMode && postToEdit && postToEdit.imgUrl) {
      setIsLoading(true);
    }

    focusTextInput();
    resizeTextInput();
  }, []);

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

    try {
      const response = await fetch(
        "https://api.imgur.com/3/image",
        requestOptions
      );
      const result = await response.text();
      const json = JSON.parse(result).data.link;
      return json;
    } catch (error) {
      console.log("error", error);
    }
  }

  async function handlePhotoPicked(e) {
    if (!e.target.files[0]) return;
    if (e.target.files[0].size > 10485760) {
      alert("File is too big. Max size is 10MB.");
      return;
    }

    setIsLoading(true);
    const imgUrlResponse = await uploadImage(e.target.files[0]);
    setPost((prev) => ({ ...prev, imgUrl: imgUrlResponse }));
  }

  function handleRemovePhotoBtnClicked() {
    setPost((prev) => ({ ...prev, imgUrl: "" }));
  }

  function handleCloseFormBtnClicked() {
    setComposePostFormShown(false);
  }

  function focusTextInput() {
    textInputRef.current.setSelectionRange(
      textInputRef.current.value.length,
      textInputRef.current.value.length
    );
    textInputRef.current.focus();
  }

  function resizeTextInput() {
    textInputRef.current.style.minHeight = "0px";
    textInputRef.current.style.minHeight =
      textInputRef.current.scrollHeight + "px";
  }

  function handleTextInputChanged(e) {
    resizeTextInput();
    setPost((prev) => ({ ...prev, content: e.target.value }));
  }

  async function handleFormSubmitted(e) {
    e.preventDefault();
    try {
      const postId = await uploadPost();
      const fetchedPost = await fetchNewPost(postId);
      setHomeFeed((prev) => {
        const newHomeFeed = [...prev];
        newHomeFeed.unshift(fetchedPost);
        return newHomeFeed;
      });
      setComposePostFormShown(false);
    } catch (error) {
      console.log("error", error);
    }
  }

  async function uploadPost() {
    const method = "POST";
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/users/${me.user._id}/posts`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + me.token,
    };
    const body = JSON.stringify(post);

    try {
      const response = await fetch(url, { headers, method, body });
      const resObj = await response.json();
      if (resObj.postId) {
        return resObj.postId;
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  async function fetchNewPost(postId) {
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/posts/${postId}`;

    try {
      const response = await fetch(url);
      const resObj = await response.json();
      if (resObj._id) {
        return resObj;
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div className="ComposePostForm">
      <form action="" onSubmit={handleFormSubmitted}>
        <button
          type="button"
          className="close-btn"
          onClick={handleCloseFormBtnClicked}
        >
          ✕
        </button>
        <div className="title-bar">
          <div className="title">{editMode ? "Edit post" : "Create post"}</div>
        </div>
        <div className="author-bar">
          <Link to={`/profile/${me.user._id}`}>
            {media(me.user.pfp || blankUser, "pfp")}
          </Link>
          <div className="text">
            <div className="surtitle">posting as</div>
            <div className="full-name">{`${me.user.first_name} ${me.user.last_name}`}</div>
          </div>
        </div>
        <div className="content">
          <textarea
            name="post-content"
            className="post-content"
            placeholder={`What's on your mind, ${me.user.first_name}?`}
            maxLength={1500}
            ref={textInputRef}
            onChange={handleTextInputChanged}
            value={post.content}
          />
          {!post.imgUrl && !isLoading ? (
            <label className="photo-picker-label">
              <div className="prompt">
                <Image weight="fill" className="icon" />
                Add a photo to your post
              </div>
              <input
                type="file"
                name="photo"
                accept="image/png, image/jpeg"
                onChange={handlePhotoPicked}
                hidden
              />
            </label>
          ) : (
            <div className="photo-preview-container">
              {isLoading ? <DotsThrobber /> : null}
              <div className={isLoading ? "hidden" : ""}>
                <img
                  src={post.imgUrl}
                  alt=""
                  className="photo-preview"
                  onLoad={() => {
                    setIsLoading(false);
                  }}
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
          )}
        </div>
        <button
          className={"done-btn"}
          disabled={!post.content}
          onClick={editMode ? () => {} : () => {}}
        >
          {editMode ? "Save" : "Post"}
        </button>
      </form>
    </div>
  );
}

export default ComposePostForm;
