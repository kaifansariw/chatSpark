import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register(){

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async(e)=>{
    e.preventDefault();

    const response = await fetch(
      "http://localhost:8080/api/auth/register",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          name,
          email,
          password
        })
      }
    );

    const data = await response.json();

    if(response.ok){
      alert("Registration Successful");
      navigate("/login");
    }
    else{
      alert(data.error);
    }
  };

  return(
    <div className="authContainer">
     <div className="authCard">
      <h1 className="authTitle">Create Account</h1>
    <p className="authSubtitle"> Join ChatSpark today </p>

      <form onSubmit={handleRegister} className="authForm">

        <input
          placeholder="Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
           className="authInput"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="authInput"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="authInput"
        />

        <button type="submit" className="authButton">
          Register
        </button>

      </form>

      <Link to="/login" className="authLink">
        Already have an account?
      </Link>

      </div>
    </div>
  );
}

export default Register;