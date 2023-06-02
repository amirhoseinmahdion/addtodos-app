import { useRouter } from 'next/router';
import React, { useState } from 'react';

const Updateuserpage = () => {
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const router = useRouter()

    const editehandler = async() => {
        const res = await fetch("/api/auth/information", {
            method: "PATCH",
            body: JSON.stringify({ name, lastname, email}),
            headers: { "Content-Type": "application/json" },
          });
      
          const data = await res.json();
          if(data.status === "success"){
            router.replace("/")
          }
    }

    return (
        <div>
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
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            value={email}
            type="Text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <button onClick={editehandler}>Edite User</button>
        </div>
    );
};

export default Updateuserpage;