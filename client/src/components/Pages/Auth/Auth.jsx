import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./Auth.css";
import icon from "../../../assets/icon.png";
import AboutAuth from "./AboutAuth";
import { signup, login } from "../../../actions/auth";
import { sendEmailOTP, verifyLangOTP } from "../../../api";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [OTPSent, setOTPSent] = useState(false);
  const [enteredOTP, setEnteredOTP] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function getSystemDetails() {
    const os = getOS();
    const browser = getBrowser();
    const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);
    const ip = await getIPAddress();

    return [
      {
        time: new Date().toISOString(),
        ip,
        os,
        browser,
        device: isMobile ? "mobile" : "desktop",
      },
    ];
  }

  function getOS() {
    const platform = navigator.platform;
    if (platform.indexOf("Win") > -1) return "Windows";
    if (platform.indexOf("Mac") > -1) return "MacOS";
    if (platform.indexOf("Linux") > -1) return "Linux";
    return "Unknown";
  }

  function getBrowser() {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf("Chrome") > -1) return "Google Chrome";
    if (userAgent.indexOf("Safari") > -1) return "Safari";
    if (userAgent.indexOf("Edge") > -1) return "MS Edge";
    if (userAgent.indexOf("Firefox") > -1) return "Mozilla Firefox";
    if (userAgent.indexOf("MSIE") > -1 || !!document.documentMode)
      return "MS IE";
    return "Unknown";
  }

  async function getIPAddress() {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip.toString();
    } catch (error) {
      return "Unknown";
    }
  }

  const handleSwitch = () => {
    setIsSignup(!isSignup);
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email && !password) {
      alert("Enter email and password");
    }
    const hour = new Date().getHours();
    if (loginDetails[0].device === "mobile" && hour >= 10 && hour <= 13) {
      return;
    }
    const loginDetails = await getSystemDetails();
    if (isSignup) {
      if (!name || !phone) {
        alert("All fields are mandatory");
      }
      if (!/^\+[1-9]\d{1,14}$/.test(phone) || phone.length !== 13) {
        alert("Invalid phone number");
        return;
      }
      if (OTPSent) {
        const { data } = await verifyLangOTP({
          key: email,
          enteredOTP,
        });
        if (data?.success === true) {
          dispatch(
            signup({ name, email, password, phone, loginDetails }, navigate)
          );
          navigate("/");
        } else {
          alert(data.message);
          navigate("/Auth");
        }
        return;
      }
      if (loginDetails[0].browser === "Google Chrome" && !OTPSent) {
        await sendEmailOTP({ email, isLogin: true });
        alert("OTP sent to " + email + " (valid for 5 minutes)");
        setShowOTP(true);
        setOTPSent(true);
      } else {
        setShowOTP(false);
        dispatch(
          signup({ name, email, password, phone, loginDetails }, navigate)
        );
      }
    } else {
      if (OTPSent) {
        const { data } = await verifyLangOTP({
          key: email,
          enteredOTP,
        });
        if (data?.success === true) {
          dispatch(login({ email, password, loginDetails }, navigate));
        } else {
          alert(data.message);
          navigate("/Auth");
        }
        return;
      }
      if (loginDetails[0].browser === "Google Chrome") {
        await sendEmailOTP({ email, isLogin: true });
        alert("OTP sent to " + email + " (valid for 5 minutes)");
        setShowOTP(true);
        setOTPSent(true);
      } else {
        setShowOTP(false);
        dispatch(login({ email, password, loginDetails }, navigate));
      }
    }
  };

  return (
    <section className="auth-section">
      {isSignup && <AboutAuth />}
      <div className="auth-container-2">
        <img src={icon} alt="stack overflow" className="login-logo" />
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <>
              <label htmlFor="name">
                <h4>Display Name</h4>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </label>
              <label htmlFor="phone">
                <h4>Phone number</h4>
                <input
                  type="text"
                  id="phone"
                  placeholder="+91XXXXXXXXXX"
                  name="phone"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </label>
            </>
          )}
          <label htmlFor="email">
            <h4>Email</h4>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <label htmlFor="password">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>Password</h4>
              {!isSignup && (
                <p
                  onClick={() => {
                    navigate("/forgotPassword");
                  }}
                  style={{
                    color: "#007ac6",
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  forgot password?
                </p>
              )}
            </div>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
          {showOTP && (
            <label htmlFor="otp">
              <input
                placeholder="XXXX"
                type="text"
                name="otp"
                id="otp"
                value={enteredOTP}
                onChange={(e) => {
                  setEnteredOTP(e.target.value);
                }}
              />
            </label>
          )}
          <button type="submit" className="auth-btn">
            {isSignup ? "Sign up" : "Log in"}
          </button>
        </form>
        <p>
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            type="button"
            className="handle-switch-btn"
            onClick={handleSwitch}
          >
            {isSignup ? "Log in" : "sign up"}
          </button>
        </p>
      </div>
    </section>
  );
};

export default Auth;
