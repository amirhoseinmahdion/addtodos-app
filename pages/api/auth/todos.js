import { getSession } from "next-auth/react";
import User from "../../../models/User";
import ConnectDB from "../../../utils/ConnectDB";
import { sortTodos } from "../../../utils/sortTodos";

export default async function handler(req,res){
      try{
        await ConnectDB();
        
      }catch(error){
        res.status(500).json({message:"error in connetc to DB"})
      }

      const session = await getSession({req})
      if(!session){
        res.status(401).json({message:"unathorizetion",status:"failed"})
      }

      const user = await User.findOne({email:session.user.email})
      if(!user){
        res.status(404).json({message:"user logout please try to login",status:"failed"})
      }




      if(req.method === "POST"){
        const{title,status} = req.body

       if(!title || !status){
        res.status(422).json({message:"pelase complete form",status:"failed"})
       }

       user.todos.push({title,status})
       user.save();


        res.status(201).json({status:"success",message:"todo is create"})
      } else if(req.method === "GET"){

        const sortdata = sortTodos(user.todos)
        res.status(200).json({data:sortdata,status:"success"})

      }else if(req.method === "PATCH"){

        const {id,status} = req.body

        if(!id || !status){
       return   res.status(422).json({message:"Invalid data",status:"failed"})
        }

       const result = await User.updateOne({"todos._id":id},{$set:{"todos.$.status":status}})
       res.status(200).json({status:"success"})


      }

    

}