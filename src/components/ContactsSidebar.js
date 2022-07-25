import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "../styles/ContactsSidebar.css";
import Contact from "./Contact";

function ContactsSidebar() {
  const me = useSelector((state) => state.me);
  const [contactList, setContactList] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/users/${me.user._id}/friends`;
    const headers = {
      Authorization: `Bearer ${me.token}`,
    };
    try {
      const response = await fetch(url, { headers });
      const resObj = await response.json();
      if (Array.isArray(resObj)) {
        const sorted = resObj.sort((a, b) =>
          a.first_name > b.first_name ? 1 : -1
        );
        setContactList(sorted);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div className="ContactsSidebar">
      <div className="title">Contacts</div>
      <div className="contacts">
        {contactList.map((user) => (
          <Contact user={user} />
        ))}
      </div>
    </div>
  );
}

export default ContactsSidebar;
