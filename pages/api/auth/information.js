import { getSession } from "next-auth/react";
import ConnectDB from "../../../utils/ConnectDB";
import User from "../../../models/User";
import { verifypassword } from "../../../utils/Help";


export default async function handler(req, res) {
  try {
    await ConnectDB();
  } catch (error) {
    res.status(500).json({ status: "failed", message: "not connect to DB" });
  }

  const session = await getSession({ req });
  if (!session) {
   return res.status(401).json({ status: "failed", message: "unathorziton" });
  }

  const user = await User.findOne({ email: session.user.email });
  if (!user) {
   return res
      .status(404)
      .json({ message: "user logout please try to login", status: "failed" });
  }

  
  if (req.method === "POST") {
    const { name, lastname, password } = req.body;

  const veripassword = await verifypassword(password,user.password);
  if (!veripassword) {
    res
      .status(422)
      .json({
        message: "username or password is not correct",
        status: "failed",
      });
  }

    user.name = name;
    user.lastname = lastname;
    user.save();
    res
      .status(200)
      .json({
        message: "user is compelte form",
        status: "success",
        data: { name, lastname, email: session.user.email },
      });
  }else if(req.method === "GET"){
   
    res
    .status(200)
    .json({
      status: "success",
      data: { name:user.name,lastname:user.lastname , email:user.email },
    });

  }else if(req.method === "PATCH"){
    const { name, lastname , email } = req.body;
    if(!name || !lastname){
      return   res.status(422).json({message:"Invalid data",status:"failed"})
       }

       user.name = name;
       user.lastname = lastname;
       user.email = email;
       user.save();


       res.status(200).json({message:"user is updated" ,status:"success"})
  }
}
