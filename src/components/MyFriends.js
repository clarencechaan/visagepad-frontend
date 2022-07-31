import "../styles/MyFriends.css";
import FriendRequestCard from "./FriendRequestCard";
import FriendCard from "./FriendCard";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function MyFriends({ fetchContacts, friendRequests, setFriendRequests }) {
  const me = useSelector((state) => state.me);

  useEffect(() => {
    fetchFriendRequests();
  }, []);

  async function fetchFriendRequests() {
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/friend-requests`;
    const headers = {
      Authorization: "Bearer " + me.token,
    };
    try {
      const response = await fetch(url, { headers });
      const resObj = await response.json();
      if (Array.isArray(resObj)) {
        setFriendRequests((prev) => {
          let newFriendRequests = [...prev];
          for (const fetchedFr of resObj) {
            const idx = newFriendRequests.findIndex(
              (user) => user._id === fetchedFr._id
            );
            if (idx !== -1) {
              newFriendRequests[idx] = {
                ...newFriendRequests[idx],
                ...fetchedFr,
              };
            } else {
              newFriendRequests.push(fetchedFr);
            }
          }
          return newFriendRequests;
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div className="MyFriends">
      <div className="friend-requests">
        <div className="title">Friend Requests</div>
        {friendRequests.map((friendReq) => (
          <FriendRequestCard
            user={friendReq}
            setFriendRequests={setFriendRequests}
          />
        ))}
        <div className="divider"></div>
      </div>
      <div className="friends">
        <div className="title">Friends</div>
        {me.contacts.map((user) => (
          <FriendCard user={user} />
        ))}
      </div>
    </div>
  );
}

export default MyFriends;
