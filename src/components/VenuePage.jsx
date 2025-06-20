import React from'react';
import {userState} from 'react';
import './VenuePage.css';
import Navbar from './Navbar';
import block_image from '../assets/couple.png'

function VenuePage(){
    const Block=({image,title,rating,review,location,type,vegprice,nonvegprice,capacity,room,more})=>(
      <div className="block_material">
         <div className="img_block" style={{backgroundImage:`url(${image})`}}></div>

         <div className="venue_details">
            <div className="detail_1">
          <div className="title_block">{title}</div>
          <i className="fas fa-star"></i>
          <span>{rating} ({review} reviews)</span>
           </div>

        <div className="details_2">
  <div className="truncate-inline">
    <i className="fas fa-map-marker-alt"></i>
    <span>{location}</span>
  </div>
  
  <div className="truncate-inline">
    <i className="fas fa-landmark"></i>
    <span>{type}</span>
  </div>

        </div>

        <div className="details_3">
      <div><h4>Veg</h4> <span className="price">₹{vegprice} </span><span>per plate</span></div>
          <div><h4> Non Veg</h4><span className="price">₹{nonvegprice} </span> <span>per plate</span></div>
        </div>


        <div className="details_4">
          <div>{capacity} <span>persons</span></div>
          <div>{room} <span>Rooms</span></div>
          <div> +{more} <span>more</span></div>
        </div>

         </div>

         </div>
       
    );
    return(
    <div>
        <Navbar/>
        <div className="main" /*just taking example i will make the function tommorow*/>
               <Block image={block_image} title="Title-1" rating="4.5" review="12" location="487,Tata Nagar, DindayalNagar Delhi" type="hotel ,2 BHK room " vegprice="400" nonvegprice="1000" capacity="2000" room="50" more="4"/>
            <Block image={block_image} title="Title-1" rating="4.5" review="12" location="Delhi" type="hotel" vegprice="400" nonvegprice="1000" capacity="2000" room="50" more="4"/>

            <Block image={block_image} title="Title-1" rating="4.5" review="12" location="Delhi" type="hotel" vegprice="400" nonvegprice="1000" capacity="2000" room="50" more="4"/>
        </div>
    </div>
    );
}
export default VenuePage;