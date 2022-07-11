import "./styles/App.css";
import LogIn from "./components/LogIn";
import Footer from "./components/Footer";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import MyFriends from "./components/MyFriends";

function App() {
  return (
    <div className="App">
      {/* <LogIn />
      <Footer /> */}

      <NavBar />
      {/* <Home /> */}
      <MyFriends />
    </div>
  );
}

export default App;
