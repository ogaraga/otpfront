import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import useLoading from "./useLoading";

function Login() {
  const [password, setPassword] = useState("");  
  const [email, setEmail] = useState("");
  const [state, setstate] = useState(false);
  const [isLoading] = useLoading();
  const navigate = useNavigate();
  const handleSubmit = async (e)=>{
    e.preventDefault();
    setstate(isLoading);
    await fetch('https://one-time-password-omega.vercel.app/login',{
      method:'POST',
      headers:{
        'content-type': 'application/json'
      },
      body:JSON.stringify({email,password})
    }).then(res=>res.json()).then(data=>{
      if(data === 'Login successful!'){
        alert(data)
        navigate('/home')
      }else{
        alert(data)
        navigate('/login')
      }
    }).catch(error=>alert(error.message)).finally(()=>setstate(!isLoading)); 
  }
  return (
    <div className='login'>
        <h1>Login form</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name='email' value={email} placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)} />
          <input type="password" name='password' value={password} placeholder='Enter your password'onChange={(e)=>setPassword(e.target.value)} />
          {state? <div className="divspin"><Spinner/></div>:<> {(email && password)!==''?  <button  type="submit" id="logBtn">login</button>: <button  type="submit" id="logBtn" disabled style={{cursor: 'not-allowed'}}>disabled</button>}</>}       
          
        </form>
    </div>
  )
}

export default Login;