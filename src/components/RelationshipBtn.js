import "../styles/RelationshipBtn.css";
import { Check, UserMinus, UserPlus } from "phosphor-react";

function RelationshipBtn({ relationship, unfriendBtn }) {
  async function allowFriendship() {}

  async function disallowFriendship() {}

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
        <button className="unfriend-btn">
          <UserMinus weight="fill" className="icon" />
          Unfriend
        </button>
      );
    }
  } else if (relationship === "Requesting") {
    button1 = (
      <button className="accept-request-btn">
        <UserPlus weight="fill" className="icon" />
        Accept Request
      </button>
    );
  } else if (relationship === "Requestee") {
    button1 = (
      <button className="cancel-request-btn">
        <UserMinus weight="fill" className="icon" />
        Cancel Request
      </button>
    );
  } else if (relationship === "None") {
    button1 = (
      <button className="add-friend-btn">
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
