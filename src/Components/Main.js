import React from "react";
import "./Main.css";
import { useTypewriter } from "react-simple-typewriter";
import { signOut } from "firebase/auth";
import { auth } from "./FireBase";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import Avatar from "react-avatar";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaArrowDown,
} from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import Resume from "./Resume/Veera Thanesh Resume.pdf";

function Main() {
  const navigate = useNavigate();
  const [type] = useTypewriter({
    words: ["FrontEnd Developer", "Backend Developer", "Mern Stack Developer"],
    loop: {},
    typeSpeed: 100,
    deleteSpeed: 80,
  });

  const name = useLocation();

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <div className="container">
        <div className="content">
          <header className="header">
            <h3>Smart Thanesh</h3>
            <nav className="navbar">
              <h4>About</h4>
              <h4>Skills</h4>
              <h4>
                <a
                  href="https://veerathanesh.github.io/My-Portfolio/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Portfolio
                </a>
              </h4>
              <h4>Contact</h4>
              <div className="display-user">
                <Avatar
                  name={name.state}
                  className="round-img"
                  round={true}
                  size="25"
                  color="red"
                />
              </div>
            </nav>
          </header>

          <section className="main" id="main">
            <div className="main-container">
              <div className="main-content">
                <div className="main-content1">
                  <h3>Hello, It's Me</h3>
                  <h1>VEERA THANESH</h1>
                  <h3>
                    And I'm a <span className="multiple-text">{type}</span>
                    {/* <Cursor cursorStyle="|" /> */}
                  </h3>
                  <h4>
                    As a recent graduate skilled in front-end technologies like
                    HTML, CSS, and JavaScript, coupled with proficiency in
                    back-end frameworks such as Node.js and Express, I am poised
                    to embark on a career as a Full Stack (MERN) Developer. With
                    hands-on experience in database management (MongoDB) and a
                    keen interest in learning new technologies.
                  </h4>
                </div>

                <div className="social-media">
                  <a
                    href="https://github.com/VeeraThanesh"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i>
                      <FaGithub />
                    </i>
                  </a>
                  <a
                    href="https://linkedin.com/in/veerathanesh"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i>
                      <FaLinkedin />
                    </i>
                  </a>
                  <a
                    href="https://www.instagram.com/smart_thanesh/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i>
                      <FaInstagram />
                    </i>
                  </a>
                  <a
                    href="https://x.com/Mr___Vee?s=09"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i>
                      <FaTwitter />
                    </i>
                  </a>
                </div>

                <div className="cv-btn">
                  <a
                    href={Resume}
                    className="btn"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View CV{" "}
                    <i>
                      <FaArrowDown />
                    </i>
                  </a>
                  <div className="logout" onClick={logout}>
                    <button className="logout-btn">LogOut</button>
                    <p className="logout-icon">
                      <IoIosLogOut />
                    </p>
                  </div>
                </div>
              </div>
              <div className="main-img"></div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Main;
