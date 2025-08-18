import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import img from '../assets/couple.png';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider ,signInWithPopup} from "firebase/auth";
import {app} from "../firebase";
import  './common.css';
const auth =getAuth(app);
const googleprovider=new GoogleAuthProvider();
function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get('refreshToken');
    if (token) {
      navigate('/WeddingCategories');
    }
  }, []);
  const [data, setdata] = useState({
    email: '',
    password: '',
  });
  const handlechange = (e) => {
    setdata({
      ...data,
      [e.target.id]: e.target.value,
    });
  };
  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });
      const Data = await response.json();
      if (response.ok) {
        alert('User logged in succesfully!');
        navigate('/WeddingCategories');
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
async function signwithgoogle(){
  try{
    const check=await signInWithPopup(auth,googleprovider);
    const token=await check.user.getIdToken();
    await fetch("http://localhost:5000/login/set-cookie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", 
      body: JSON.stringify({ token }),
    });
    alert("logged in using google sucessfull");
    navigate('/WeddingCategories');
  }catch(err){
    alert("error logged in using google kindly use another method!");
    console.log("error logged in usinng google",err);
  }
  }

  return (
    <div className="min-h-screen w-full  flex items-center justify-center bg-gray-50 py-6 px-2 ">
      <div className="w-full max-w-4xl bg-[#F0F0E8] flex flex-col md:flex-row overflow-hidden rounded  ">
        <div className="md:w-1/2 w-full flex flex-col justify-center p-8 md:p-12">
          <div className="mb-8 text-center  md:text-left">
            <h1 className="font-cursive text-3xl md:text-4xl font-light mb-2 text-gray-800">Your Perfect Wedding is waiting</h1>
          </div>
          <form id="LoginForm" onSubmit={submit} className="space-y-4">
            <div>
              <input
                type="email"
                id="email"
                placeholder="Email"
                required
                onChange={handlechange}
                className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F0F0E8] text-gray-800"
              />
            </div>
            <div>
              <input
                type="password"
                id="password"
                placeholder="Password"
                required
                onChange={handlechange}
                className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F0F0E8] text-gray-800"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[white] hover:bg-[#e0e0d0] text-gray-800 font-semibold transition-colors mt-2"
            >
              Login
            </button>
          </form>
          <div className="flex flex-col items-center mt-4">
            <hr />Or<hr />
           <button onClick={signwithgoogle} class="google-btn">
   <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google Logo"/>
    <span>Continue with Google</span>
</button>
            <Link
              to="/sign"
              className="text-blue-600 underline italic text-sm hover:text-blue-800 transition-colors"
            >
              New user? sign up here!
            </Link>
          </div>
        </div>
        {/* Right: Image */}
        <div className="md:w-1/2 w-full hidden md:flex items-center justify-center bg-[#F0F0E8] rounded-none border-none p-0 m-0">
          <img src={img} alt="Wedding couple" className="object-cover w-full h-full border-none shadow-none outline-none ring-0 rounded-none p-0 m-0" />
        </div>
      </div>
    </div>
  );
}
export default Login;