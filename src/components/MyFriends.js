import "../styles/MyFriends.css";
import FriendRequestCard from "./FriendRequestCard";
import FriendCard from "./FriendCard";

function MyFriends() {
  return (
    <div className="MyFriends">
      <div className="friend-requests">
        <div className="title">Friend Requests</div>
        <div className="friend-request-cards">
          <FriendRequestCard />
          <FriendRequestCard />
          <FriendRequestCard />
          <FriendRequestCard />
          <FriendRequestCard />
          <FriendRequestCard />
        </div>
      </div>
      <div className="divider"></div>
      <div className="friends">
        <div className="title">Friends</div>
        <div className="friend-cards">
          <FriendCard />
          <FriendCard />
          <FriendCard />
          <FriendCard />
          <FriendCard />
          <FriendCard />
        </div>
      </div>
    </div>
  );
}

export default MyFriends;
