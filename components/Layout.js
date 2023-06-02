import Link from "next/link";
import React, { useEffect } from "react";
import { VscListSelection } from "react-icons/vsc";
import { AiOutlineSmile } from "react-icons/ai";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { BiLogOut } from "react-icons/bi";

const Layout = ({ children }) => {
  const router = useRouter()
  const {status} = useSession()

 
  const Logouthandler= async() => {
    signOut();
    router.replace("/Signin")
  }
  return (
    <div className="container">
      <header>
    
        <p>Todo app || Fullstack project </p>
        {status === "authenticated" ?   <button onClick={Logouthandler}>Logout <BiLogOut/></button> :null }
      
      </header>
      <div className="container--main">
        <aside>
          <p>Welcome <AiOutlineSmile/> </p> 
          <ul>
            <li>
            <VscListSelection/>
              <Link href="/">Todo</Link>
              
            </li>
            <li>
            <AiOutlinePlusSquare/>
              <Link href="/add-todo">add Todo</Link>
              
            </li>
            <li>
            <ImProfile/>
              <Link href="/Profile">Profile</Link>
            </li>
          </ul>
        </aside>
        <section>{children}</section>
      </div>
    </div>
  );
};

export default Layout;
