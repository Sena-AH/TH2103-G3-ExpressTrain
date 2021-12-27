import React from 'react';
import { useNavigate } from 'react-router-dom';
//import '../css/myBookings3Page.css';


function MyBookings3Page() {

  let navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }


  return (
    <main>
      <div>
        <h1>My Bookings</h1>
      </div>

      
        
      <div>
      <p>
        Booking ID: XXXXXXX
        is now cancelled
        
        Hope to see you again :)
      </p>
      </div>
      <div className="search-btn">
        <button type="button" onClick={handleClick}>Back to Start</button>
      </div>

    </main>

  );
};

export default MyBookings3Page;