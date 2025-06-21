import {useState}from 'react';
import './sign.css';
import img from '../assets/couple.png'
import { Link } from 'react-router-dom';
function Sign(){
    const [data,setdata]=useState(
        {
            name:'',
            email:'',
            phone:'',
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
          const response = await fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const Data = await response.json();

      if (response.ok) {
        alert('User registered successfully!');
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
   <div className="card1">
    <div className="left">
      
      <div className="text">
 <h1 >Your Perfect Wedding is waiting</h1>
 </div>
 <form id="signupForm" onSubmit={submit}>

  <div className="input-group">
    <input type="text" id="name" placeholder="Full Name" required="" onChange={handlechange} />
  </div>
  <div className="input-group">
    <input type="tel" id="phone" placeholder="Phone Number" required="" pattern="[0-9]{10}"  onChange={handlechange}/>
  </div>
  <div className="input-group">
       <input type="email" id="email" placeholder="Email" required=""  onChange={handlechange} />
  </div>
  <div className="input-group">
    <input type="password" id="password" placeholder="Password" required=""  onChange={handlechange}/>
  </div>
  <button type="submit" className="login-btn" id="login-btn">
    Sign Up
  </button>
  
</form>
<div className="other">
<Link  class="navi" to="/login" style={{color:'blue',textDecoration: 'underline', fontStyle: 'italic'}}>Already have an account?</Link>
<p>or continue with-</p>
  </div>
  </div>
    <div className="right">
<img src={img} alt="" />
</div>
    </div>
  
    </div>
);
};
export default Sign;