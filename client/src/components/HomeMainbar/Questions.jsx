import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { translations } from "../../utils/languages";
import { useSelector } from "react-redux";

const Questions = ({ question }) => {
  const language = useSelector((state) => state.languageReducer);

  return (
    <div className="display-question-container">
      <div className="display-votes-ans">
        <p>{question.upVote.length - question.downVote.length}</p>
        <p>{translations[language].votes}</p>
      </div>
      <div className="display-votes-ans">
        <p>{question.noOfAnswers}</p>
        <p>{translations[language].answers}</p>
      </div>
      <div className="display-question-details">
        <Link
          to={`/Questions/${question._id}`}
          className={`question-title-link ${language}-link`}
        >
          {question.questionTitle.length > (window.innerWidth <= 400 ? 70 : 90)
            ? question.questionTitle.substring(
                0,
                window.innerWidth <= 400 ? 70 : 90
              ) + "..."
            : question.questionTitle}
        </Link>
        <div className="display-tags-time">
          <div className="display-tags">
            {question.questionTags.map((tag) => (
              <p key={tag}>{tag}</p>
            ))}
          </div>
          <p className="display-time">
            {translations[language].asked} {moment(question.askedOn).fromNow()}{" "}
            {question.userPosted}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Questions;
