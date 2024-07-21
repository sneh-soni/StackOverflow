import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AllRoutes from "./AllRoutes";
import { fetchAllQuestions } from "./actions/question";
import { fetchAllUsers } from "./actions/users";

function App() {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.languageReducer);

  let backgroudColor;

  switch (language) {
    case "hi":
      backgroudColor = "lightblue";
      break;
    case "zh":
      backgroudColor = "lightgreen";
      break;
    case "fr":
      backgroudColor = "lightyellow";
      break;
    default:
      backgroudColor = "white";
      break;
  }

  useEffect(() => {
    dispatch(fetchAllQuestions(language));
    dispatch(fetchAllUsers());
  }, [dispatch, language]);

  const [slideIn, setSlideIn] = useState(true);

  useEffect(() => {
    if (window.innerWidth <= 760) {
      setSlideIn(false);
    }
  }, []);

  const handleSlideIn = () => {
    if (window.innerWidth <= 760) {
      setSlideIn((state) => !state);
    }
  };

  return (
    <div className="App" style={{ backgroundColor: backgroudColor }}>
      <Router>
        <Navbar handleSlideIn={handleSlideIn} />
        <AllRoutes slideIn={slideIn} handleSlideIn={handleSlideIn} />
      </Router>
    </div>
  );
}

export default App;
