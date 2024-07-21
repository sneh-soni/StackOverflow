import React from "react";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "../../../components/Avatar/Avatar";
import { deleteAnswer } from "../../../actions/question";
import { translations } from "../../../utils/languages";

const DisplayAnswer = ({ question, handleShare }) => {
  const User = useSelector((state) => state.currentUserReducer);
  const language = useSelector((state) => state.languageReducer);
  const { id } = useParams();
  const dispatch = useDispatch();
  const handleDelete = (answerId, noOfAnswers) => {
    dispatch(deleteAnswer(id, answerId, noOfAnswers - 1));
  };

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
  return (
    <div>
      {question.answer.map((ans) => (
        <div className="display-ans" key={ans._id}>
          <p>{ans.answerBody}</p>
          <div className="question-actions-user">
            <div>
              <button type="button" onClick={handleShare}>
                {translations[language].share}
              </button>
              {User?.result?._id === ans?.userId && (
                <button
                  type="button"
                  onClick={() => handleDelete(ans._id, question.noOfAnswers)}
                >
                  {translations[language].delete}
                </button>
              )}
            </div>
            <div>
              <p>
                {translations[language].answered}{" "}
                {moment(ans.answeredOn).fromNow()}
              </p>
              <Link
                to={`/Users/${ans.userId}`}
                className="user-link"
                style={{
                  color: backgroudColor !== "white" ? backgroudColor : "black",
                }}
              >
                <Avatar
                  backgroundColor={
                    backgroudColor !== "white" ? backgroudColor : "#ffa94d"
                  }
                  px="8px"
                  py="5px"
                  borderRadius="4px"
                >
                  {ans.userAnswered.charAt(0).toUpperCase()}
                </Avatar>
                <div>{ans.userAnswered}</div>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayAnswer;
