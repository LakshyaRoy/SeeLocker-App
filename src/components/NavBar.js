import React from "react";
import LockIcon from "../files/lock.png";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

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
`;
const NavBar = ({ page }) => {
  const Button = () => {
    if (page === "login") {
      return (
        <Link to={"/signup"}>
          <button>Sign Up</button>
        </Link>
      );
    } else if (page === "dashboard") {
      return <button>Log Out</button>;
    } else if (page === "signup") {
      return (
        <Link to={"/login"}>
          <button>Log In</button>
        </Link>
      );
    }
  };
  console.log(page);

  return (
    <Content>
      <img src={LockIcon} alt="LockIcon" />
      <blockquote>See Locker</blockquote>
      <div>{Button()}</div>
    </Content>
  );
};

export default NavBar;
