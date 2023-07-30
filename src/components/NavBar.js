import React from "react";
import LockIcon from "../files/lock.png";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import Noty from "noty";
import "noty/lib/noty.css";
import "noty/lib/themes/semanticui.css";

const Content = styled.figure`
  display: flex;
  justify-content: space-between;
  background-color: #663405;
  text-transform: uppercase;
  align-items: center;
  position: relative;
  color: #edbdab;
  padding: 10px;
  img {
    width: 65px;
    height: auto;
  }
  blockquote {
    position: absolute;
    top: 16px;
    left: 68px;
    color: #edbdab;
    font-weight: 200;
    text-align: left;
  }

  button {
    font-size: 18px;
    background-color: #f5963d;
    color: #1c1b17;
    border: none;
    padding: 10px 50px;
    border-radius: 30px;
    cursor: pointer;
    transition: 0.3s ease all;
    &:hover {
      background-color: #edbdab;
    }
  }
  Link {
    text-decoration: none;
  }
`;

const NavBar = ({ page }) => {
  // Noty js notification
  const successNoty = new Noty({
    text: "Logout Successful!",
    type: "success",
    theme: "semanticui",
    timeout: 3000,
  });
  const errorNoty = new Noty({
    text: "Error, Try again!",
    type: "error",
    theme: "semanticui",
    timeout: 3000,
  });
  
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      // Send a POST request to the server to logout the user
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/user/logout`,
        {},
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      // After successful logout, remove the token from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("userId");

      // Redirect the user to the login page
      successNoty.show();
      window.location.href = "/";
    } catch (error) {
      // If logout fails, show the error here
      errorNoty.show();
      console.error("Logout failed:", error);
    }
  };

  const Button = () => {
    if (page === "login") {
      return (
        <Link to={"/signup"}>
          <button>Sign Up</button>
        </Link>
      );
    } else if (page === "dashboard") {
      return (
        <button type="button" onClick={handleLogout}>
          Logout!
        </button>
      );
    } else if (page === "signup") {
      return (
        <Link to={"/login"}>
          <button>Log In</button>
        </Link>
      );
    }
  };

  return (
    <Content>
      {page === "dashboard" ? (
        <Link to="/dashboard">
          <img src={LockIcon} alt="LockIcon" />
          <blockquote>See Locker</blockquote>
        </Link>
      ) : (
        <Link to="/">
          <img src={LockIcon} alt="LockIcon" />
          <blockquote>See Locker</blockquote>
        </Link>
      )}

      <div>{Button()}</div>
    </Content>
  );
};

export default NavBar;
