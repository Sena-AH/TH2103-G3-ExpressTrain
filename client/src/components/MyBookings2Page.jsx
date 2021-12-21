// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import {useLocation, useNavigate} from 'react-router-dom';

// function MyBookings2Page() {
//   const [bookingCodeId] = useState("");

function MyBookings2Page(props) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const bookingId = state.bookingId;

  console.log(props);

  function handleClick() {
    navigate("/MyBookings3Page");
  }

  // async function getData() {
  //   const response = await fetch(`/api/booking/${bookingCodeId}`);
  //   const data = await response.json();
  //   console.log(data);

  // console.log(data[BookingCodeId]);        
  //}

  //let navigate = useNavigate();

  return (
    <main>
      <div>
        <h1>Min bokning</h1>
      </div>

      <div>

        <h2>Boking ID: {bookingId}</h2>

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