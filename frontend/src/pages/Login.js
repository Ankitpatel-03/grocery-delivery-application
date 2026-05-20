import axios from "axios";
import { useState } from "react";

function Login() {
  const [data, setData] = useState({ email: "", password: "" });

  const login = async () => {
    const res = await axios.post("http://localhost:5000/api/auth/login", data);
    localStorage.setItem("token", res.data.token);
    alert("Login success");
  };

  return (
    <div>
      <input placeholder="Email" onChange={e => setData({...data, email: e.target.value})} />
      <input type="password" placeholder="Password" onChange={e => setData({...data, password: e.target.value})} />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;