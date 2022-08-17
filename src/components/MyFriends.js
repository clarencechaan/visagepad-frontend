import "../styles/MyFriends.css";
import FriendRequestCard from "./FriendRequestCard";
import FriendCard from "./FriendCard";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SpinThrobber from "./SpinThrobber";
import Footer from "./Footer";

function MyFriends({ fetchContacts, friendRequests, setFriendRequests }) {
  const me = useSelector((state) => state.me);
  const [reqsIsLoading, setReqsIsLoading] = useState(false);

  useEffect(() => {
    fetchFriendRequests();
    fetchContacts(me.user._id, me.token);
  }, []);

  async function fetchFriendRequests() {
    if (!friendRequests.length) {
      // show Throbber on first fetch only
      setReqsIsLoading(true);
    }

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
          for (const resUser of resObj) {
            const idx = prev.findIndex((user) => user._id === resUser._id);
            if (idx >= 0) {
              newFriendRequests[idx] = {
                ...newFriendRequests[idx],
                ...resUser,
              };
            } else {
              newFriendRequests.push(resUser);
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

  const sortedContacts = [...me.contacts].sort((a, b) =>
    a.first_name > b.first_name ? 1 : -1
  );

  let reqsToShow = null;

  if (reqsIsLoading) {
    reqsToShow = <SpinThrobber />;
  } else if (friendRequests.length) {
    reqsToShow = friendRequests.map((friendReq) => (
      <FriendRequestCard
        user={friendReq}
        setFriendRequests={setFriendRequests}
        key={friendReq._id}
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
        {sortedContacts.length ? (
          sortedContacts.map((user) => (
            <FriendCard user={user} key={user._id} />
          ))
        ) : (
          <div className="no-friends-msg">
            No friends found. Start adding friends now!
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default MyFriends;
