import "../styles/MyFriends.css";
import FriendRequestCard from "./FriendRequestCard";
import FriendCard from "./FriendCard";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SpinThrobber from "./SpinThrobber";

function MyFriends({ fetchContacts, friendRequests, setFriendRequests }) {
  const me = useSelector((state) => state.me);
  const [reqsIsLoading, setReqsIsLoading] = useState(false);

  useEffect(() => {
    fetchFriendRequests();
    fetchContacts(me.user._id, me.token);
  }, []);

  async function fetchFriendRequests() {
    setReqsIsLoading(true);

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

    setReqsIsLoading(false);
  }

  let reqsToShow = null;

  if (reqsIsLoading) {
    reqsToShow = <SpinThrobber />;
  } else if (friendRequests.length) {
    reqsToShow = friendRequests.map((friendReq) => (
      <FriendRequestCard
        user={friendReq}
        setFriendRequests={setFriendRequests}
      />
    ));
  } else {
    reqsToShow = <div className="no-reqs-msg">You have no friend requests</div>;
  }

  return (
    <div className="MyFriends">
      <div className="friend-requests">
        <div className="title">Friend Requests</div>
        {reqsToShow}
        <div className="divider"></div>
      </div>
      <div className="friends">
        <div className="title">Friends</div>
        {me.contacts.length ? (
          me.contacts.map((user) => <FriendCard user={user} />)
        ) : (
          <div className="no-friends-msg">Start adding friends now!</div>
        )}
      </div>
    </div>
  );
}

export default MyFriends;
