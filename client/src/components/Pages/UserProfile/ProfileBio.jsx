import React from "react";
import { useSelector } from "react-redux";
import { translations } from "../../../utils/languages";

const ProfileBio = ({ currentProfile }) => {
  const language = useSelector((state) => state.languageReducer);
  return (
    <div>
      <div>
        {currentProfile?.tags.length !== 0 ? (
          <>
            <h4>Tags watched</h4>
            {currentProfile?.tags.map((tag) => (
              <p key={tag}>{tag}</p>
            ))}
          </>
        ) : (
          <p>{translations[language].noTags}</p>
        )}
      </div>
      <div>
        {currentProfile?.about ? (
          <>
            <h4>{translations[language].about}</h4>
            <p>{currentProfile?.about}</p>
          </>
        ) : (
          <p>{translations[language].noBio}</p>
        )}
      </div>
    </div>
  );
};

export default ProfileBio;
