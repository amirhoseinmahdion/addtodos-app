import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Signuppage = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const router = useRouter()
    const {status} = useSession()
 useEffect(() => {if(status === "authenticated"){router.replace("/")}},[status])

    const signuphandler= async() => {

        const res = await fetch("/api/auth/Signup",{
            method:"POST",
            body:JSON.stringify({email,password}),
            headers:{"Content-Type":"application/json"}
        })
           const data = await res.json()
           console.log(data);

           if(data.status === "success"){
               router.push("/Signin")
           }

    }

   
   
    return (
        <div className='signin-form'>
          <h3>Sign up form</h3> 
          <input type='Text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type='Password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button onClick={signuphandler}>Register</button>
          <div>
            <p>Have an account?</p>
            <Link href="/Signin">Sign in</Link>
          </div>
        </div>
    );
};

export default Signuppage;