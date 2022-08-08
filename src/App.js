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
  const [peopleYouMayKnow, setPeopleYouMayKnow] = useState([]);

  useEffect(() => {
    getMeFromLocalStorage();
  }, []);

  useEffect(() => {
    loadFbSdk();
  }, []);

  function loadFbSdk() {
    window.fbAsyncInit = async function () {
      window.FB.init({
        appId: "722419612179472",
        cookie: true,
        xfbml: true,
        version: "v14.0",
      });

      window.FB.getLoginStatus(function (response) {
        const loginStatus = response.status;
        console.log(loginStatus);
      });

      window.FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }

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

  async function fetchPeopleYouMayKnow(token) {
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/people-may-know`;
    const headers = {
      Authorization: "Bearer " + token,
    };
    try {
      const response = await fetch(url, { headers });
      const resObj = await response.json();
      if (Array.isArray(resObj)) {
        setPeopleYouMayKnow(resObj.slice(0, 14));
      }
    } catch (error) {
      console.log("error", error);
    }
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
              element={
                <Home
                  homeFeed={homeFeed}
                  setHomeFeed={setHomeFeed}
                  fetchPeopleYouMayKnow={fetchPeopleYouMayKnow}
                  peopleYouMayKnow={peopleYouMayKnow}
                />
              }
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
