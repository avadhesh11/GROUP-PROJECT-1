import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Heart, User, Pointer } from 'lucide-react';
import { getAuth,signOut } from 'firebase/auth';
function Navbar() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
 const[profile,setprofile]=useState(false);
 const [theme,toggleTheme]=useState("light");
  const hamburger = () => {
    setOpen(!open);
  };
const Navigate=useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/categories")
      .then((response) => {
        console.log("Fetched categories:", response.data);
        setCategories(response.data);
      })
      .catch((error) => {
        console.log("Error fetching categories", error);
      });
  }, []);
  const logout=async()=>{
    const auth=getAuth();
try{
  await signOut(auth);
  await fetch("http://localhost:5000/login/logout",{
    method:"POST",
    credentials:"include"
  })
  localStorage.clear();
  window.location.reload();

}catch(err){
  console.log("ERROR LOGGING OUT",err);
}
  }

  const Categories_card = ({ category }) => (
    <div className="group cursor-pointer p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-r from-pink-100 to-purple-100 flex items-center justify-center">
          <img 
            src={category.image} 
            alt={category.title}
            className="w-8 h-8 object-cover rounded"
          />
        </div>
        <div className="text-white font-medium group-hover:text-pink-200 transition-colors">
          {category.title}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Mobile Menu */}
            <div className="flex items-center space-x-4">
              <button
                onClick={hamburger}
                className="lg:hidden p-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
              
              <div  onClick={()=>Navigate('/WeddingCategories')} className="flex items-center space-x-2 cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">W</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  WeddingPlanner
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
          
            <div className="hidden lg:flex items-center space-x-4">
                <select
    className="px-3 py-2 rounded-full border border-gray-200 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 text-gray-700"
    defaultValue="Ahmedabad"
  >
    <option value="" disabled>
      Select Location
    </option>
    <option value="Delhi">Delhi</option>
    <option value="Mumbai">Mumbai</option>
    <option value="Bangalore">Bangalore</option>
    <option value="Chennai">Chennai</option>
    <option value="Kolkata">Kolkata</option>
    <option value="Hyderabad">Hyderabad</option>
    <option value="Jaipur">Jaipur</option>
    <option value="Ahmedabad">Ahmedabad</option>
  </select>
   
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search venues, photographers..."
                  className="w-80 pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-gray-50/50 transition-all duration-300"
                />
              </div>
              
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Heart size={20} className="text-gray-600" />
              </button>
             <div className="relative">
  <button
    onClick={() => setprofile(!profile)}
    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
  >
    <User size={20} className="text-gray-600" />
  </button>
   
  {profile && (
    <div className="absolute top-full mt-2 right-0 w-48 bg-white rounded-lg shadow-lg overflow-hidden">
      {Cookies.get('refreshToken') ? (
        <>
          <button onClick={()=>Navigate('/profile')} className="block px-4 py-2 w-full text-left hover:bg-gray-100">Profile</button>
          <button onClick={logout}id="logout" className="block px-4 py-2 w-full text-left text-red-500 hover:bg-gray-100">
            Logout
          </button>
         
        </>
      ) : (
        <button onClick={()=>Navigate('/login')}
          className="block px-4 py-2 w-full text-left hover:bg-gray-100">LOGIN</button>
          
      )}
    </div>
  )}
   <button
        onClick={toggleTheme}
        className="px-2 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:scale-105 transition-transform"
      >
        {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
      </button>

</div>

 
               </div>

            {/* Mobile Search Icon */}
            <div className="lg:hidden">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Search size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40 bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-700">
          <div className="h-full overflow-y-auto pt-20 px-4">
            {/* Mobile Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" size={18} />
              <input
                type="text"
                placeholder="Search venues, photographers..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
              />
            </div>
            {/* Mobile User Actions */}
            <div className="mt-8 space-y-4">
              <button className="w-full flex items-center space-x-3 p-4 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                <Heart size={20} />
                <span>Favorites</span>
              </button>
              <button onClick={()=>setprofile(!profile)} className="w-full flex items-center space-x-3 p-4 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                <User size={20} />
                <span>Profile</span>
              </button>
            </div>
           

            {/* Categories Grid */}
            <div className="space-y-4">
              <h3 className="text-white text-lg font-semibold mb-4">Wedding Categories</h3>
              <div className="grid gap-3">
                {categories.map((category) => (
                  <Categories_card key={category.id} category={category} />
                ))}
              </div>
            </div>

            
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;