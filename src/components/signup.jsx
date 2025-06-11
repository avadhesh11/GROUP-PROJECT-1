import {useState}from 'react';
import './sign.css';
import img from '../assets/couple.png'
function Sign(){
return(
<div className="sign">
    <div className="card">
    <div className="left">
 <h1>Your Perfect Wedding is waiting</h1>
  
    </div>
    <div className="right">
<img src={img} alt="" />

    </div>
    </div>
</div>
);
};
export default Sign;