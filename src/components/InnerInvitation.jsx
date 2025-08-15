import React, { useState,useEffect } from 'react'; 
import Navbar from './Navbar';
import block_image from '../assets/couple.png';


function Venue_Detail() {
  const [phoneCode, setPhoneCode] = useState('+91'); 

  const details = {
    VenueName: 'The Royal Palace',
    address: '123 Celebration Street, Jaipur',
    VegPrice: '₹899 per plate',
    NonVegPrice: '₹1,040 per plate',
    destinationPrice: '20.00 Lakhs',
    room: '30',
    photoCount:'150',
  };

  const handleClick = () => {
    alert("Button Clicked!");
  };

  const ImageBlock = ({
    image, VenueName, address,
    VegPrice, NonVegPrice,
    destinationPrice, room,photoCount  }) => (

    <div className="content-wrapper">
      <div className="right"> 
        <div className="main_image" style={{ backgroundImage: `url(${image})` }}></div>

           <div className="info">
             <div className="photo-toolbar">
      <div className="toolbar-item">
        <i class="fa-solid fa-image"></i>
        <span>{photoCount} Photos</span>
      </div>
      <div className="divider" />
      <div className="toolbar-item">
       <i class="fa-regular fa-heart"></i>
        <span>Shortlist</span>
      </div>
      <div className="divider" />
      <div className="toolbar-item">
       <i class="fa-solid fa-star"></i>
        <span>Review</span>
      </div>
      <div className="divider" />
      <div className="toolbar-item">
        <i class="fa-solid fa-share-nodes"></i>
        <span>Share</span>
      </div>
    </div>

           </div>

           </div>
     
      <div className="detail-panel">
        <h2>{VenueName}</h2>
        <p className="address">{address}</p>
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
          <div className="dest-value">
            ₹{destinationPrice} /day for {room} rooms (incl. Rooms + 3 Meals + Venue)
          </div>
        </div>

        <div className="personal_details">
          <div className="firstline">
            <input
              type="text"
              placeholder="Full Name"
              className="custom-input"
              style={{ width: '90%' }}
            />

            <div className="phone-input-container">
              <select
                className="country-select"
                onChange={(e) => setPhoneCode(e.target.value)}
                defaultValue={phoneCode}
              >
                <option value="" disabled>Select Country</option>
                <option value="+91">India</option>
                <option value="+1">USA</option>
                <option value="+44">UK</option>
                <option value="+971">UAE</option>
                <option value="+61">Australia</option>
                <option value="+81">Japan</option>
                <option value="+49">Germany</option>

                <option value="+92">Pakistan</option>
              </select>

              <div className="code-preview">{phoneCode}</div>

              <input
                type="tel"
                className="phone-number"
                placeholder="Phone number"
              />
            </div>
          </div>
       <div className="second_line_grid">
  <input type="email" placeholder="Email Address" className="custom-input" />
  <input type="date" placeholder="Date" className="custom-input" />
  <input type="number" placeholder="No. of Rooms" className="custom-input" />
  <input type="number" placeholder="No. of Guests" className="custom-input" />
</div>

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
        photoCount={details.photoCount}
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
