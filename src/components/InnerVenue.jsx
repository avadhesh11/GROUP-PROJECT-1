import React from 'react';
import './InnerVenue.css';
import Navbar from './Navbar';
import block_image from '../assets/couple.png';

function Venue_Detail() {
  const details = {
    VenueName: 'The Royal Palace',
    address: '123 Celebration Street, Jaipur',
    VegPrice: '₹899 per plate',
    NonVegPrice: '₹1,040 per plate',
    destinationPrice: '20.00 Lakhs ',
    room:'30',

  };

  const handleClick = () => {
    alert("Button Clicked!");
  };

  const ImageBlock = ({ image, VenueName, address, VegPrice, NonVegPrice, destinationPrice,room }) => (
    <div className="content-wrapper">
      <div
        className="main_image"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="detail-panel">
        <h2>{VenueName}</h2>
        <p className="address">{address}</p>
      <hr></hr>
        <div className="pricing-section">
          <h3>Local Price</h3>
          <div className="price-line">
            <span className="veg">{VegPrice}</span>
            <span className="label">Veg price</span>
          </div>
          <div className="price-line">
            <span className="nonveg">{NonVegPrice}</span>
            <span className="label">Non Veg price</span>
          </div>
        </div>
        <div className="destination-price">
          <h4>Destination Price</h4>
          <div className="dest-value">₹{destinationPrice} /day for {room} rooms (incl. Rooms + 3 Meals + Venue)</div>
       
        </div>
        <div className="personal_details">
          
        </div>
        <div className="actions">
          <button className="btn message" onClick={handleClick}>Send Message</button>
          <button className="btn contact" onClick={handleClick}>Contact</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="Venue_Detail">
      <Navbar />
      <ImageBlock
        image={block_image}
        VenueName={details.VenueName}
        address={details.address}
        VegPrice={details.VegPrice}
        NonVegPrice={details.NonVegPrice}
        destinationPrice={details.destinationPrice}
      room={details.room}
      />
    </div>
  );
}

export default Venue_Detail;
