import { useSelector } from "react-redux";
import "../styles/ContactsSidebar.css";
import Contact from "./Contact";

function ContactsSidebar() {
  const contacts = useSelector((state) => state.me.contacts);

  const sorted = [...contacts].sort((a, b) =>
    a.first_name > b.first_name ? 1 : -1
  );

  return (
    <div className="ContactsSidebar">
      <div className="title">Contacts</div>
      <div className="contacts">
        {sorted.map((user) => (
          <Contact user={user} />
        ))}
      </div>
    </div>
  );
}

export default ContactsSidebar;
