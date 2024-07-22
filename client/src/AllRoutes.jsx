import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Pages/Home/Home";
import Auth from "./components/Pages/Auth/Auth";
import Questions from "./components/Pages/Questions/Questions";
import AskQuestion from "./components/Pages/AskQuestion/AskQuestion";
import DisplayQuestion from "./components/Pages/Questions/DisplayQuestion";
import Tags from "./components/Pages/Tags/Tags";
import Users from "./components/Pages/Users/Users";
import UserProfile from "./components/Pages/UserProfile/UserProfile";
import ForgotPassword, {
  VerifyOTP,
} from "./components/Pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/Pages/ForgotPassword/ResetPassword";
import { VerifyLangOTP } from "./components/LeftSidebar/LeftSidebar";

const AllRoutes = ({ slideIn, handleSlideIn }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      />
      <Route path="/Auth" element={<Auth />} />
      <Route path="/AskQuestion" element={<AskQuestion />} />
      <Route
        path="/Questions"
        element={<Questions slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      />
      <Route
        path="/Questions/:id"
        element={
          <DisplayQuestion slideIn={slideIn} handleSlideIn={handleSlideIn} />
        }
      />
      <Route
        path="/Tags"
        element={<Tags slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      />
      <Route
        path="/Users"
        element={<Users slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      />
      <Route
        path="/Users/:id"
        element={
          <UserProfile slideIn={slideIn} handleSlideIn={handleSlideIn} />
        }
      />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/verify-otp/:phone" element={<VerifyOTP />} />
      <Route
        path="/verify-language-otp/:language/:key"
        element={<VerifyLangOTP />}
      />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
  );
};

export default AllRoutes;
