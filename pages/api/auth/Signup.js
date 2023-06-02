import User from "../../../models/User";
import ConnectDB from "../../../utils/ConnectDB";
import { Hashpassword } from "../../../utils/Help";

 async function handler(req, res) {
  try {
    await ConnectDB();
  } catch (error) {
    res.status(500).json({ status:"failed",message: "not connect to DB" });
  }

  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(422).json({ status: "failed", message: " uncompleted form" });
    }

    const existuser = await User.findOne({ email: email });
    if(existuser) {
     return res.status(422).json({ status: "failed", message: "user is exist" });
    }

    const ispassword = await Hashpassword(password);
    const newuser = await User.create({ email: email, password: ispassword });
    console.log(newuser);

    
  }

  res.status(201).json({ status: "success",  message: "user is created"  });
  
 
}
 
export default handler;