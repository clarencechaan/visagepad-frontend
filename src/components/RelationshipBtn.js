import "../styles/RelationshipBtn.css";
import { Check, UserMinus, UserPlus } from "phosphor-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function RelationshipBtn({ unfriendBtn, userId }) {
  const me = useSelector((state) => state.me);
  const [relationship, setRelationship] = useState("");
  const [makingRequest, setMakingRequest] = useState(false);

  useEffect(() => {
    setRelationship("");
    fetchRelationship();
  }, [userId]);

  async function allowFriendship() {
    const method = "PUT";
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/users/${userId}/allow-friendship`;
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
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/users/${userId}/disallow-friendship`;
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

  async function fetchRelationship() {
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/users/${userId}/relationship`;
    const headers = {
      Authorization: "Bearer " + me.token,
    };
    try {
      const response = await fetch(url, { headers });
      const resObj = await response.json();
      if (resObj.status) {
        setRelationship(resObj.status);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  async function handleAddFriendBtnClicked() {
    setMakingRequest(true);
    const didAddFriend = await allowFriendship();
    if (didAddFriend) {
      setRelationship("Requestee");
    }
    setMakingRequest(false);
  }

  async function handleCancelRequestBtnClicked() {
    setMakingRequest(true);
    const didCancelRequest = await disallowFriendship();
    if (didCancelRequest) {
      setRelationship("None");
    }
    setMakingRequest(false);
  }

  async function handleUnfriendBtnClicked() {
    setMakingRequest(true);
    const didUnfriend = await disallowFriendship();
    if (didUnfriend) {
      setRelationship("None");
    }
    setMakingRequest(false);
  }

  async function handleAcceptRequestBtnClicked() {
    setMakingRequest(true);
    const didAcceptRequest = await allowFriendship();
    if (didAcceptRequest) {
      setRelationship("Friends");
    }
    setMakingRequest(false);
  }

  async function handleDenyRequestBtnClicked() {
    setMakingRequest(true);
    const didDenyRequest = await disallowFriendship();
    if (didDenyRequest) {
      setRelationship("None");
    }
    setMakingRequest(false);
  }

  let button1 = null;
  let button2 = null;

  if (relationship === "Friends") {
    button1 = (
      <div className="is-friend">
        <Check weight="bold" className="icon" />
        <label htmlFor="">Friend</label>
      </div>
    );
    if (unfriendBtn) {
      button2 = (
        <button
          className={"unfriend-btn" + (makingRequest ? " making-request" : "")}
          onClick={handleUnfriendBtnClicked}
          disabled={makingRequest}
        >
          <UserMinus weight="fill" className="icon" />
          Unfriend
        </button>
      );
    }
  } else if (relationship === "Requesting") {
    button1 = (
      <button
        className={
          "accept-request-btn" + (makingRequest ? " making-request" : "")
        }
        onClick={handleAcceptRequestBtnClicked}
        disabled={makingRequest}
      >
        <UserPlus weight="fill" className="icon" />
        Accept Request
      </button>
    );
    button2 = (
      <button
        className={
          "deny-request-btn" + (makingRequest ? " making-request" : "")
        }
        onClick={handleDenyRequestBtnClicked}
        disabled={makingRequest}
      >
        <UserPlus weight="fill" className="icon" />
        Deny Request
      </button>
    );
  } else if (relationship === "Requestee") {
    button1 = (
      <button
        className={
          "cancel-request-btn" + (makingRequest ? " making-request" : "")
        }
        onClick={handleCancelRequestBtnClicked}
        disabled={makingRequest}
      >
        <UserMinus weight="fill" className="icon" />
        Cancel Request
      </button>
    );
  } else if (relationship === "None") {
    button1 = (
      <button
        className={"add-friend-btn" + (makingRequest ? " making-request" : "")}
        onClick={handleAddFriendBtnClicked}
        disabled={makingRequest}
      >
        <UserPlus weight="fill" className="icon" />
        Add Friend
      </button>
    );
  }

  return (
    <div className="RelationshipBtn">
      {button1}
      {button2}
    </div>
  );
}

export default RelationshipBtn;
