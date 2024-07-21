export const changeLanguage = (language) => async (dispatch) => {
  try {
    dispatch({ type: "CHANGE_LANGUAGE", payload: language });
  } catch (error) {
    console.log(error);
  }
};
