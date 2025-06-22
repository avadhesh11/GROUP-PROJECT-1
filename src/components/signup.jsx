import {useState,useEffect}from 'react';
import './sign.css';
import Cookies from 'js-cookie';
import img from '../assets/couple.png'
import { Link ,useNavigate }from 'react-router-dom';
function Sign(){

  const navigate=useNavigate();
   useEffect(() => {
    const token = Cookies.get("refreshToken");
    if (token) {
      console.log("cookie found");
      navigate("/WeddingCategories");
    }
  }, []);
  const [part,setpart]=useState(1);
  const [otp,setotp]=useState("");
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
  const otpchange=(e)=>{
  setotp(e.target.value);

  }
  const sendotp=async(e)=>{
    e.preventDefault();
    try{
          const response = await fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials:'include'
      });

      const Data = await response.json();

      if (response.ok) {
        alert('OTP sent succesfully');
        setpart(2);
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
    const verifyOtp=async(e)=>{
      e.preventDefault();
 try{
          const response = await fetch('http://localhost:5000/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
         body: JSON.stringify({ email: data.email, otp }),
        credentials:'include'
      });

      const Data = await response.json();

      if (response.ok) {
        alert('user registered succesfully');
         navigate("/WeddingCategories");
       console.log(Data);
      } else {
        alert(Data.error);
        console.error(Data);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Something went wrong.');
    
    }
    }
return(

<div className="sign">
   <div className="card1">

    <div className="left">
      
      <div className="text">
 <h1 >Your Perfect Wedding is waiting</h1>
 </div>
   {part===1 ? (
 <form id="signupForm" onSubmit={sendotp} >

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
  <button type="submit" className="login-btn">Send OTP</button>
  
</form>
):(
<form onSubmit={verifyOtp}>
              <div className="input-group">
                <input type="text" id="otp" placeholder="Enter OTP" required onChange={otpchange} />
              </div>
              <button type="submit" className="login-btn">Verify otp</button>
            </form>
          )
}
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