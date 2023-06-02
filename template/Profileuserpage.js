import { useRouter } from 'next/router';
import React from 'react';

const Profileuserpage = ({data}) => {
    const router = useRouter()
    const upadtehandler = () => {
        router.push("/Updateuser")
       
    }
    return (
        <div className='profile-data'>
            <div>
            <span>Name:</span>
            <p>{data.name}</p>
            </div>
            <div>
            <span>lastname:</span>
            <p>{data.lastname}</p>
            </div>
            <div>
            <span>Email:</span>
            <p>{data.email}</p>
            </div>
            <button onClick={upadtehandler}> Edite User</button>
        </div>
    );
};

export default Profileuserpage;