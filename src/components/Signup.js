import React from "react";
import { styled } from "styled-components";
import NavBar from "./NavBar";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  width: 100%;
  padding: 20px;
  gap: 20px;
  background-color: #1c1b17;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
  position: relative;
  overflow: hidden;
  grid-template-areas: "header" "main";

  @media screen and (max-width: 1021px) {
    grid-template-columns: 1fr;
  }
`;
const Image = styled.div`
  grid-area: header;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 575px;
    height: auto;
    object-fit: cover;
    filter: brightness(70%);
    transition: all ease-in-out 1s;
    &:hover {
      filter: brightness(100%);
      cursor: pointer;
    }
  }
  @media screen and (max-width: 1021px) {
    display: none;
  }
`;

const TagLine = styled.h1`
  align-items: center;
  color: #000;
  font-size: 1.35em;
  text-align: center;
  text-transform: uppercase;
  padding: 0.75em 1em 0.75em 1.5em;
  box-shadow: inset 0px 1px 1px fadeout(white, 95%);
  margin: 0;
  font-weight: 200;
`;

const SignUpForm = styled.form`
  grid-area: main;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  gap: 16px;
  background-color: #a9a3a0;
  border-radius: 10px;

  input {
    width: 320px;
    height: 40px;
    border-radius: 10px;
    border: none;
    outline: 2px solid #663405;
    padding-left: 10px;
    font-size: 20px;
    background-color: #edbdab;
    color: black;
    font-family: "Poppins", sans-serif;
    transition: all ease 0.3s;
    &:focus {
      background-color: white;
      color: black;
      box-shadow: inset -8px -7px 9px rgba(0, 0, 0, 0.25);
      cursor: pointer;
      ::placeholder {
        color: black;
      }
    }
  }

  label {
    width: 100%;
    font-size: 1.35em;
    color: #1c1b17;
  }

  button {
    height: 40px;
    width: 40%;
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
      box-shadow: inset -8px -7px 9px rgba(0, 0, 0, 0.25);
      outline: 2px solid #663405;
    }
  }
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Signup = () => {
  return (
    <>
      <NavBar page="signup" />
      <Container>
        <Image>
          <img
            src="https://img.freepik.com/premium-vector/young-woman-enjoy-sitting-reading-book-hygge-concept-vector-illustration_194708-2078.jpg"
            alt="girl-reading-a-book"
          />
        </Image>
        <div>
          <SignUpForm>
            <TagLine>Save your next Password Here!</TagLine>
            <InputWrapper>
              <label for="email">Email</label>
              <input type="email" placeholder="Enter your email" />
            </InputWrapper>
            <InputWrapper>
              <label for="password">Password</label>
              <input type="password" placeholder="Create a password" />
            </InputWrapper>
            <button type="submit">Create account</button>
          </SignUpForm>
        </div>
      </Container>
    </>
  );
};

export default Signup;
