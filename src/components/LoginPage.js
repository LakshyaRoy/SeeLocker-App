import React from "react";
import { styled } from "styled-components";
import NavBar from "./NavBar";

const Container = styled.div`
  width: 40%;
  min-width: 320px;
  max-width: 475px;
  margin: 2.5% auto 0 auto;
  padding: 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
  background-color: #edbdab;
  border-radius: 10px;
  position: relative;
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
    color: white;
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
  return (
    <>
      <NavBar page="login" />
      <Container>
        <BoldText>Login to your account</BoldText>
        <SignUpForm>
          <input type="text" title="username" placeholder="username" />
          <input type="password" title="password" placeholder="password" />
          <button type="submit">Login</button>
        </SignUpForm>
      </Container>
    </>
  );
};

export default LoginPage;
