import "../styles/Contact.css";
import profilePic from "../images/profile-pic.jpeg";

function Contact() {
  return (
    <a href="" className="Contact">
      <img src={profilePic} alt="" className="pfp" />
      <div className="full-name">Clarence Chan</div>
    </a>
  );
}

export default Contact;
