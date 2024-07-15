import { useState } from "react";
import icon from "../../../assets/icon.png";
import "./ResetPassword.css";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../../api";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const navigate = useNavigate();
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPass) {
      setPassword("");
      setConfirmPass("");
      alert("new password and confirmed password must match");
      return;
    }
    await resetPassword(token, { password });
    alert("Password changed successfully");
    navigate("/Auth");
  };

  return (
    <section className="form-section">
      <div className="form-container-2">
        <img src={icon} alt="stack overflow" className="login-logo" />
        <form onSubmit={handleSubmit}>
          <h3>New Password</h3>
          <label htmlFor="email">
            <input
              type="text"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
          <h3>Confirm New Password</h3>
          <label htmlFor="email">
            <input
              type="password"
              name="confirmpassword"
              value={confirmPass}
              onChange={(e) => {
                setConfirmPass(e.target.value);
              }}
            />
          </label>
          <button type="submit" className="form-btn" onClick={handleSubmit}>
            Continue
          </button>
        </form>
      </div>
    </section>
  );
};
export default ResetPassword;
