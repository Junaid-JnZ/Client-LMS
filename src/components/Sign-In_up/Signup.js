import { useEffect, useState } from 'react';
import { Link, useNavigate,  } from 'react-router-dom';
import './Login.css'
import axios from 'axios'

function Signup() {
    const [name, setName] = useState(""); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [errors, setErrors] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/SignUp')
        }
    },[])
//     const collectData  = ()=>{
//         let result = axios.post("http://localhost:3000/Users/signUp",{name,email,password})
//         .then(res=>{
//         if(result.email){
//             localStorage.setItem('user',JSON.stringify(result))
//             navigate('/Home')
//         }
//         })
//         .catch(err=>{
//             console.log(err)
//             alert("please enter correct Email & password")
//     })
//   }

    const collectData = async()=>{
        let result = await fetch("http://localhost:3000/Users/signUp",{
          method: 'post',
          body: JSON.stringify({name,email,password}),
          headers:{
            'Content-Type': ' application/json'
          }
        })
        result = await result.json();
        console.log(result)
        localStorage.setItem('user',JSON.stringify(result))
        if(result.email){
            localStorage.setItem('user',JSON.stringify(result))
            navigate('/Home')
        }else{
            alert("email is already in use")
        }
    }

    return (
        <div className="auth-container">
            <div className="col-xs-1" align="center">   
                <form>
                    <div className='input-container'>
                        <i className="fas fa-envelope input-icon"></i>
                        <input type='text' placeholder='Username' value={name} onChange={e => setName(e.target.value)} /><br/>
                    </div>
                    <div className='input-container'>
                        <i className="fas fa-key input-icon"></i>
                        <input type='email' placeholder='Enter Your Email' value={email} onChange={e => setEmail(e.target.value)} /><br/>
                    </div>
                    <div className='input-container'>
                        <i className="fas fa-key input-icon"></i>
                        <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} /><br/>
                    </div>                  
                    <button type="button" className='button1' onClick={() => collectData()} >SignUp</button>
                </form>
            </div>
        </div>
        )
  }
  
  export default Signup


//   <div className="special">
//   <Link className='button2'to='/auth/forget'>Forgot Password ?</Link>
// </div>
// { errors && <p className='error'>Invalid username or password!</p>}
