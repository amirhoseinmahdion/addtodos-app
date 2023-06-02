import { getSession } from "next-auth/react";
import Addtodopage from "../template/Addtodopage";


const AddTodo = () => {
    return (
        <div>
            <Addtodopage/>
        </div>
    );
};

export default AddTodo;
export async function getServerSideProps({req}){
    const session = await getSession({req})
    if(!session){
       return{
        redirect:{destination:"Signin"}
       }
    }

    return{props:{}}
}