import { useSelector } from "react-redux";
import "../styles/ContactsSidebar.css";
import Contact from "./Contact";

function ContactsSidebar() {
  const me = useSelector((state) => state.me);

  const sorted = [...me.contacts].sort((a, b) =>
    a.first_name > b.first_name ? 1 : -1
  );

  return (
    <div className="ContactsSidebar">
      <div className="title">Contacts</div>
      <div className="contacts">
        {sorted.length ? (
          sorted.map((user) => <Contact user={user} key={user._id} />)
        ) : (
          <div className="no-contacts-msg">No contacts found</div>
        )}
      </div>
    </div>
  );
}

export default ContactsSidebar;
