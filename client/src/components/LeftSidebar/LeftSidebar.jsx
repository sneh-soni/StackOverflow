import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { changeLanguage } from "../../actions/language";
import { sendEmailOTP, sendOTP, verifyLangOTP } from "../../api";
import Globe from "../../assets/Globe.svg";
import icon from "../../assets/icon.png";
import { Languages, translations } from "../../utils/languages";
import "./LeftSidebar.css";

export const VerifyLangOTP = () => {
  const { language, key } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [enteredOTP, setEnteredOTP] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await verifyLangOTP({ key, enteredOTP });
    if (data?.success === true) {
      dispatch(changeLanguage(language));
    } else {
      alert(data.message);
    }
    navigate("/");
  };

  return (
    <section className="form-section">
      <div className="form-container-2">
        <img src={icon} alt="stack overflow" className="login-logo" />
        <form onSubmit={handleSubmit}>
          <h3>Confirm 4-digit OTP sent to {key}</h3>
          <label htmlFor="otp">
            <input
              placeholder="XXXX"
              type="text"
              name="otp"
              id="otp"
              value={enteredOTP}
              onChange={(e) => {
                setEnteredOTP(e.target.value);
              }}
            />
          </label>
          <button type="submit" className="form-btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

const LeftSidebar = ({ slideIn, handleSlideIn }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.currentUserReducer);
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

  const handleChange = async (e) => {
    e.preventDefault();
    const selectedLanguage = e.target.value;
    if (!user) {
      alert("Please login to access this feature");
      return;
    }
    if (selectedLanguage === "en") {
      dispatch(changeLanguage("en"));
      navigate("/");
      return;
    }
    if (selectedLanguage === "fr") {
      const email = user.result.email;
      await sendEmailOTP({ email });
      alert("OTP sent to " + email + " (valid for 5 minutes)");
      navigate(`/verify-language-otp/${selectedLanguage}/${email}`);
    } else {
      const phone = user.result.phoneNumber;
      await sendOTP({ phone });
      alert("OTP sent to " + phone + " (valid for 5 minutes)");
      navigate(`/verify-language-otp/${selectedLanguage}/${phone}`);
    }
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
            onChange={handleChange}
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
