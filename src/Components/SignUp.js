import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { auth } from "./FireBase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { LuEye, LuEyeOff } from "react-icons/lu";
import "./SignUp.css";

function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [usedEmail, setUsedEmail] = useState("");

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    // navigate("LogIn");
    console.log(data);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const createUser = userCredential.user;

      await updateProfile(createUser, { displayName: data.userName });
      // console.log(userCredential);
      // console.log(createUser);

      localStorage.setItem("token", createUser.accessToken);
      localStorage.setItem("user", JSON.stringify(createUser));
      navigate("/");
    } catch (error) {
      setUsedEmail(error.message);
    }
    reset();
  };
  return (
    <>
      <div className="signup-container">
        <div className="signup-content">
          <h3>Create Account</h3>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="signup-form-input">
              <input
                {...register("userName", { required: "Name is required *" })}
                placeholder="Your Name"
              />
              <i className="signup-innerinput-icon">
                <FaRegCircleUser />
              </i>
            </div>
            {errors.userName && (
              <p className="signup-errors-message">{errors.userName.message}</p>
            )}
            <div className="signup-form-input">
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
              <i className="signup-innerinput-icon">
                <HiOutlineMail />
              </i>
            </div>
            {errors.email && (
              <p className="signup-errors-message">{errors.email.message}</p>
            )}
            {usedEmail && (
              <p className="used-email-error-message">Email Already Used*</p>
            )}
            <div className="signup-form-input">
              <input
                {...register("password", {
                  required: "Password is required *",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />
              <i
                onClick={handleTogglePassword}
                className="signup-innerinput-icon"
              >
                {showPassword ? <LuEye /> : <LuEyeOff />}
              </i>
            </div>
            {errors.password && (
              <p className="signup-errors-message">{errors.password.message}</p>
            )}
            <input type="submit" value={"SignUp"} className="signup-btn" />
            <div className="privacy-condition">
              <p className="read-agree">
                By signing up, I have read and agree to{" "}
              </p>
              <p className="terms-policy">
                <span>Terms</span> And <span>Privacy Policy</span>
              </p>
            </div>
            <div className="already-account">
              <p>
                Already have an account?{" "}
                <span>
                  <Link to={"/"} className="to-login">
                    LogIn
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

export default SignUp;
