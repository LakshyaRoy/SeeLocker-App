// Login.js for login page

import React, { useState } from "react";
import { styled } from "styled-components";
import NavBar from "./NavBar";
import axios from "axios";
import Noty from "noty";
import "noty/lib/noty.css";
import "noty/lib/themes/semanticui.css";
import Footer from "./Footer";

const ContainerWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 177px);
  position: relative;
`;

const Container = styled.div`
  width: 40%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 320px;
  max-width: 475px;
  padding: 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
  background-color: #edbdab;
  border-radius: 10px;
`;
const BoldText = styled.h1`
  width: 100%;
  font-size: 1.35em;
  text-align: center;
  color: #1c1b17;

  text-transform: uppercase;
  padding: 0.75em 1em 0.75em 1.5em;
  box-shadow: inset 0px 1px 1px fadeout(white, 95%);
  margin: 0;
  font-weight: 200;
`;
const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 16px;
  gap: 16px;

  input {
    width: 100%;
    height: 40px;
    border-radius: 10px;
    border: none;
    outline: 2px solid #663405;
    padding-left: 10px;
    font-size: 20px;
    background-color: #edbdab;
    color: #663405;
    font-family: "Poppins", sans-serif;
    transition: all ease 0.3s;
    &:focus {
      background-color: white;
      color: black;
    }
  }

  button {
    width: 100%;
    height: 40px;
    border-radius: 10px;
    border: none;
    outline: none;
    font-size: 15px;
    background-color: #663405;
    color: white;
    font-family: "Poppins", sans-serif;
    transition: all ease 0.3s;
    &:hover {
      background-color: #edbdab;
      color: black;
      cursor: pointer;
      outline: 2px solid #663405;
    }
  }
`;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Noty js notification
  const successNoty = new Noty({
    text: "Login Successful!",
    type: "success",
    theme: "semanticui",
    timeout: 3000,
  });
  const errorNoty = new Noty({
    text: "Incorrect email or password!",
    type: "error",
    theme: "semanticui",
    timeout: 3000,
  });

  const handleLogin = async () => {
    try {
      // Send a POST request to the server with email and password
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/user/login`,
        {
          email,
          password,
        }
      );

      // If login is successful, the server will send back a token and userId in the response
      const token = response.data.token;
      const userId = response.data.userId;

      // Save the token in local storage or a cookie for future authenticated requests
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      // Redirect to the home page
      successNoty.show();
      window.location.href = "/dashboard";
    } catch (error) {
      // If login fails, show the error
      errorNoty.show();
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <NavBar page="login" />
      <ContainerWrapper>
        <Container>
          <BoldText>Login to your account</BoldText>
          <SignUpForm>
            <input
              type="email"
              value={email}
              placeholder="user@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              value={password}
              placeholder="user123"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={handleLogin}>
              Login
            </button>
          </SignUpForm>
        </Container>
      </ContainerWrapper>
      <Footer />
    </>
  );
};

export default LoginPage;
