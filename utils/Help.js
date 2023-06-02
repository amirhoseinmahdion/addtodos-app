import { hash , compare } from "bcrypt";

async function Hashpassword(password){
    const hashpass = await hash(password,12)
    return hashpass;
}

async function verifypassword(password,hashpass){
    const iscompare = await compare(password,hashpass)
    return iscompare;
}

export{Hashpassword,verifypassword}


