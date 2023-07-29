import React, { useRef, useState } from "react";
import NavBar from "./NavBar";
import { styled } from "styled-components";
import { EyeFilled, EyeInvisibleFilled, DeleteFilled } from "@ant-design/icons";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Bubble = styled.div`
  background: rgb(102, 52, 5);
  width: 400px;
  height: 400px;
  margin: 40px;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  position: relative;
  background: rgb(102, 52, 5);
  background: -moz-linear-gradient(
    283deg,
    rgba(102, 52, 5, 1) 15%,
    rgba(245, 150, 61, 1) 100%
  );
  background: -webkit-linear-gradient(
    283deg,
    rgba(102, 52, 5, 1) 15%,
    rgba(245, 150, 61, 1) 100%
  );
  background: linear-gradient(
    283deg,
    rgba(102, 52, 5, 1) 15%,
    rgba(245, 150, 61, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#663405",endColorstr="#f5963d",GradientType=1);
`;

const PasswordForm = styled.form`
  position: absolute;
  z-index: 3;
  top: 27%;
  left: 10%;
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Poppins", sans-serif;
  font-size: 13px;

  input {
    width: 300px;
    height: 40px;
    border-radius: 10px;
    border: none;
    outline: none;
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
    width: 140px;
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
    }
  }

  p {
    cursor: pointer;
  }
`;

const PasswordFields = styled.div``;
const InnerPasswordFields = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #edbdab;
  padding: 10px;
  border-radius: 10px;
  gap: 10px;
  margin-top: 20px;
  span {
    color: #663405;
    font-size: 20px;
    font-family: "Poppins", sans-serif;
    cursor: pointer;
  }
  input {
    background: rgba(255, 255, 255, 0.4);
    color: #663405;
    font-family: "Poppins", sans-serif;
    font-size: 20px;
    border: none;
    outline: none;
    border-radius: 10px;
    padding: 10px;
    width: 300px;
    height: 40px;
    transition: all ease 0.3s;
    &:focus {
      background-color: white;
      color: black;
      cursor: pointer;
    }
  }
  button {
    background-color: #663405;
    color: white;
    font-family: "Poppins", sans-serif;
    font-size: 20px;
    border: none;
    outline: none;
    border-radius: 10px;
    padding: 10px;
    width: 140px;
    height: 40px;
    transition: all ease 0.3s;
    &:hover {
      background-color: rgba(255, 255, 255, 0.4);
      color: black;
      cursor: pointer;
    }
  }
`;

const DashBoard = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const inputRef = useRef();
  const inputReff = useRef();
  const [show, setShow] = useState(false);

  const handleView = () => {
    if (
      inputRef.current.type === "password" ||
      inputReff.current.type === "password"
    ) {
      inputRef.current.type = "text";
      inputReff.current.type = "text";
      setShow(true);
    } else {
      inputRef.current.type = "password";
      inputReff.current.type = "password";
      setShow(false);
    }
  };

  return (
    <div>
      <NavBar page="dashboard" />
      <Container>
        <Bubble>
          <PasswordForm>
            <input
              type="name"
              value={name}
              placeholder="Enter Password Name "
              autoComplete="on"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="password"
              value={password}
              placeholder="Password"
              autoComplete="on"
              onChange={(e) => setPassword(e.target.value)}
            />
            <p>Click here! To Generate Random Password </p>

            <button>Save Password</button>
          </PasswordForm>
        </Bubble>
        <PasswordFields>
          <InnerPasswordFields>
            <span>Instagram</span>
            <input
              type="password"
              autoComplete="on"
              placeholder="Password"
              readOnly
              value="lakshya"
              ref={inputRef}
            />
            <span onClick={handleView}>
              {show ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <DeleteFilled />
            {/* <button>Delete</button> */}
          </InnerPasswordFields>
          <InnerPasswordFields>
            <span>Linkedin</span>
            <input
              type="password"
              autoComplete="on"
              placeholder="Password"
              readOnly
              value="lakshya"
              ref={inputReff}
            />
            <span onClick={handleView}>
              {show ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <DeleteFilled />
            {/* <button>Delete</button> */}
          </InnerPasswordFields>
        </PasswordFields>
      </Container>
    </div>
  );
};

export default DashBoard;
