import "./ForgotPassword.css";
import icon from "../../../assets/icon.png";
import { sendEmail, sendOTP, verifyOTP } from "../../../api";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const VerifyOTP = () => {
  const { phone } = useParams();
  const navigate = useNavigate();
  const [enteredOTP, setEnteredOTP] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await verifyOTP({ phone, enteredOTP });
    if (data?.token) {
      navigate(`/reset-password/${data.token}`);
    } else {
      alert(data.message);
    }
  };

  return (
    <section className="form-section">
      <div className="form-container-2">
        <img src={icon} alt="stack overflow" className="login-logo" />
        <form onSubmit={handleSubmit}>
          <h3>Confirm 4-digit OTP sent to {phone}</h3>
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
          <button type="submit" className="form-btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [toggle, setToggle] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!toggle) {
      await sendEmail({ email });
      alert(
        "Password reset link sent to " +
          email +
          " (valid for 1 hour). Follow the link to reset password."
      );
      navigate("/Auth");
    } else {
      if (!/^\+[1-9]\d{1,14}$/.test(phone) || phone.length !== 13) {
        alert("Invalid format for phone number");
        return;
      }
      await sendOTP({ phone });
      alert("OTP sent to " + phone + " (valid for 5 minutes)");
      navigate(`/verify-otp/${phone}`);
    }
  };

  return (
    <section className="form-section">
      <div className="form-container-2">
        <img src={icon} alt="stack overflow" className="login-logo" />
        <form onSubmit={handleSubmit}>
          {!toggle ? (
            <>
              <h3>Verify your email</h3>
              <label htmlFor="email">
                <input
                  placeholder="my.email@address.com"
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </label>
            </>
          ) : (
            <>
              <h3>Verify your phone number</h3>
              <label htmlFor="phone">
                <input
                  placeholder="+91XXXXXXXXXX"
                  type="tel"
                  name="phone"
                  pattern="[0-9]{10}"
                  id="phone"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </label>
            </>
          )}
          <div style={{ textAlign: "center" }}>or</div>
          {!toggle ? (
            <p className="toggle-btn" onClick={() => setToggle(true)}>
              Continue with Phone number
            </p>
          ) : (
            <p className="toggle-btn" onClick={() => setToggle(false)}>
              Continue with Email
            </p>
          )}
          <button type="submit" className="form-btn" onClick={handleSubmit}>
            Confirm
          </button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
