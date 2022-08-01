import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setUser, setToken, setContacts } from "./slices/meSlice";
import "./styles/App.css";
import ScrollToTop from "./components/ScrollToTop";
import LogIn from "./components/LogIn";
import Footer from "./components/Footer";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import MyFriends from "./components/MyFriends";
import Profile from "./components/Profile";

function App() {
  const dispatch = useDispatch();
  const me = useSelector((state) => state.me);
  const [homeFeed, setHomeFeed] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    getMeFromLocalStorage();
  }, []);

  function getMeFromLocalStorage() {
    // log in automatically if user found in localstorage
    const localStorageMe = JSON.parse(localStorage.getItem("me"));
    if (localStorageMe) {
      dispatch(setUser(localStorageMe.user));
      dispatch(setToken(localStorageMe.token));
      dispatch(setContacts(localStorageMe.contacts));
      fetchContacts(localStorageMe.user._id, localStorageMe.token);
    }
  }

  async function fetchContacts(userId, token) {
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/users/${userId}/friends`;
    const headers = {
      Authorization: "Bearer " + token,
    };
    try {
      const response = await fetch(url, { headers });
      const resObj = await response.json();
      if (Array.isArray(resObj)) {
        dispatch(setContacts(resObj));
        saveContactsToLocalStorage(resObj);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  function saveContactsToLocalStorage(contacts) {
    const me = JSON.parse(localStorage.getItem("me"));
    localStorage.setItem("me", JSON.stringify({ ...me, contacts }));
  }

  return (
    <div className="App">
      <ScrollToTop />
      {me.token.length === 0 ? (
        <>
          <LogIn fetchContacts={fetchContacts} />
          <Footer />
        </>
      ) : (
        <>
          <NavBar
            setHomeFeed={setHomeFeed}
            setFriendRequests={setFriendRequests}
          />
          <Routes>
            <Route
              path="/"
              element={<Home homeFeed={homeFeed} setHomeFeed={setHomeFeed} />}
            />
            <Route
              path="/friends"
              element={
                <MyFriends
                  fetchContacts={fetchContacts}
                  friendRequests={friendRequests}
                  setFriendRequests={setFriendRequests}
                />
              }
            />
            <Route path="/profile/:userId/*" element={<Profile />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
