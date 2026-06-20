
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async(e)=>{
    e.preventDefault();

    try{

      const response = await fetch(
        "http://localhost:8080/api/auth/login",
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();
      console.log(data);
      if(response.ok){

        localStorage.setItem("token",data.token); 
        localStorage.setItem("user",JSON.stringify(data.user));

        window.location.href = "/";
      }
      else{
        alert(data.error);
      }

    }catch(error){
      console.log(error);
    }
  };

  return(
    <div className="authContainer">
      <div className="authCard">
      <h1 className="authTitle"> Login </h1>

      <form onSubmit={handleLogin} className="authForm">

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>
            setEmail(e.target.value)
          }
          className="authInput"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>
            setPassword(e.target.value)
          }
          className="authInput"
        />

        <button type="submit" className="authButton">
          Login
        </button>

      </form>

      <Link to="/register" className="authLink">
        Create Account
      </Link>
     </div>
    </div>
  );
}

export default Login;