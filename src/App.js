import "./styles/App.css";
import LogIn from "./components/LogIn";
import Footer from "./components/Footer";
import Home from "./components/Home";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      {/* <LogIn />
      <Footer /> */}
      <NavBar />
      <Home />
    </div>
  );
}

export default App;
