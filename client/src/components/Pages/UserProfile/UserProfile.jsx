import { faBirthdayCake, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Avatar from "../../../components/Avatar/Avatar";
import LeftSidebar from "../../../components/LeftSidebar/LeftSidebar";
import EditProfileForm from "./EditProfileForm";
import ProfileBio from "./ProfileBio";
import "./UsersProfile.css";
import { translations } from "../../../utils/languages";

const UserProfile = ({ slideIn, handleSlideIn }) => {
  const { id } = useParams();
  const users = useSelector((state) => state.usersReducer);
  const currentProfile = users.filter((user) => user._id === id)[0];
  const currentUser = useSelector((state) => state.currentUserReducer);
  const language = useSelector((state) => state.languageReducer);
  const [Switch, setSwitch] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="home-container-1">
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} />
      <div className="home-container-2">
        <section>
          <div className="user-details-container">
            <div className="user-details">
              <Avatar
                backgroundColor="purple"
                color="white"
                fontSize="50px"
                px="40px"
                py="30px"
              >
                {currentProfile?.name.charAt(0).toUpperCase()}
              </Avatar>
              <div className="user-name">
                <h1>{currentProfile?.name}</h1>
                <p>
                  <FontAwesomeIcon icon={faBirthdayCake} />{" "}
                  {translations[language].joined}{" "}
                  {moment(currentProfile?.joinedOn).fromNow()}
                </p>
              </div>
            </div>
            {currentUser?.result._id === id && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setSwitch(true);
                    setShowHistory(false);
                  }}
                  className="edit-profile-btn"
                >
                  <FontAwesomeIcon icon={faPen} />{" "}
                  {translations[language].editProfile}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowHistory(!showHistory);
                    setSwitch(false);
                  }}
                  className="edit-profile-btn"
                >
                  {translations[language].loginHistory}
                </button>
              </>
            )}
          </div>
          <>
            {Switch ? (
              <EditProfileForm
                currentUser={currentUser}
                setSwitch={setSwitch}
              />
            ) : (
              <ProfileBio currentProfile={currentProfile} />
            )}
            {showHistory && (
              <div>
                <h2>{translations[language].loginHistory}</h2>
                <ul>
                  {currentUser?.result?.loginHistory.map((history) => {
                    return (
                      <div className="login-history">
                        <p style={{ margin: 0 }}>
                          Date and time:{" "}
                          <span className="login-span">
                            {history.time.slice(0, 10)}{" "}
                            {history.time.slice(11, 16)}
                          </span>
                        </p>
                        <p style={{ margin: 0 }}>
                          IP address:{" "}
                          <span className="login-span">{history.ip}</span>
                        </p>
                        <p style={{ margin: 0 }}>
                          Device:{" "}
                          <span className="login-span">{history.device}</span>
                        </p>
                        <p style={{ margin: 0 }}>
                          OS: <span className="login-span">{history.os}</span>
                        </p>
                        <p style={{ margin: 0 }}>
                          Browser:{" "}
                          <span className="login-span">{history.browser}</span>
                        </p>
                      </div>
                    );
                  })}
                </ul>
              </div>
            )}
          </>
        </section>
      </div>
    </div>
  );
};

export default UserProfile;
