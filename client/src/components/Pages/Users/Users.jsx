import React from "react";
import "./Users.css";
import LeftSidebar from "../../../components/LeftSidebar/LeftSidebar";
import UsersList from "./UsersList";
import { useSelector } from "react-redux";
import { translations } from "../../../utils/languages";

const Users = ({ slideIn, handleSlideIn }) => {
  const language = useSelector((state) => state.languageReducer);
  return (
    <div className="home-container-1">
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} />
      <div className="home-container-2" style={{ marginTop: "30px" }}>
        <h1 style={{ fontWeight: "400" }}>{translations[language].users}</h1>
        <UsersList />
      </div>
    </div>
  );
};

export default Users;
