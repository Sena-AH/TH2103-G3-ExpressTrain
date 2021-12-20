import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MyBookings2Page() {
  const [bookingCodeId] = useState("");

  //let bookingData = {BookingCodeId, UserId, Price};
  // might not need
  //let scheduleStageData = {ScheduleId, SeatNumber, BookingId};

  async function getData() {
    const response = await fetch(`/api/booking/${bookingCodeId}`);
    const data = await response.json();
    console.log(data);

    // console.log(data[BookingCodeId]);        
  }

  let navigate = useNavigate();

  function handleClick() {
    navigate("/MyBookings3Page");
  }

  return (
    <main>
      <div>
        <h1>Min bokning</h1>
      </div>

      <div>

        <h2>Boking ID: {bookingCodeId}</h2>

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