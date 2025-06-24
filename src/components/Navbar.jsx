import {React,useState,useEffect} from 'react';
import './Navbar.css';
import axios from 'axios';
function Navbar() {
  const [open,setopen]=useState(false);
  const hamburger=()=>{
    setopen(!open);
  }
const [categories, setCategories] = useState([]);

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

  const Categories_card = ({ image, title }) => (
    <div style={{width:"90%",height:"5%", gap:"1%"}}  className="card">
      <div className="card_text">{title}</div>
      <div className="card_image">
        <img src={image} alt={title} />
      </div>
    </div>
  );
  return (
    <div className="nav_header">
      <div className="hamburger" onClick={hamburger}>
     <i className="fas fa-bars"></i>
     </div>
     {open && (
      <div className="dropdown-menu">
       <div className="categories_sections">
          {categories.map((category) => (
            <Categories_card key={category._id} {...category} />
          ))}
        </div>
       </div>
     )
     }
      <div className="logo">LOGO</div>
        <i className="fas fa-search"></i>
    </div>
  );
}

export default Navbar;
