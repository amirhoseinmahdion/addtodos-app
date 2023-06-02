import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import Profileuserpage from "./Profileuserpage";

const Profilepage = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState(null);
  const router = useRouter();
  const submithandler = async () => {
    const res = await fetch("/api/auth/information", {
      method: "POST",
      body: JSON.stringify({ name, lastname, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    

    
  };

  useEffect(() => {
    fetch("/api/auth/information")
      .then((res) => res.json())
      .then((data) => {if(data.status === "success"){setData(data.data)}});
  }, []);
  return (
    <div className="profile-form">
      <h2>
        <CgProfile />
        Profile
      </h2>
      {data ? <Profileuserpage data={data}/>:<div>
        
      <div className="profile-form__input">
        <div>
          <label htmlFor="name">name:</label>
          <input
            id="name"
            value={name}
            type="Text"
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="lastname">lastname:</label>
          <input
            id="lastname"
            value={lastname}
            type="Text"
            onChange={(e) => setLastname(e.target.value)}
          />
          <label htmlFor="password">password:</label>
          <input
            id="password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <button onClick={submithandler}>Submit</button>
        
        </div>}
     
      
    </div>
  );
};

export default Profilepage;
