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

  useEffect(() => {
    getMeFromLocalStorage();
  }, []);

  function getMeFromLocalStorage() {
    // log in automatically if user found in localstorage
    const localStorageMe = JSON.parse(localStorage.getItem("me"));
    if (localStorageMe) {
      dispatch(setUser(localStorageMe.user));
      dispatch(setToken(localStorageMe.token));
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
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  // return Home or LogIn page depending on whether me object is empty
  const index =
    Object.keys(me.user).length === 0 ? (
      <>
        <LogIn fetchContacts={fetchContacts} />
        <Footer />
      </>
    ) : (
      <>
        <NavBar />
        <Home />
      </>
    );

  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={index} />
        <Route
          path="/my-friends"
          element={
            <>
              <NavBar />
              <MyFriends />
            </>
          }
        />
        <Route
          path="/profile/:userId/*"
          element={
            <>
              <NavBar />
              <Profile />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
