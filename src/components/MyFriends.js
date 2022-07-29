import "../styles/MyFriends.css";
import FriendRequestCard from "./FriendRequestCard";
import FriendCard from "./FriendCard";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

function MyFriends({ fetchContacts }) {
  const me = useSelector((state) => state.me);
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    fetchFriendRequests();
  }, []);

  async function fetchFriends() {}

  async function fetchFriendRequests() {
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/friend-requests`;
    const headers = {
      Authorization: "Bearer " + me.token,
    };
    try {
      const response = await fetch(url, { headers });
      const resObj = await response.json();
      if (Array.isArray(resObj)) {
        setFriendRequests(resObj);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

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

  return (
    <div className="MyFriends">
      <div className="friend-requests">
        <div className="title">Friend Requests</div>
        <div className="friend-request-cards">
          {friendRequests.map((friendReq) => (
            <FriendRequestCard user={friendReq} fetchMutuals={fetchMutuals} />
          ))}
        </div>
      </div>
      <div className="divider"></div>
      <div className="friends">
        <div className="title">Friends</div>
        <div className="friend-cards">
          {me.contacts.map((user) => (
            <FriendCard user={user} fetchMutuals={fetchMutuals} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyFriends;
