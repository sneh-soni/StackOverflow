import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./HomeMainbar.css";
import QuestionList from "./QuestionList";
import { translations } from "../../utils/languages";

const HomeMainbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.currentUserReducer);
  const language = useSelector((state) => state.languageReducer);
  const questionsList = useSelector((state) => state.questionsReducer);

  const checkAuth = () => {
    if (user === null) {
      alert("login or signup to ask a question");
      navigate("/Auth");
    } else {
      navigate("/AskQuestion");
    }
  };

  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {location.pathname === "/" ? (
          <h1>{translations[language].TopQ}</h1>
        ) : (
          <h1>{translations[language].AllQ}</h1>
        )}
        <button onClick={checkAuth} className={`ask-btn ${language}-btn`}>
          {translations[language].AskQ}
        </button>
      </div>
      <div>
        {questionsList.data === null ? (
          <h1>{translations[language].Loading}</h1>
        ) : (
          <>
            <p>
              {questionsList.data.length} {translations[language].questions}
            </p>
            <QuestionList questionsList={questionsList.data} />
          </>
        )}
      </div>
    </div>
  );
};

export default HomeMainbar;
