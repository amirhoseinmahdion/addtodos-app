import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import ConnectDB from "../../../utils/ConnectDB";
import User from "../../../models/User";
import { verifypassword } from "../../../utils/Help";

export default NextAuth({
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;

        try {
          await ConnectDB();
        } catch (error) {
          throw new Error("not Connect to DB");
        }

        if (!email || !password) {
          throw new Error("uncompelte to from");
        }

        const existuser = await User.findOne({ email: email });
        if (!existuser) {
          throw new Error("please to sign up form");
        }

        const verifypas = await verifypassword(password, existuser.password);

        if (!verifypas) 
          throw new Error("username or password is not correct");
        

        return { email };
      },
    }),
  ],
});
