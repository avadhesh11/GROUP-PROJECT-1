import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import img from "../assets/couple.png";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import "./common.css";
const auth = getAuth(app);
const googleprovider = new GoogleAuthProvider();
function Sign() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("refreshToken");
    if (token) {
      console.log("cookie found");
      navigate("/WeddingCategories");
    }
  }, []);
  const [part, setpart] = useState(1);
  const [otp, setotp] = useState("");
  const [token, settoken] = useState("");
  const [askvendor, setvendor] = useState(false);
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setloading] = useState(false);
  const handlechange = (e) => {
    setdata({
      ...data,
      [e.target.id]: e.target.value,
    });
  };
  const otpchange = (e) => {
    setotp(e.target.value);
  };
  const sendotp = async (e) => {
    e.preventDefault();
    if (!data.email.endsWith("@gmail.com")) {
      alert("only Gmail accounts are accepted");
      setdata((prev) => ({ ...prev, email: "" }));
      return;
    }
    try {
      setloading(true);
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
      const Data = await response.json();
      if (response.ok) {
        alert("OTP sent succesfully");
        setloading(false);
        setpart(2);
        console.log(Data);
      } else {
        alert(Data.error);
        setloading(false);
        navigate('/login');
        
        console.error(Data);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong.");
      return;
    }
  };
  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email, otp }),
        credentials: "include",
      });
      const Data = await response.json();
      if (response.ok) {
        alert("user registered succesfully");
        setvendor(true);
        navigate("/Vendor");

        console.log(Data);
      } else {
        alert(Data.error);
   
        console.error(Data);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong.");
    }
  };
  async function signwithgoogle() {
    try {
      const check = await signInWithPopup(auth, googleprovider);

      const res = await fetch("http://localhost:5000/auth/glogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: check.user.displayName,
          email: check.user.email,
        }),
        credentials: "include",
      });

      const data = await res.json();
      const token = await check.user.getIdToken();
      if (data.message === "Email already exists!") {
        await fetch("http://localhost:5000/login/set-cookie", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ token }),
        });
        navigate("/WeddingCategories");
      } else {
        settoken(token);
        navigate("/Vendor")
      }
    } catch (err) {
      console.error("error:", err);
    }
  }
  const set = async (token) => {
    try {
      await fetch("http://localhost:5000/login/set-cookie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ token: token }),
      });
      setvendor(false);
      navigate("/WeddingCategories");
    } catch (err) {
      console.error("Error setting cookie:", err);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 py-6 px-2">
    
        <div className="w-full  max-w-4xl bg-[#F0F0E8] rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden border border-gray-200">
          {/* Left: Form */}
          <div className="md:w-1/2 w-full flex flex-col justify-center p-8 md:p-12 ">
            <div className="mb-8 text-center md:text-left">
              <h1 className="font-cursive text-3xl md:text-4xl font-light mb-2 text-gray-800">
                Your Perfect Wedding is waiting
              </h1>
            </div>
            {part === 1 ? (
              <form id="signupForm" onSubmit={sendotp} className="space-y-4">
                <div>
                  <input
                    type="text"
                    id="name"
                    placeholder="Full Name"
                    required
                    onChange={handlechange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F0F0E8] text-gray-800"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={data.email}
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
                  type="button"
                  disabled={loading}
                  onClick={sendotp}
                  className="w-full py-3 rounded-xl bg-white hover:bg-[#e0e0d0] text-gray-800 font-semibold transition-colors shadow-md mt-2"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin  rounded-full h-5 w-5 border-b-2 border-black "></div>

                      <h5>Sending OTP...</h5>
                    </div>
                  ) : (
                    "Send OTP"
                  )}
                </button>
                <div className="flex flex-col items-center mt-4">
                  OR
                  <button onClick={signwithgoogle} className="google-btn">
                    <img
                      src="https://img.icons8.com/color/48/000000/google-logo.png"
                      alt="Google Logo"
                    />
                    <span>Continue with Google</span>
                  </button>
                  <Link
                    to="/login"
                    className="text-blue-600 underline italic text-sm hover:text-blue-800 transition-colors"
                  >
                    Existing user? Login Here
                  </Link>
                </div>
              </form>
            ) : (
              <>
              
             <form id="otpform" autoComplete="off" onSubmit={verifyOtp} className="space-y-4">
  
<input type="text" style={{display:"none"}} autoComplete="username" />
<input type="password" style={{display:"none"}} autoComplete="current-password" />
  <div>
    <input
       type="text"
  id="field123abc"
  name="field123abc"
  autoComplete="off"
  inputMode="numeric"
  placeholder="Enter OTP"
    readOnly
      onFocus={(e) => e.target.removeAttribute("readonly")}
      required
      onChange={otpchange}
      className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 
                 focus:outline-none focus:ring-2 focus:ring-[#F0F0E8] text-gray-800"
    />
  </div>
  <button type="submit" className="w-full py-3 rounded-xl bg-white hover:bg-[#e0e0d0] text-gray-800 font-semibold transition-colors shadow-md mt-2">
    Verify OTP
  </button>
</form>
</>
            )}
          </div>
          {/* Right: Image */}
          <div className="md:w-1/2 w-full hidden md:flex items-center justify-center bg-[#F0F0E8]">
            <img
              src={img}
              alt="Wedding couple"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      
    </div>
  );
}
export default Sign;
