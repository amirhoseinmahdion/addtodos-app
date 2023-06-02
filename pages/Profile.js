import { getSession } from "next-auth/react";
import Profilepage from "../template/Profilepage";



const Profile = () => {
    return (
        <div>
            <Profilepage/>
        </div>
    );
};

export default Profile;


export async function getServerSideProps({req}){
    const session = await getSession({req})
    if(!session){
       return{
        redirect:{destination:"Signin"}
       }
    }

    return{props:{}}
}

