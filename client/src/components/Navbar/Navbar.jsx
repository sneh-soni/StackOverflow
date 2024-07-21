import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "../../actions/currentUser";
import bars from "../../assets/bars-solid.svg";
import logo from "../../assets/logo.png";
import search from "../../assets/search-solid.svg";
import Avatar from "../../components/Avatar/Avatar";
import "./Navbar.css";
import { translations } from "../../utils/languages";

const Navbar = ({ handleSlideIn }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  var User = useSelector((state) => state.currentUserReducer);
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
  let darkerColor;
  switch (language) {
    case "hi":
      darkerColor = "#4c7a8e";
      break;
    case "zh":
      darkerColor = "#4c5e19";
      break;
    case "fr":
      darkerColor = "#b5a94b";
      break;
    default:
      darkerColor = "white";
      break;
  }

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    dispatch(setCurrentUser(null));
  };

  useEffect(() => {
    const token = User?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  }, [User?.token, dispatch]);

  return (
    <nav className="main-nav" style={{ backgroundColor: backgroudColor }}>
      <div className="navbar">
        <button className="slide-in-icon" onClick={() => handleSlideIn()}>
          <img src={bars} alt="bars" width="15" />
        </button>
        <div className="navbar-1">
          <Link to="/" className="nav-item nav-logo">
            <img src={logo} alt="logo" />
          </Link>
          <Link to="/" className="nav-item nav-btn res-nav">
            {translations[language].about}
          </Link>
          <Link to="/" className="nav-item nav-btn res-nav">
            {translations[language].products}
          </Link>
          <Link to="/" className="nav-item nav-btn res-nav">
            {translations[language].forTeams}
          </Link>
          <form>
            <input type="text" placeholder={translations[language].search} />
            <img src={search} alt="search" width="18" className="search-icon" />
          </form>
        </div>
        <div className="navbar-2">
          {User === null ? (
            <Link to="/Auth" className="nav-item nav-links">
              {translations[language].login}
            </Link>
          ) : (
            <>
              <Avatar
                backgroundColor={
                  darkerColor !== "white" ? darkerColor : "#009dff"
                }
                px="10px"
                py="7px"
                borderRadius="50%"
                color="white"
              >
                <Link
                  to={`/Users/${User?.result?._id}`}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  {User.result?.name?.charAt(0).toUpperCase() || ""}
                </Link>
              </Avatar>
              <button className="nav-item nav-links" onClick={handleLogout}>
                {translations[language].logout}
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
