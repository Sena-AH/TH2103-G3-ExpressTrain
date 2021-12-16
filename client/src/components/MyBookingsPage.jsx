import React from 'react';
import { useNavigate } from 'react-router-dom';




function MyBookingsPage() {


  let navigate = useNavigate();

  function handleClick() {
    navigate("/MyBookings2Page");
  }

  return (
    <main>
      <div>
        <h1>My Bookings</h1>
      </div>

      <div className="my-bookings-search">
        <input></input>
      </div>
      <div className="search-btn">
        <button type="button" onClick={handleClick}>My Bookings</button>
      </div>

    </main>

  );
};

export default MyBookingsPage;