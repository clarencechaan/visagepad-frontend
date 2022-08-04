import { Link } from "react-router-dom";
import "../styles/UserListItem.css";
import blankUser from "../images/blank-user.png";
import { media } from "../scripts/scripts";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import RelationshipBtn from "./RelationshipBtn";

function UserListItem({ user, setUserListShown }) {
  const me = useSelector((state) => state.me);
  const [relationship, setRelationship] = useState("");

  function handleLinkClicked() {
    // hide user list
    setUserListShown(false);
  }

  useEffect(() => {
    fetchRelationship();
  }, []);

  async function fetchRelationship() {
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/users/${user._id}/relationship`;
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

  return (
    <div className="UserListItem">
      <Link to={`/profile/${user._id}`} onClick={handleLinkClicked}>
        {media(user.pfp || blankUser, "pfp")}
      </Link>
      <Link
        to={`/profile/${user._id}`}
        className="full-name"
        onClick={handleLinkClicked}
      >
        {`${user.first_name} ${user.last_name}`}
      </Link>
      {<RelationshipBtn relationship={relationship} />}
    </div>
  );
}

export default UserListItem;
