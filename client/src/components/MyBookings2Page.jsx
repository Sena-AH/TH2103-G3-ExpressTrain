import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function MyBookings2Page() {
  const navigate = useNavigate();
  const [booking, setBooking] = useState("");
  const [traveller, setTraveller] = useState("");
  const [stage, setStage] = useState("");
  const [error, setError] = useState(null);
  const { state } = useLocation();
  const bookingId = state.bookingId;

  useEffect(() => {
    // Booking
    async function fetchBooking() {
       await fetch(`/api/booking/${bookingId}`)
        .then(response => {
          if (!response.ok) {
            setError(response.status);
          }
          return response.json();
        })
        .then(
          result => {
            setBooking(result);
          },
          error => {
            setError(error);
          }
        );
    }

    async function fetchTraveller() {
      await fetch(`/api/Traveller/${booking.TravellerId}`)
        .then(response => {
          if (!response.ok) {
            setError(response.status);
          }
          return response.json();
        })
        .then(
          result => {
            setTraveller(result);
          },
          error => {
            setError(error);
          }
        );
    }

    async function fetchScheduleStages() {
      await fetch(`/api/schedulestage/booking/${bookingId}`)
        .then(response => {
          if (!response.ok) {
            setError(response.status);
          }
          return response.json();
        })
        .then(
          result => {
            setStage(result);
          },
          error => {
            setError(error);
          }
        );
      console.log(stage);
      console.log(error);
    }

    fetchBooking();
    if (booking !== "") {
      fetchTraveller();
      fetchScheduleStages();
    }
    
  }, [bookingId]);

  // console.log(booking);
  // console.log(error);

  function handleClick() {
    navigate("/MyBookings3Page");
  }
  
  // async function getData() {
  //   const responsce = await fetch(`/api/traveller/${data[TravellerId]}`)
  // }

  function Itinerary() {

  }

  function Booking() {
    return (
      <>
        <div>
          <h1>Min bokning</h1>
        </div>

        <div>

          <h2>Boking ID: {bookingId}</h2>

          <p>
          Travel Date:
          xx-xx-xx
          </p>

          <p>Itinerary:
          xxxxxxxxxxx - xxxxxxxxxx (xx:xx - xx:xx) - Platform: xx - Seat: xx
          xxxxxxxxxxx - xxxxxxxxxx (xx:xx - xx:xx) - Platform: xx - Seat: xx
          xxxxxxxxxxx - xxxxxxxxxx (xx:xx - xx:xx) - Platform: xx - Seat: xx

          Name:
          {traveller.FirstName} {traveller.LastName}

          Email:
          {traveller.Email}

          Phone number:
          {traveller.PhoneNumber}

          Total price:
          {booking.Price} kr</p>
        </div>
        <div className="search-btn">
          <button type="button" onClick={handleClick}>Cancel Booking</button>
        </div>
      </>
    );
  }

  // if we get error then it goes here, its not checking a specific thing at the moment.
  function Error() {
    return(
      <>
        <div>
          Seems like something went wrong! (Error: {error})
        </div>
      </>
    );
  }

  return (
    <main>
      { error ? <Error /> : <Booking /> }
    </main>    
  );
};

export default MyBookings2Page;