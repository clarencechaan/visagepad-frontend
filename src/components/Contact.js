import { Link } from "react-router-dom";
import "../styles/Contact.css";
import profilePic from "../images/profile-pic.jpeg";

function Contact() {
  return (
    <Link to="/profile/:userId" className="Contact">
      <img src={profilePic} alt="" className="pfp" />
      <div className="full-name">Clarence Chan</div>
    </Link>
  );
}

export default Contact;
