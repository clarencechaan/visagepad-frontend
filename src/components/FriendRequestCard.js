import { Link } from "react-router-dom";
import "../styles/FriendRequestCard.css";
import blankUser from "../images/blank-user.png";
import { media } from "../scripts/scripts";
import { useEffect, useState } from "react";
import { getUsersTooltipContent } from "../scripts/scripts";
import { useSelector } from "react-redux";

function FriendRequestCard({ user, setFriendRequests }) {
  const me = useSelector((state) => state.me);
  const mutuals = user.mutuals || [];
  const [makingRequest, setMakingRequest] = useState(false);

  useEffect(() => {
    fetchMutuals(user, setMutuals);
  }, []);

  async function fetchMutuals(user, setMutuals) {
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/users/${user._id}/mutuals`;
    const headers = {
      Authorization: "Bearer " + me.token,
    };
    try {
      const response = await fetch(url, {
        headers,
        // signal: fetchController.signal,
      });
      const resObj = await response.json();
      if (Array.isArray(resObj)) {
        setMutuals(resObj);
      }
    } catch (error) {
      if (!error.toString().includes("The user aborted a request")) {
        console.log("error", error);
      }
    }
  }

  function setMutuals(fetchedMutuals) {
    setFriendRequests((prev) => {
      let newFriendRequests = [...prev];
      const idx = prev.findIndex((u) => u && u._id === user._id);
      if (idx >= 0) {
        newFriendRequests[idx].mutuals = fetchedMutuals;
      }
      return newFriendRequests;
    });
  }

  async function allowFriendship() {
    const method = "PUT";
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/users/${user._id}/allow-friendship`;
    const headers = {
      Authorization: "Bearer " + me.token,
    };

    try {
      const response = await fetch(url, { headers, method });
      const resObj = await response.json();
      if (
        resObj.msg === "Friend request sent." ||
        resObj.msg === "Accepted friend request."
      ) {
        return true;
      } else {
        throw new Error(resObj.msg);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  async function disallowFriendship() {
    const method = "PUT";
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/users/${user._id}/disallow-friendship`;
    const headers = {
      Authorization: "Bearer " + me.token,
    };

    try {
      const response = await fetch(url, { headers, method });
      const resObj = await response.json();
      if (
        resObj.msg === "Denied friend request." ||
        resObj.msg === "Revoked friend request." ||
        resObj.msg === "Unfriended user."
      ) {
        return true;
      } else {
        throw new Error(resObj.msg);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  async function handleConfirmBtnClicked() {
    setMakingRequest(true);
    const didAcceptRequest = await allowFriendship();
    if (didAcceptRequest) {
      removeFriendRequest();
    }
    setMakingRequest(false);
  }

  async function handleDeleteBtnClicked() {
    setMakingRequest(true);
    const didDenyRequest = await disallowFriendship();
    if (didDenyRequest) {
      removeFriendRequest();
    }
    setMakingRequest(false);
  }

  async function removeFriendRequest() {
    setFriendRequests((prev) => {
      const idx = prev.findIndex((u) => u._id === user._id);
      let newFriendRequests = [...prev];
      if (idx >= 0) {
        newFriendRequests.splice(idx, 1);
      }
      return newFriendRequests;
    });
  }

  return (
    <div className="FriendRequestCard">
      <Link to={`/profile/${user._id}`} className="pfp-anchor">
        {media(user.pfp || blankUser, { className: "pfp" })}
      </Link>
      <div className="details">
        <Link to={`/profile/${user._id}`} className="full-name">
          {`${user.first_name} ${user.last_name}`}
        </Link>
        <Link
          to={`/profile/${user._id}/friends`}
          className="mutual-friends has-tooltip"
          data-descr={getUsersTooltipContent(mutuals)}
        >
          <div className="count">
            {mutuals.length
              ? `${mutuals.length} mutual friend${
                  mutuals.length > 1 ? "s" : ""
                }`
              : null}
          </div>
        </Link>
        <button
          type="button"
          className={"confirm-btn" + (makingRequest ? " making-request" : "")}
          onClick={handleConfirmBtnClicked}
          disabled={makingRequest}
        >
          Confirm
        </button>
        <button
          type="button"
          className={"delete-btn" + (makingRequest ? " making-request" : "")}
          onClick={handleDeleteBtnClicked}
          disabled={makingRequest}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default FriendRequestCard;
