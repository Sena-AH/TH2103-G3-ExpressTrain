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
  const [trainStations, setTrainStations] = useState([]);
  const [error, setError] = useState(null);

  var bookingCache = "";
  var travellerCache = "";
  var stagesCache = "";
  var schedulesCache = [];
  var trainStationsCache = [];

  useEffect(() => {
    async function fetchBooking(id) {
      return await fetch(`/api/booking/${id}`)
        .then(response => response.json());
    }

    async function fetchTraveller(id) {
      return await fetch(`/api/Traveller/${id}`)
      .then(response => response.json());
    }

    async function fetchScheduleStages(bookingId) {
      return await fetch(`/api/schedulestage/booking/${bookingId}`)
      .then(response => response.json());
    }

    async function fetchSchedules(stages) {
      for (let i = 0; i < stages.length; i++) {
        const stage = stages[i];
        let result = await fetch(`/api/Schedule/${stage.ScheduleId}`)
          .then(response => response.json());
        setSchedules(schedules => [...schedules, result])
      }
    }
    
    async function fetchTrainStations(schedule) {
      // return await fetch(`/api/TrainStation/{id}`)
      // .then(response => response.json())
    }

    (async () => {
      bookingCache = await fetchBooking(bookingId);
      setBooking(bookingCache);

      travellerCache = await fetchTraveller(bookingCache.TravellerId);
      setTraveller(travellerCache);

      stagesCache = await fetchScheduleStages(bookingId);
      setStages(stagesCache);

      await fetchSchedules(stagesCache);
      
      trainStationsCache = await fetchTrainStations();
    })();

    // if ((stages !== "") && (schedules.length === 0)) {
    //   stages.forEach(stage => {
    //     fetchSchedule(stage.ScheduleId);
    //   });
    // }
    // if ((schedules.length > 0) && (Object.keys(trainStations).length === 0)) {
    //   schedules.forEach(schedule => {
    //     fetchTrainStation(schedule.DepartureTrainStationId);
    //     fetchTrainStation(schedule.DestinationTrainStationId);
    //   });
    // }

    // async function fetchBookingOld() {
    //   await fetch(`/api/booking/${bookingId}`)
    //     .then(response => {
    //       if (!response.ok) {
    //         setError(response.status);
    //       }
    //       return response.json();
    //     })
    //     .then(
    //       result => {
    //         setBooking(result);
    //       },
    //       error => {
    //         setError(error);
    //       }
    //     );
    // }

    // async function fetchTravellerOld() {
    //   await fetch(`/api/Traveller/${booking.TravellerId}`)
    //     .then(response => {
    //       if (!response.ok) {
    //         setError(response.status);
    //       }
    //       return response.json();
    //     })
    //     .then(
    //       result => {
    //         setTraveller(result);
    //       },
    //       error => {
    //         setError(error);
    //       }
    //     );
    // }

    // async function fetchScheduleStagesOld() {
    //   await fetch(`/api/schedulestage/booking/${bookingId}`)
    //     .then(response => {
    //       if (!response.ok) {
    //         setError(response.status);
    //       }
    //       return response.json();
    //     })
    //     .then(
    //       result => {
    //         setStages(result);
    //       },
    //       error => {
    //         setError(error);
    //       }
    //     );
    // }

    // async function fetchScheduleOld(id) {
    //   await fetch('/api/Schedule/' + id)
    //     .then(response => {
    //       if (!response.ok) {
    //         setError(response.status);
    //       }
    //       return response.json();
    //     })
    //     .then(
    //       result => {
    //         setSchedules(schedules => [...schedules, result])
    //       },
    //       error => {
    //         setError(error);
    //       }
    //     );
    // }

    // async function fetchTrainStation(id) {
    //   await fetch('/api/TrainStation/' + id)
    //     .then(response => {
    //       if (!response.ok) {
    //         setError(response.status);
    //       }
    //       return response.json();
    //     })
    //     .then(
    //       result => {
    //         // setTrainStations(trainStations => ({...trainStations, result}))
    //         if (!(result.Id in trainStations)) {
    //           setTrainStations(trainStations => ({
    //             ...trainStations,
    //             [result.Id]: result
    //           }));
    //         }
    //       },
    //       error => {
    //         setError(error);
    //       }
    //     );
    // }

    // if (booking === "") {
    //   fetchBooking();
    // }
    // if ((booking !== "") && (traveller === "")) {
    //   fetchTraveller();
    // }
    // if ((traveller !== "") && (stages === "")) {
    //   fetchScheduleStages();
    // }
    // if ((stages !== "") && (schedules.length === 0)) {
    //   stages.forEach(stage => {
    //     fetchSchedule(stage.ScheduleId);
    //   });
    // }
    // if ((schedules.length > 0) && (Object.keys(trainStations).length === 0)) {
    //   schedules.forEach(schedule => {
    //     fetchTrainStation(schedule.DepartureTrainStationId);
    //     fetchTrainStation(schedule.DestinationTrainStationId);
    //   });
    // }

  }, [bookingId]); //[bookingId, booking, traveller, stages, schedules, trainStations]);

  function handleClick() {
    navigate("/MyBookings3Page");
  }
  
  function Itinerary() {
    let itineraries = [];
    if (schedules.length > 0) {
      for (let index = 0; index < schedules.length; index++) {
        const schedule = schedules[index];
        const seatNumber = stages[index].SeatNumber;
        itineraries.push(<div key={index} className="itenerary-result">{schedule.DepartureTrainStationId} - {schedule.DestinationTrainStationId} ({schedule.DepartureTime} - {schedule.ArrivalTime}) - Platform: {schedule.DeparturePlatformId} - Seat: {seatNumber}</div>);
      }
    }
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
            <div className="travel-date-title">Resdag:</div>
            <div className="travel-date-result">xxx</div>
          </div>
          
          <div className="itenerary">
            <br></br>
            <div className="itenerary-title">Resväg:</div>
            <Itinerary />
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