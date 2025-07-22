import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import block_image from '../assets/couple.png'; 
import './Invitation.css';

function Invite() {
  const [invites, setInvites] = useState([]);
  useEffect(() => {
    const sampleData = [
      { name: 'Elegant Gold', image: block_image },
      { name: 'Floral Charm', image: block_image },
      { name: 'Classic White', image: block_image },
      { name: 'Royal Red', image: block_image }
    ];
    setInvites(sampleData);
  }, []);

  const Cards = ({ image, name }) => (
    <div className="invite-card">
      <div className="cards_image" style={{ backgroundImage: `url(${image})` }}></div>
         <p className="card_name">{name}</p>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="invite-wrapper">
        <h2 className="invite-title">Wedding Invitations <span className="count">(152 Designs)</span></h2>
        <div className="card-container">
          {invites.map((item, index) => (
            <Cards key={index} image={item.image} name={item.name} />
          ))}
        </div>
        <div className="view-all">
          <button>View All ➤</button>
        </div>
          <h2 className="invite-title">Video Invitations <span className="count">(172 Designs)</span></h2>
        <div className="card-container">
          {invites.map((item, index) => (
            <Cards key={index} image={item.image} name={item.name} />
          ))}
        </div>
        <div className="view-all">
          <button>View All ➤</button>
        </div>
        <h2 className="invite-title">Save the Date<span className="count">(127 Designs)</span></h2>
        <div className="card-container">
          {invites.map((item, index) => (
            <Cards key={index} image={item.image} name={item.name} />
          ))}
        </div>
        <div className="view-all">
          <button>View All ➤</button>
        </div>
      </div>
    </>
  );
}

export default Invite;
