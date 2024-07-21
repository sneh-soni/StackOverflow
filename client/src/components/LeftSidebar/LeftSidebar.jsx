import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { changeLanguage } from "../../actions/language";
import Globe from "../../assets/Globe.svg";
import { Languages, translations } from "../../utils/languages";
import "./LeftSidebar.css";

const LeftSidebar = ({ slideIn, handleSlideIn }) => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.languageReducer);

  let backgroudColor;

  switch (language) {
    case "hi":
      backgroudColor = "#6ca0b8";
      break;
    case "zh":
      backgroudColor = "#6b8e23";
      break;
    case "fr":
      backgroudColor = "#e0d66c";
      break;
    default:
      backgroudColor = "white";
      break;
  }

  const slideInStyle = {
    transform: "translateX(0%)",
  };

  const slideOutStyle = {
    transform: "translateX(-100%)",
  };

  return (
    <div
      className="left-sidebar"
      style={
        (slideIn ? slideInStyle : slideOutStyle,
        { backgroundColor: backgroudColor })
      }
    >
      <nav className="side-nav">
        <button onClick={() => handleSlideIn()} className="nav-btnn">
          <NavLink to="/" className="side-nav-links" activeclassname="active">
            <p>{translations[language].home}</p>
          </NavLink>
        </button>
        <div className="side-nav-div">
          <div>
            <p>{translations[language].public}</p>
          </div>
          <button onClick={() => handleSlideIn()} className="nav-btnn">
            <NavLink
              to="/Questions"
              className="side-nav-links"
              activeclassname="active"
            >
              <img src={Globe} alt="Globe" />
              <p style={{ paddingLeft: "10px" }}>
                {" "}
                {translations[language].questions}{" "}
              </p>
            </NavLink>
          </button>
          <button onClick={() => handleSlideIn()} className="nav-btnn">
            <NavLink
              to="/Tags"
              className="side-nav-links"
              activeclassname="active"
              style={{ paddingLeft: "40px" }}
            >
              <p>{translations[language].tags}</p>
            </NavLink>
          </button>
          <button onClick={() => handleSlideIn()} className="nav-btnn">
            <NavLink
              to="/Users"
              className="side-nav-links"
              activeclassname="active"
              style={{ paddingLeft: "40px" }}
            >
              <p>{translations[language].users}</p>
            </NavLink>
          </button>
          <select
            className="language-select"
            value={language}
            onChange={(e) => {
              dispatch(changeLanguage(e.target.value));
            }}
          >
            {Languages.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </nav>
    </div>
  );
};

export default LeftSidebar;
