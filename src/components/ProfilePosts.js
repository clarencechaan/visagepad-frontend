import "../styles/ProfilePosts.css";
import profilePic from "../images/profile-pic.jpeg";
import Feed from "./Feed";

function ProfilePosts() {
  function friendsSmallItem() {
    return (
      <div className="friend-item">
        <a href="">
          <img src={profilePic} alt="" className="pfp" />
        </a>
        <a href="" className="full-name">
          Clarence Chan
        </a>
      </div>
    );
  }

  return (
    <div className="ProfilePosts">
      <div className="friends-small ">
        <div className="top-bar">
          <div className="upper">
            <a href="" className="title">
              Friends
            </a>
            <a href="" className="all-friends-link">
              See all friends
            </a>
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
