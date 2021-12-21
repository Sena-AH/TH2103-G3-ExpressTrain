import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MyBookingsPage() {
  let navigate = useNavigate();
  const [formData, updateFormData] = useState({
    bookingId: ""
  });

  function handelChange(event) {
    updateFormData({
      ...formData,
      [event.target.name]: event.target.value.trim()
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    navigate('/MyBookings2Page', { state: formData });
  }

  return (
    <main>
      <div>
        <div>
          <h1 class="page-title">Mina bokningar</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="my-bookings-search">
            {/* <input type="number" min="0"  name="bookingId" class="search-bar" placeholder="Bokningsnummer"></input> */}
            <input placeholder="Bokningsnummer" min="0" name="bookingId" value={formData.bookingId} onChange={handelChange}/>
          </div>
          <div className="search-btn">
            {/* <button type="submit" value="Submit" onClick={handleClick}>Sök</button> */}
            <input type="submit" value="My Bookings"/>
          </div>
        </form>    
      </div>
    </main>
  );
};

export default MyBookingsPage;