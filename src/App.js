import "./styles/App.css";
import LogIn from "./components/LogIn";
import Footer from "./components/Footer";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import MyFriends from "./components/MyFriends";
import Profile from "./components/Profile";

function App() {
  return (
    <div className="App">
      {/* <LogIn /> */}
      {/* <Footer /> */}

      <NavBar />
      {/* <Home /> */}
      {/* <MyFriends /> */}
      <Profile />
    </div>
  );
}

export default App;
