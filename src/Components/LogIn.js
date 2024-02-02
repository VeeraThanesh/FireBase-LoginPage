import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth } from "./FireBase";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./LogIn.css";
import { HiOutlineMail } from "react-icons/hi";
import { LuEye, LuEyeOff } from "react-icons/lu";

function LogIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [invalid, setInvalid] = useState("");

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const forget = () => {
    alert("smartthanesh0@gmail.com : Mail for Your Password");
  };

  const onSubmit = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const createUser = userCredential.user;

      localStorage.setItem("token", createUser.accessToken);
      localStorage.setItem("user", JSON.stringify(createUser));
      navigate("/main", { state: createUser.displayName });
    } catch (error) {
      setInvalid(error.message);
    }
    reset();
  };
  return (
    <>
      <div className="login-container">
        <div className="login-content">
          <h3>Welcome Back</h3>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="login-form-input">
              <input
                {...register("email", {
                  required: "Email is required *",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email address *",
                  },
                })}
                placeholder="Your Email"
              />
              <i className="login-innerinput-icon">
                <HiOutlineMail />
              </i>
            </div>
            {errors.email && (
              <p className="login-errors-message">{errors.email.message}</p>
            )}
            {invalid && <p className="invalid-error-message">Invalid User *</p>}
            <div className="login-form-input">
              <input
                {...register("password", {
                  required: "Password is required *",
                  minLength: {
                    value: 8,
                    message: "Password must be atleast 8 characters *",
                  },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />
              <i
                onClick={handleTogglePassword}
                className="login-innerinput-icon"
              >
                {showPassword ? <LuEye /> : <LuEyeOff />}
              </i>
            </div>
            {errors.password && (
              <p className="login-errors-message">{errors.password.message}</p>
            )}

            <div className="checkbox">
              <input type="checkbox" name="checkbox" id="checkbox" />
            </div>
            <div className="checkmark">
              <label className="remember-forget">
                <span className="remember-me">Remember Me</span>
                <span className="forget-password" onClick={forget}>
                  Forget Password?
                </span>
              </label>
            </div>
            <input type="submit" value={"LogIn"} className="login-btn" />
            <div className="new-account">
              <p>
                Dont't have an account{" "}
                <span>
                  <Link to={"/SignUp"} className="to-signup">
                    SignUp
                  </Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LogIn;
