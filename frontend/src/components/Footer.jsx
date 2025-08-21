import React from "react";
import { Heart, Utensils, MapPin, Camera, Palette,Mail,Music,Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-blue-950 dark:bg-gray-800 dark:from-pink-700 dark:via-purple-800 dark:to-indigo-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
     <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div>
           <h2 className="text-lg font-semibold mb-4 hover:scale-105 hover:text-pink-500 transition duration-300 cursor-pointer">
  Wedding Planner
</h2>

            <p className="text-sm text-pink-100 leading-relaxed">
              Plan your dream wedding with beautiful venues, delicious food, 
              creative themes, and stunning photography — all in one place.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 hover:scale-105 hover:text-pink-500 transition duration-300 cursor-pointer">Categories</h3>
            <ul className="space-y-3 text-pink-100">
             <li className="flex items-center px-3 py-1 rounded-md transition-colors hover:bg-white/10 hover:text-white">
                 <MapPin size={17} className="mr-2 text-pink-500" />
                <Link to="/VenuePage">Venues</Link>
              
              </li>
             <li className="flex items-center px-3 py-1 rounded-md transition-colors hover:bg-white/10 hover:text-white">
                 <Utensils size={17} className="mr-2 text-pink-500" />
                <Link to="/FoodPage">Food</Link>
              </li>
             <li className="flex items-center px-3 py-1 rounded-md transition-colors hover:bg-white/10 hover:text-white">
                <Palette size={17} className="mr-2 text-pink-500" />
                <Link to="/ThemePage">Themes</Link>
              </li>
            <li className="flex items-center px-3 py-1 rounded-md transition-colors hover:bg-white/10 hover:text-white">
                <Camera size={17} className="mr-2 text-pink-500" />
                <Link to="/PhotographyPage">Photography</Link>
              </li>
                <li className="flex items-center px-3 py-1 rounded-md transition-colors hover:bg-white/10 hover:text-white">
                <Mail size={17} className="mr-2 text-pink-500" />
                <Link to="/InvitationPage">Invitation</Link>
              </li>
               <li className="flex items-center px-3 py-1 rounded-md transition-colors hover:bg-white/10 hover:text-white">
                <Music size={17} className="mr-2 text-pink-500" />
                <Link to="/MusicPage">Music</Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 hover:scale-105 hover:text-pink-500 transition duration-300 cursor-pointer">Quick Links</h3>
            <ul className="space-y-3 text-pink-100">
              <li className="flex items-center px-2 py-1 rounded-md transition-colors hover:bg-white/10 hover:text-white">
                <Link to="/about">About Us</Link>
              </li>
             <li className="flex items-center px-2 py-1 rounded-md transition-colors hover:bg-white/10 hover:text-white">
                <Link to="/contact">Contact</Link>
              </li>
            <li className="flex items-center px-2 py-1 rounded-md transition-colors hover:bg-white/10 hover:text-white">
                <Link to="/faq">FAQs</Link>
              </li>
             <li className="flex items-center px-2 py-1 rounded-md transition-colors hover:bg-white/10 hover:text-white">
                <Link to="/privacy">Privacy Policy</Link>
              </li>
            </ul>
          </div>

        

<div>
  <h3 className="text-lg font-semibold mb-4 hover:scale-105 hover:text-pink-500 transition duration-300 cursor-pointer">
    Stay Updated
  </h3>
  <p className="text-sm text-pink-100 mb-4">
    Subscribe to get the latest Wedding Ideas.
  </p>

  {/* Social Media Links */}
  <div className="flex space-x-4">
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
         className="p-2 rounded-full text-pink-100 hover:text-pink-500 hover:bg-white/10 transition duration-300"
>
      <Facebook size={20} />
    </a>
    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
        className="p-2 rounded-full text-pink-100 hover:text-pink-500 hover:bg-white/10 transition duration-300"
>
      <Twitter size={20} />
    </a>
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
        className="p-2 rounded-full text-pink-100 hover:text-pink-500 hover:bg-white/10 transition duration-300"
>
      <Instagram size={20} />
    </a>
    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" 
         className="p-2 rounded-full text-pink-100 hover:text-pink-500 hover:bg-white/10 transition duration-300"
>
      <Youtube size={20} />
    </a>
  </div>

</div>
 </div>

        <div className="border-t border-pink-400/40 mt-10 pt-6 text-center text-pink-100 text-sm">
          © {new Date().getFullYear()} Wedding Planner. 
          <span className="flex items-center justify-center text-sm text-pink-100 mt-6">
  Made with <Heart className="mx-1 text-pink-500" size={16} /> for your dream day.
</span>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
