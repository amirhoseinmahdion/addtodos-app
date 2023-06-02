import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Signinpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const signinhandler = async () => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (!res.error) router.replace("/");
  };

  const {status , data} = useSession()
  useEffect(() => {
    if(status==="authenticated"){
        router.replace("/")
    }
  },[status])
  return (
    <div className="signin-form">
      <h3>Login form</h3>
      <input
        type="Text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="Password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signinhandler}>Login</button>
      <div>
        <p>Create an account?</p>
        <Link href="/Signup">Sign up</Link>
      </div>
    </div>
  );
};

export default Signinpage;
