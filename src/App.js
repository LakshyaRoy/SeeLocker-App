import React, { useState } from "react";
// import Axios from "axios";
import HomePage from "./components/HomePage";

import "./App.css";
import DashBoard from "./components/DashBoard";
import { BrowserRouter, Route } from "react-router-dom";

import { Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Signup from "./components/Signup";

const App = () => {
  // const [name, setName] = useState("");
  // const [password, setPassword] = useState("");

  // const handleClick = () => {
  //   Axios.post("http://localhost:8000/addPassword", {
  //     name,
  //     password,
  //   })
  //     .then((res) => console.log("Posted!", res))
  //     .catch((err) => console.log(err));
  // };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

{
  /* <form>
        <input
          type="name"
          value={name}
          placeholder="Password Title"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={handleClick}>
          Save
        </button>
      </form> */
}
