import { useState,useEffect } from "react";
import { Link, useNavigate,  } from 'react-router-dom';
import { useUser } from "../../context/user-context";
import axios from 'axios'
import './Login.css'

function Login() {
  const [email, setEmail] = useState("") 
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(false);
  // const {loginUser} = useUser()
  const navigate = useNavigate();

  // const handleLogin =(email,password)=>{
  //   loginUser(email,password)
  // } 
  // // const handleLogout =(email,password)=>{
  // //   logoutUser()
  // // }

  useEffect(()=>{
    const auth = localStorage.getItem('user');
    if(auth){
        navigate('/Login')
    }
  },[])

  

  

  const handleLogin  = ()=>{
    let result = axios.post("http://localhost:3000/Users/login",{email,password})
    .then( res=>{
      localStorage.setItem('user',JSON.stringify(result))
      navigate('/admin')
    })
    .catch(err=>{
      console.log(err)
      alert("please enter correct Email & password")
    })
  }

  return (
    <div className="auth-container">
      <div className="col-xs-1 " align="center">   
        <form>
          <div className='input-container'>
            <i className="fas fa-envelope input-icon"></i>
            <input type='text' placeholder='Enter your Email' value={email} onChange={e => setEmail(e.target.value)} /><br/>
          </div>
          <div className='input-container'>
            <i className="fas fa-key input-icon"></i>
            <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} /><br/>
          </div>
          <button type="button" className='button2' onClick={() => handleLogin()} >Login</button>
            { errors && <p className='error'>Invalid username or password!</p>}
          <Link className='button1' to='/SignUp'>SignUp</Link>
        </form>
      </div>
    </div>
  )
}

export default Login

// state {Error,SetError}
// function submitForm (catch(setError (True))) 
// <div className="special">
//   <Link to='/'>Forgot Password ?</Link>
// </div>
// <button type="button" className='button1' onClick={<Signup/>} >SignUp</button>
