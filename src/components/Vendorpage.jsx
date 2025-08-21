import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
const BACKEND_URL = import.meta.env.VITE_API_URL;
const Vendor = () => {
  const navigate=useNavigate();
  const [isVendor, setIsVendor] = useState(null);
  const [category, setCategory] = useState("");
  const [details, setDetails] = useState({});

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  const onsubmit=()=>{
    if(details && category){
      alert("Your details have been saved! Our team will contact you soon for more details and verification");
    }
    else{
      alert("All details are necessary!!")
    }
  }

  const categories = {
    Venue: ["Name", "Capacity", "Location", "Price per Day","Contact"],
    Catering: ["Business Name","Location", "Cuisine Type", "Per Plate Cost", "Contact"],
    Photography: ["Studio Name","Location", "Experience (years)", "Package Price", "Contact"],
    Decoration: ["Company Name","Location", "Theme Specialty", "Budget Range", "Contact"],
    Music: ["Band/DJ Name", "Location","Genre", "Price", "Contact"],
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6 dark:text-white">
          Are you a Vendor?
        </h1>

        {isVendor === null && (
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setIsVendor(true)}
              className="px-6 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700"
            >
              YES
            </button>
            <button
              onClick={() => setIsVendor(false)}
              className="px-6 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
            >
              NO
            </button>
          </div>
        )}

        {isVendor === false && (
         navigate("/")
        )}

        {isVendor === true && (
          <div className="mt-6">
            <label className="block mb-2 text-gray-700 dark:text-gray-300">
              Select Vendor Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-lg p-2 mb-4 dark:bg-gray-700 dark:text-white"
            >
              <option value="">-- Choose a Category --</option>
              {Object.keys(categories).map((cat) => (
                <option key={cat} required value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {category && (
              <form className="space-y-4">
                {categories[category].map((field) => (
                  <div key={field}>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1">
                      {field}
                    </label>
                    <input
                      type="text"
                      name={field}
                      required
                      value={details[field] || ""}
                      onChange={handleChange}
                      placeholder={`Enter ${field}`}
                      className="w-full border rounded-lg p-2 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                ))}

                <button
                  type="submit"
                 
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Vendor;
