import {useState}from 'react';
import './sign.css';
import img from '../assets/couple.png';
import { Link } from 'react-router-dom';
function Login(){
    const [data,setdata]=useState(
        {
            email:'',
            password:''

        }
    );
   const handlechange=(e)=>{
   setdata({
      ...data,
      [e.target.id]: e.target.value
    });
    };
  const submit=async(e)=>{
    e.preventDefault();
    try{
        const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const Data = await response.json();

      if (response.ok) {
        alert("User logged in succesfully!");
        console.log(Data);
      } else {
        alert(Data.error);
        console.error(Data);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Something went wrong.');
    
    }
  };
    
return(
<div className="sign">
   <div className="card">
    <div className="left">
   <div className="text">
 <h1 >Your Perfect Wedding is waiting</h1>
 </div>
 <form id="LoginForm" onSubmit={submit}>
  <div className="input-group">
       <input type="email" id="email" placeholder="Email" required=""  onChange={handlechange} />
  </div>
  <div className="input-group">
    <input type="password" id="password" placeholder="Password" required=""  onChange={handlechange}/>
  </div>
  <button type="submit" className="login-btn" id="login-btn">
    Login
  </button>
</form>
<div className="other">
<Link to="/" class="navi" style={{color:'blue',textDecoration: 'underline', fontStyle: 'italic'}}>New user? sign up here!</Link>
</div>
    </div>
    <div className="right">
<img src={img} alt="" />

    </div>
    </div>
</div>
);
};
export default Login;