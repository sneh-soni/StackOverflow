import dotenv from "dotenv";
dotenv.config();
// const { Translate } = require("@google-cloud/translate").v2;
import { Translate } from "@google-cloud/translate/build/src/v2/index.js";

const credentials = {
  type: "service_account",
  project_id: "stackoverflow-430109",
  private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
  private_key: process.env.GOOGLE_PRIVATE_KEY,
  client_email:
    "stack-overflow-clone@stackoverflow-430109.iam.gserviceaccount.com",
  client_id: "116033000126257219773",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/stack-overflow-clone%40stackoverflow-430109.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

const translate = new Translate({
  credentials: credentials,
});

export const translateText = async (text, targetLang) => {
  try {
    let [response] = await translate.translate(text, targetLang);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const detectLanguage = async (text) => {
  try {
    let [response] = await translate.detect(text);
    return response;
  } catch (error) {
    console.log(error);
  }
};
