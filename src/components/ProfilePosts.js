import { Link, useParams } from "react-router-dom";
import "../styles/ProfilePosts.css";
import blankUser from "../images/blank-user.png";
import Feed from "./Feed";
import { media } from "../scripts/scripts";
import { useSelector } from "react-redux";

function ProfilePosts({ feed, friends }) {
  const me = useSelector((state) => state.me);
  const { userId } = useParams();

  function friendsSmallItem(user) {
    return (
      <div className="friend-item" key={user._id}>
        <Link to={`/profile/${user._id}`}>
          {media(user.pfp || blankUser, "pfp")}
        </Link>
        <Link to={`/profile/${user._id}`} className="full-name">
          {`${user.first_name} ${user.last_name}`}
        </Link>
      </div>
    );
  }

  return (
    <div className="ProfilePosts">
      <div className="friends-small ">
        <div className="top-bar">
          <div className="upper">
            <Link to={`/profile/${userId}/friends`} className="title">
              Friends
            </Link>
            <Link
              to={`/profile/${userId}/friends`}
              className="all-friends-link"
            >
              See all friends
            </Link>
          </div>
          <div className="friend-count">
            {friends.length !== 0 &&
              (friends.length === 1 ? "1 friend" : friends.length + " friends")}
          </div>
        </div>
        <div className="grid">
          {friends.slice(0, 9).map((user) => friendsSmallItem(user))}
        </div>
      </div>
      <div className="profile-feed">
        <Feed feed={feed} newPostBtnHidden={userId !== me.user._id} />
      </div>
    </div>
  );
}

export default ProfilePosts;
