import React from'react';
import './VenuePage.css';
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar';
import block_image from '../assets/couple.png'

function VenuePage(){
    const Block=({image,title,address,rating,review,location,type,vegprice,nonvegprice,capacity,room,more})=>(
      <div className="block_material">
         <div className="img_block" style={{backgroundImage:`url(${image})`}}></div>

         <div className="venue_details">
            <div className="detail_1">
          <div className="title_block">{title}</div>
          <i className="fas fa-star"></i>
          <span>{rating} ({review} reviews)</span>
           </div>

        <div className="details_2">
      
        <i className="fas fa-map-marker-alt"></i>{location}
        <i className="fas fa-landmark"></i> {type}

        </div>

        <div className="details_3">
      <div>Veg ₹{vegprice} <span>per plate</span></div>
          <div>Non Veg ₹{nonvegprice} <span>per plate</span></div>
        </div>


        <div className="details_4">
          <div>{capacity}</div>
          <div>{room} <span>Rooms</span></div>
          <div>{more}<span>more</span></div>
        </div>

         </div>

         </div>
       
    );
    return(
    <div>
        <Navbar/>
        <div className="main">
            <Block image={block_image} title="Title-1"/>
        </div>
    </div>
    );
}
export default VenuePage;