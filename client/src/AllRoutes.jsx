import React from "react";
import { Route, Routes } from "react-router-dom";
import { VerifyLangOTP } from "./components/LeftSidebar/LeftSidebar";
import AskQuestion from "./components/Pages/AskQuestion/AskQuestion";
import Auth from "./components/Pages/Auth/Auth";
import ForgotPassword, {
  VerifyOTP,
} from "./components/Pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/Pages/ForgotPassword/ResetPassword";
import Home from "./components/Pages/Home/Home";
import DisplayQuestion from "./components/Pages/Questions/DisplayQuestion";
import Questions from "./components/Pages/Questions/Questions";
import Tags from "./components/Pages/Tags/Tags";
import UserProfile from "./components/Pages/UserProfile/UserProfile";
import Users from "./components/Pages/Users/Users";

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
