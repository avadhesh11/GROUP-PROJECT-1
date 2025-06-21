import React, { useState, useEffect } from 'react';
import axios from "axios";
import './PhotographyPage.css';
import Navbar from './Navbar';
import block_image from '../assets/couple.png';

function Photography(){
 const Block = ({ image, title, rating, review, location, price, photos }) => (
    <div className="block_material">
      <div className="img_block" style={{ backgroundImage: `url(${image})` }}></div>

      <div className="photo_details">
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

        </div>
        <div className="details_3">
            <div className="Type">
             <p>(Photo+Video)</p>
             <span>₹ {price  }  per day </span>
                </div>
                <div className="photo_count">
               <i className="fas fa-image"></i>
               <p>{photos} photos</p>
                </div>
                </div>
         </div>

         </div>
       
    );
  return (
    <div>
      <Navbar />
        <div className="main_img" style={{ backgroundImage: `url(${block_image})` }}>
              <span>PHOTOGRAPHY</span>
            </div>
             <div className="main">
        <Block image={block_image} title="Jeet Royal" rating="4.5" review="12"location="Ratlam"  price="50000" photos="350" /></div>
    </div>
  );
}
export default Photography;