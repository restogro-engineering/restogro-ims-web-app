import "./index.scss";
import Header from "../core/header";

const MainContainer = ({ children }) => {
  return (
    <>
      <div className="main-container">
        <div className="main-right-container">
          <Header />
          <div className="content-div">
            <div>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainContainer;
