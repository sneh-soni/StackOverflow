import React from "react";
import "./RightSidebar.css";
import comment from "../../assets/comment-alt-solid.svg";
import pen from "../../assets/pen-solid.svg";
import blackLogo from "../../assets/blacklogo.svg";
import { useSelector } from "react-redux";
import { translations } from "../../utils/languages";

const Widget = () => {
  const language = useSelector((state) => state.languageReducer);
  return (
    <div className="widget">
      <h4>The Overflow Blog</h4>
      <div className="right-sidebar-div-1">
        <div className="right-sidebar-div-2">
          <img src={pen} alt="pen" width="18" />
          <p>{translations[language].Observability}</p>
        </div>
        <div className="right-sidebar-div-2">
          <img src={pen} alt="pen" width="18" />
          <p>{translations[language].Podcast}</p>
        </div>
      </div>
      <h4>Featured on Meta</h4>
      <div className="right-sidebar-div-1">
        <div className="right-sidebar-div-2">
          <img src={comment} alt="pen" width="18" />
          <p>{translations[language].Review}</p>
        </div>
        <div className="right-sidebar-div-2">
          <img src={comment} alt="pen" width="18" />
          <p>{translations[language].Associates}</p>
        </div>
        <div className="right-sidebar-div-2">
          <img src={blackLogo} alt="pen" width="18" />
          <p>{translations[language].Outdated}</p>
        </div>
      </div>
      <h4>Hot Meta Posts</h4>
      <div className="right-sidebar-div-1">
        <div className="right-sidebar-div-2">
          <p>38</p>
          <p>{translations[language].Spam}</p>
        </div>
        <div className="right-sidebar-div-2">
          <p>20</p>
          <p>{translations[language].Action}</p>
        </div>
        <div className="right-sidebar-div-2">
          <p>14</p>
          <p>{translations[language].Link}</p>
        </div>
      </div>
    </div>
  );
};

export default Widget;
