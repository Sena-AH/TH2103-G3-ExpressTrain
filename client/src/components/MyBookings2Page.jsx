import React from 'react';
import { useNavigate } from 'react-router-dom';


function MyBookings2Page() {

  let navigate = useNavigate();

  function handleClick() {
    navigate("/MyBookings3Page");
  }


  return (
    <main>
      <div>
        <h1>My Bookings</h1>
      </div>

      <div>

        <h2>Booking ID: XXXXXXX</h2>

        <p>Departure location:
        xxxxxxxxxxx - xxxxxxxxxx

        Departure time and date:
        xx-xx-xx xx:xx

        Seat number: xx

        Name:
        xxxx xxxxxx

        Email:
        xxxx@xxxx.xx

        Phone number:
        xxx xxx xxxx

        Total price:
        xxxx kr</p>
      </div>
      <div className="search-btn">
        <button type="button" onClick={handleClick}>Cancel Booking</button>
      </div>

    </main>

  );
};

export default MyBookings2Page;