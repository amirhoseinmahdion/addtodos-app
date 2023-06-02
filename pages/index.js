import { getSession } from "next-auth/react";
import Showtodos from "../template/Showtodos";

export default function Home() {
  return (
    <>
   <Showtodos/>
    </>
  )
}

export async function getServerSideProps({req}){
  const session = await getSession({req})
  if(!session){
     return{
      redirect:{destination:"Signin"}
     }
  }

  return{props:{}}
}