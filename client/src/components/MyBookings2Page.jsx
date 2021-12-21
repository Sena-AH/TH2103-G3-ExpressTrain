import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function MyBookings2Page() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const bookingId = state.bookingId;

  const [booking, setBooking] = useState("");
  const [traveller, setTraveller] = useState("");
  const [stages, setStages] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
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
            setStages(result);
          },
          error => {
            setError(error);
          }
        );
    }

    async function fetchSchedule(id) {
      await fetch('/api/Schedule/' + id)
        .then(response => {
          if (!response.ok) {
            setError(response.status);
          }
          return response.json();
        })
        .then(
          result => {
            // setSchedules({
            //   ...schedules,
            //   [result.Id]: result
            // });
            setSchedules(schedules => [...schedules, result])
          },
          error => {
            setError(error);
          }
        );
    }

    if (booking === "") {
      fetchBooking();
    }
    if ((booking !== "") && (traveller === "")) {
      fetchTraveller();
    }
    if ((traveller !== "") && (stages === "")) {
      fetchScheduleStages();
    }
    if ((stages !== "") && (schedules.length === 0)) {
      console.log("stages amount: " + stages.length);
      stages.forEach(stage => {
        fetchSchedule(stage.ScheduleId);
      });
    }

  }, [bookingId, booking, traveller, stages, schedules]);

  function handleClick() {
    navigate("/MyBookings3Page");
  }
  
  function Itinerary(props) {
    let itineraries = [<div className="itenerary-result">xxxxxxxxxxx - xxxxxxxxxx (xx:xx - xx:xx) - Platform: xx - Seat: xx</div>];
    // stages.forEach(element => {
    //   itineraries.push(<div className="itenerary-result">xxxxxxxxxxx - xxxxxxxxxx (xx:xx - xx:xx) - Platform: xx - Seat: xx</div>);
    // });
    return itineraries;
  }

  function Booking() {
    return (
      <>
        <div>
          <h1>Min bokning</h1>
        </div>

        <div>

          <h3>Boking ID: {bookingId}</h3>

          <div className="travel-date">
            <br></br>
            <div className="travel-date-title">Travel Date:</div>
            <div className="travel-date-result">xx-xx-xx</div>
          </div>
          
          <div className="itenerary">
            <br></br>
            <div className="itenerary-title">Itinerary:</div>
            <Itinerary />
            <div className="itenerary-result">xxxxxxxxxxx - xxxxxxxxxx (xx:xx - xx:xx) - Platform: xx - Seat: xx</div>
            <div className="itenerary-result">xxxxxxxxxxx - xxxxxxxxxx (xx:xx - xx:xx) - Platform: xx - Seat: xx</div>
            <div className="itenerary-result">xxxxxxxxxxx - xxxxxxxxxx (xx:xx - xx:xx) - Platform: xx - Seat: xx</div>
            <div className="itenerary-result">xxxxxxxxxxx - xxxxxxxxxx (xx:xx - xx:xx) - Platform: xx - Seat: xx</div>
          </div>

          <div className="name">
            <br></br>
            <div className="name-title">Name:</div>
            <div className="name-result">{traveller.FirstName} {traveller.LastName}</div>
          </div>
          
          <div className="email">
            <br></br>
            <div className="email-title">Email:</div>
            <div className="email-result">{traveller.Email}</div>
          </div>

          <div className="phoneNumber">
            <br></br>
            <div className="phoneNumber-title">Phone number:</div>
            <div className="phoneNumber-result">{traveller.PhoneNumber}</div>
          </div>

          <div className="price">
            <br></br>
            <div className="price-title">Total price:</div>
            <div className="price-result">{booking.Price} kr</div>
          </div>
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