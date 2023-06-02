import { Schema, model, models } from "mongoose";

const userschema = new Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  name: {
    type: String,
  },
  lastname: {
    type: String,
  },

  createAt: {
    type: Date,
    default: () => Date.now(),
    imutable: true,
  },

  todos:[{title:String , status:String}]
});

const User = models.User || model("User", userschema);
export default User;
