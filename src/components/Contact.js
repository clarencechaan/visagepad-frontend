import { Link } from "react-router-dom";
import "../styles/Contact.css";
import blankUser from "../images/blank-user.png";
import { media } from "../scripts/scripts";

function Contact({ user }) {
  return (
    <Link to={`/profile/${user._id}`} className="Contact">
      {media(user.pfp || blankUser, "pfp")}
      <div className="full-name">{`${user.first_name} ${user.last_name}`}</div>
    </Link>
  );
}

export default Contact;
