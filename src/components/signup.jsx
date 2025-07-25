import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import img from '../assets/couple.png';
import { Link, useNavigate } from 'react-router-dom';

function Sign() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get('refreshToken');
    if (token) {
      console.log('cookie found');
      navigate('/WeddingCategories');
    }
  }, []);
  const [part, setpart] = useState(1);
  const [otp, setotp] = useState('');
  const [data, setdata] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
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
    if (!data.email.endsWith('@gmail.com')) {
      alert('only Gmail accounts are accepted');
      setdata((prev) => ({ ...prev, email: '' }));
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
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
      return;
    }
  };
  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.email, otp }),
        credentials: 'include',
      });
      const Data = await response.json();
      if (response.ok) {
        alert('user registered succesfully');
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
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 py-6 px-2">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden border border-gray-200">
        {/* Left: Form */}
        <div className="md:w-1/2 w-full flex flex-col justify-center p-8 md:p-12">
          <div className="mb-8 text-center md:text-left">
            <h1 className="font-cursive text-3xl md:text-4xl font-light mb-2 text-gray-800">Your Perfect Wedding is waiting</h1>
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
                  type="tel"
                  id="phone"
                  placeholder="Phone Number"
                  required
                  pattern="[0-9]{10}"
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
                type="submit"
                className="w-full py-3 rounded-xl bg-[#F0F0E8] hover:bg-[#e0e0d0] text-gray-800 font-semibold transition-colors shadow-md mt-2"
              >
                Send OTP
              </button>
              <div className="flex flex-col items-center mt-4">
                <Link
                  to="/login"
                  className="text-blue-600 underline italic text-sm hover:text-blue-800 transition-colors"
                >
                  Existing user? Login Here
                </Link>
              </div>
            </form>
          ) : (
            <form id="signupForm" onSubmit={verifyOtp} className="space-y-4">
              <div>
                <input
                  type="tel"
                  id="otp"
                  placeholder="Enter OTP"
                  required
                  onChange={otpchange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F0F0E8] text-gray-800"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#F0F0E8] hover:bg-[#e0e0d0] text-gray-800 font-semibold transition-colors shadow-md mt-2"
              >
                Verify OTP
              </button>
            </form>
          )}
        </div>
        {/* Right: Image */}
        <div className="md:w-1/2 w-full hidden md:flex items-center justify-center bg-[#F0F0E8]">
          <img src={img} alt="Wedding couple" className="object-cover w-full h-full" />
        </div>
      </div>
    </div>
  );
}
export default Sign;