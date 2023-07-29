import React, { useState } from 'react';
import Axios from 'axios';

const App = () => {
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    
    const handleClick=()=>{
        Axios.post("http://localhost:8000/addPassword",{
            name, password
        }).then(res=>console.log("Posted!",res)).catch(err=>console.log(err));
    }

  return (
    <div>
        <form>
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
          <button type="button" onClick={handleClick}>Save</button>
        </form>
    </div>
  )
}

export default App;