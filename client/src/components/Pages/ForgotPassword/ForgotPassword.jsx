import "./ForgotPassword.css";
import icon from "../../../assets/icon.png";
import { sendEmail } from "../../../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendEmail({ email });
    alert("Password reset link sent to " + email + " (valid for 1 hour)");
    navigate("/Auth");
  };

  return (
    <section className="form-section">
      <div className="form-container-2">
        <img src={icon} alt="stack overflow" className="login-logo" />
        <form onSubmit={handleSubmit}>
          <h3>Confirm your email</h3>
          <label htmlFor="email">
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
          <button type="submit" className="form-btn" onClick={handleSubmit}>
            Confirm
          </button>
        </form>
      </div>
    </section>
  );
};
export default ForgotPassword;
