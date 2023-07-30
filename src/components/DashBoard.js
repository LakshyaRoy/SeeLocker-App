// DashBoard.js displaying all the saved passwords and form to save password etc.

import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { EyeFilled, EyeInvisibleFilled, DeleteFilled } from "@ant-design/icons";
import fetchApi from "../utils/fetchApi";
import { Navigate } from "react-router-dom";
import Noty from "noty";
import "noty/lib/noty.css";
import "noty/lib/themes/semanticui.css";
import Footer from "./Footer";
import NavBar from "./NavBar";

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
  margin-bottom: 20px;
  width: 360px;
  height: 50px;

  .justGap {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
  }

  p {
    color: #663405;
    font-size: 18px;
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
  const [hashedpassword, setHashedPassword] = useState("");
  const [itemId, setItemId] = useState("");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [data, setData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Noty js notification
  const successAdd = new Noty({
    text: "Successfully Added!",
    type: "success",
    theme: "semanticui",
    timeout: 3000,
  });
  const successDel = new Noty({
    text: "Password Deleted!",
    type: "success",
    theme: "semanticui",
    timeout: 3000,
  });
  const errorNoty = new Noty({
    text: "There's some issue,try again!",
    type: "error",
    theme: "semanticui",
    timeout: 3000,
  });

  // Check if the user is logged in on component mount
  useEffect(() => {
    if (!token) {
      // If the token doesn't exist, the user is not logged in, set isLoggedIn to false
      setIsLoggedIn(false);
    } else {
      // If the token exists, the user is logged in, set isLoggedIn to true
      setIsLoggedIn(true);

      // Get all notes from the database and store them in state
      fetchApi
        .get("/api/getpasswords")
        .then((res) => {
          setData(res.data);
        })
        .catch((error) => {
          console.error("Error fetching notes:", error);
        });
    }
  }, [data, token]); // Empty dependency array ensures the effect runs only once on component mount

  // If the user is not logged in, redirect to the login page
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const generateRandomPassword = () => {
    fetchApi
      .get("/api/getrandom")
      .then((res) => {
        setPassword(res.data.password);
      })
      .catch((error) => {
        console.error("Error decrypting password:", error);
      });
  };
  const handleView = (password, iv, id) => {
    if (itemId === id) {
      // If item ID is the same, hide the password
      setItemId(null);
      setHashedPassword("");
    } else {
      // If item ID is different, show the password
      const newItem = {
        password,
        iv,
        id,
      };
      fetchApi
        .post("/api/decryptpassword", newItem)
        .then((res) => {
          setItemId(id);
          setHashedPassword(res.data.password);
        })
        .catch((error) => {
          console.error("Error decrypting password:", error);
        });
    }
  };

  const addPassword = () => {
    const newItem = {
      name,
      password,
      userId,
    };
    fetchApi
      .post("/api/addPassword", newItem)
      .then(() => successAdd.show())
      .catch(() => errorNoty.show());
  };
  const onDelete = (id) => {
    fetchApi
      .delete("/api/password/" + id)
      .then(() => successDel.show())
      .catch(() => errorNoty.show());
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
              placeholder="Enter Password Name"
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
            <p onClick={generateRandomPassword}>
              Click here to Generate Random Password{" "}
            </p>

            <button onClick={addPassword}>Save Password</button>
          </PasswordForm>
        </Bubble>
        <PasswordFields>
          {data.map((item) => (
            <InnerPasswordFields key={item._id}>
              <p>{item.name}</p>
              <p>{itemId === item._id ? hashedpassword : "********"}</p>
              <p className="justGap">
                <span
                  onClick={() => handleView(item.password, item.iv, item._id)}
                >
                  {itemId !== item._id ? <EyeFilled /> : <EyeInvisibleFilled />}
                </span>
                <DeleteFilled onClick={() => onDelete(item._id)} />
              </p>
            </InnerPasswordFields>
          ))}
        </PasswordFields>
      </Container>
      <Footer />
    </div>
  );
};

export default DashBoard;
