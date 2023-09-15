import "../styles/LoadingScreen.css";
import DotsThrobber from "./DotsThrobber";

function LoadingScreen({ isLoading }) {
  return (
    <div className={"LoadingScreen" + (isLoading ? "" : " invisible")}>
      <DotsThrobber />
      <div className="message">Loading</div>
    </div>
  );
}

export default LoadingScreen;
