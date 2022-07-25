import { Link, useParams } from "react-router-dom";
import "../styles/ProfilePosts.css";
import profilePic from "../images/profile-pic.jpeg";
import Feed from "./Feed";

function ProfilePosts() {
  const { userId } = useParams();

  function friendsSmallItem() {
    return (
      <div className="friend-item">
        <Link to="/profile/:userId">
          <img src={profilePic} alt="" className="pfp" />
        </Link>
        <Link to="/profile/:userId" className="full-name">
          Clarence Chan
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
          <div className="friend-count">41 friends</div>
        </div>
        <div className="grid">
          {[...Array(9)].map((e) => friendsSmallItem())}
        </div>
      </div>
      <div className="profile-feed">
        <Feed />
      </div>
    </div>
  );
}

export default ProfilePosts;
