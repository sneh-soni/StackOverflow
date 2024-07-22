import axios from "axios";

// const API = axios.create({
//   baseURL: "https://stackoverflow-f7nw.onrender.com",
// });
const API = axios.create({
  baseURL: "http://localhost:5000",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});

export const logIn = (authData) => API.post("/user/login", authData);
export const signUp = (authData) => API.post("/user/signup", authData);

export const sendEmail = (Data) => API.post("/user/send-email", Data);
export const sendEmailOTP = (Data) => API.post("/user/send-email-otp", Data);
export const sendOTP = (Data) => API.post("/user/send-otp", Data);
export const verifyOTP = (Data) => API.post("/user/verify-otp", Data);
export const verifyLangOTP = (Data) =>
  API.post("/user/verify-language-otp", Data);
export const resetPassword = (token, Data) =>
  API.post(`/user/reset-password/${token}`, Data);

export const getAllUsers = () => API.get("/user/getAllUsers");
export const updateProfile = (id, updateData) =>
  API.patch(`/user/update/${id}`, updateData);

export const postQuestion = (questionData) =>
  API.post("/questions/Ask", questionData);
export const getAllQuestions = (language) =>
  API.get(`/questions/get/${language}`);
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`);
export const voteQuestion = (id, value) =>
  API.patch(`/questions/vote/${id}`, { value });

export const postAnswer = (id, noOfAnswers, answerBody, userAnswered) =>
  API.patch(`/answer/post/${id}`, { noOfAnswers, answerBody, userAnswered });
export const deleteAnswer = (id, answerId, noOfAnswers) =>
  API.patch(`/answer/delete/${id}`, { answerId, noOfAnswers });
