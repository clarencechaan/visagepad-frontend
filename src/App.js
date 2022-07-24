import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./styles/App.css";
import ScrollToTop from "./components/ScrollToTop";
import LogIn from "./components/LogIn";
import Footer from "./components/Footer";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import MyFriends from "./components/MyFriends";
import Profile from "./components/Profile";
import { useState } from "react";

function App() {
  const [me, setMe] = useState({});

  // return Home or LogIn page depending on whether me object is empty
  const index =
    Object.keys(me).length === 0 ? (
      <>
        <LogIn />
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
      {/* <LogIn />
      <Footer /> */}
      {/* <NavBar /> */}
      {/* <Home /> */}
      {/* <MyFriends /> */}
      {/* <Profile /> */}
    </div>
  );
}

export default App;
