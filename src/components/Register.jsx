import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import useLoading from "./useLoading";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [state, setstate] = useState(false);
  const [isLoading] = useLoading();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setstate(isLoading);
    await fetch("https://one-time-password-omega.vercel.app/send-otp", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === "Email with OTP sent!") {
          alert(`OTP sent to ${email}`);
          navigate("/activate");
        } else {
          alert(data);
        }
      })
      .catch((err) => alert(err.message))
      .finally(() => setstate(!isLoading));
  };

  return (
    <div className="register">
      <h1>Sign up</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          name="phone"
          placeholder="Enter your phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {state ? (
          <div className="divspin">
            <Spinner />
          </div>
        ) : (
          <>
            {" "}
            {(email && name && phone && password) !== "" ? (
              <button type="submit" id="regBtn">
                Sign Up
              </button>
            ) : (
              <button
                type="submit"
                id="regBtn"
                disabled
                style={{ cursor: "not-allowed" }}
              >
                disabled
              </button>
            )}
          </>
        )}
      </form>
    </div>
  );
}

export default Register;
