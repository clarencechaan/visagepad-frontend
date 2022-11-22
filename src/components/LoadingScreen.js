import "../styles/LoadingScreen.css";
import DotsThrobber from "./DotsThrobber";

function LoadingScreen({ isLoading }) {
  return (
    <div className={"LoadingScreen" + (isLoading ? "" : " invisible")}>
      <DotsThrobber />
      <div className="message">
        Please be patient as the Render Web Service wakes up. This may initially
        take 15 to 30 seconds.
      </div>
    </div>
  );
}

export default LoadingScreen;
