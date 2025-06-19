import React, { useState, useEffect } from 'react';
import axios from "axios";
import './VenuePage.css';
import Navbar from './Navbar';
import block_image from '../assets/couple.png'; // Unused but can be used for fallback

function VenuePage() {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/venues")
      .then((response) => {
        console.log("Fetched venues:", response.data); // Debug log
        setVenues(response.data);
      })
      .catch((error) => {
        console.error("Error fetching venues", error);
      });
  }, []);

  const Block = ({ image, title, rating, review, location, type, vegprice, nonvegprice, capacity, room, more }) => (
    <div className="block_material">
      <div className="img_block" style={{ backgroundImage: `url(${image})` }}></div>

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
          <div>
            <h4>Veg</h4>
            <span className="price">₹{vegprice} </span>
            <span>per plate</span>
          </div>
          <div>
            <h4> Non Veg</h4>
            <span className="price">₹{nonvegprice} </span>
            <span>per plate</span>
          </div>
        </div>

        <div className="details_4">
          <div>{capacity} <span>persons</span></div>
          <div>{room} <span>Rooms</span></div>
          <div>+{more} <span>more</span></div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="main">
        {venues.map((venue) => (
          <Block key={venue._id} {...venue} />
        ))}
      </div>
    </div>
  );
}

export default VenuePage;
