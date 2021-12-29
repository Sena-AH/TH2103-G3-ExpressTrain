import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import '../css/myBookings2Page.css';

function MyBookings2Page() {
  const navigate = useNavigate();
  // useLocation holds several items, we grab the {state} and then we can access it by state.bookingCode
  const {state} = useLocation();
  const bookingCode = state.bookingCode;

  const [booking, setBooking] = useState([]);
  const [traveller, setTraveller] = useState([]);
  const [stages, setStages] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [stations, setStations] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [error, setError] = useState(null);
  const [bookingDeleted, setBookingDeleted] = useState(false);

  // using hooks, trying to prevent the code running a million times. we use the hook so if the bookingCode changes then it will run the code(setbooking)
  useEffect(() => {
    console.clear();
    if(!bookingCode) return;
    (async () => {
      setBooking(await fetchBooking());
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingCode]);

  useEffect(() => {
    if (!isObjLoaded(booking)) return;
    (async () => {
      setTraveller(await fetchTraveller(booking.TravellerId));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booking]);

  useEffect(() => {
    if (!isObjLoaded(traveller)) return;
    (async () => {
      setStages(await fetchStages());
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [traveller]);

  useEffect(() => {
    if (!isObjLoaded(stages)) return;
    (async () => {
      setSchedules(await fetchSchedules(stages));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stages]);

  useEffect(() => {
    if (!isObjLoaded(schedules)) return;
    (async () => {
      setStations(await fetchStations(schedules));
      setPlatforms(await fetchPlatforms(schedules));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedules]);

  // if its empty then it doesnt get loaded.
  function isObjLoaded(state) {
    return !(Object.keys(state).length === 0);
  }

  function handleClick(event) {
    if (event.target.id === 'cancel-booking-btn') {
      deleteBooking();
      if (error === null) {
        setBookingDeleted(true);
      }
    }
    if (event.target.id === 'home-page-btn') {
      navigate('/');
    }
  }

  async function deleteBooking() {
    return await deleteUrl(`/api/Booking/${booking.Id}`, "Couldn't delete booking.", 'delete');
  }

  async function fetchBooking() {
    return await fetchUrl(`/api/Booking/BookingCode/${bookingCode}`, 'booking');
  }

  async function fetchTraveller(id) {
    return await fetchUrl(`/api/Traveller/${id}`, 'traveller');
  }

  async function fetchStages() {
    return await fetchUrl(`/api/ScheduleStage/Booking/${booking.Id}`, 'stages');
  }

  async function fetchSchedules(stages) {
    let schedules = [];
    for (const stage of stages) {
      const schedule = await fetchUrl(`/api/Schedule/${stage.ScheduleId}`, 'schedules');
      schedule.DepartureTime = new Date(schedule.DepartureTime);
      schedule.ArrivalTime = new Date(schedule.ArrivalTime);
      schedules.push(schedule);
    }
    return schedules;
  }

  async function fetchStations(schedules) {
    let stations = {};
    for (const schedule of schedules) {
      const departureStationId = schedule.DepartureTrainStationId;
      // we only add it to the dictionary if it is missing to avoid duplicate api calls.
      if (!(departureStationId in stations)) {
        const departureStation = await fetchUrl(`/api/TrainStation/${departureStationId}`, 'stations');
        //         key                        value
        stations[departureStation.Id] = departureStation;
      }
      const destinationStationId = schedule.DestinationTrainStationId;
      if (!(destinationStationId in stations)) {
        const destinationStation = await fetchUrl(`/api/TrainStation/${destinationStationId}`, 'stations');
        stations[destinationStation.Id] = destinationStation;
      }
    }
    return stations;
  }

  async function fetchPlatforms(schedules) {
    let platforms = {};
    for (const schedule of schedules) {
      const platformId = schedule.DeparturePlatformId;
      if (!(platformId in platforms)) {
        const platform = await fetchUrl(`/api/TrainStationPlatform/${platformId}`, 'platforms');
        platforms[platform.Id] = platform;
      }
    }
    return platforms;
  }
  async function fetchUrl(url, errorMessage = 'unknown', method = 'GET') {
    return await fetch(url, {
      method: method
    })
      .then(response => {
        if (!response.ok) {
          // error 404 etc
          setError(`${response.status} (${errorMessage})`);
        }
        return response.json();
      })
      .then(result => {
        return result;
      }, error => {
        // more developer errors
        // setError(`${error} (${errorMessage})`);
      });
  }

  async function deleteUrl(url, errorMessage = 'unknown') {
    return fetchUrl(url, errorMessage, 'DELETE');
  }

  function Itinerary() {
    let itineraries = [];
    for (let i = 0; i < schedules.length; i++) {
      const schedule = schedules[i];
      // if its null then return 'unknown'
      let departureStation = stations[schedule.DepartureTrainStationId].Name ?? 'unknown';
      let destinationStation = stations[schedule.DestinationTrainStationId].Name ?? 'unknown';
      let departurePlatform = platforms[schedule.DeparturePlatformId].Name ?? 'unknown';
      let departureDate = formatDate(schedule.DepartureTime) ?? 'unknown';
      let departureTime = formatTime(schedule.DepartureTime) ?? 'unknown';
      let arrivalTime = formatTime(schedule.ArrivalTime) ?? 'unknown';
      let seat = stages[i].SeatNumber ?? 'unknown';

      itineraries.push(<div key={schedule.Id} className="itinerary-result">
        {departureDate}<br/>
        {departureTime} - {departureStation} (Platform {departurePlatform} - Seat {seat})<br/>
        {arrivalTime} - {destinationStation} (Platform {departurePlatform} - Seat {seat})
      </div>);
    }
    return itineraries;
  }

  function itineraryIsLoaded() {
    return (isObjLoaded(stations) && isObjLoaded(platforms));
  }

  function formatDate(date) {
    const [day, month, year] = [to2Digits(date.getDate()), to2Digits(date.getMonth() + 1), date.getFullYear()];
    return `${year}-${month}-${day}`;
  }

  function formatTime(date) {
    const [hour, minutes] = [to2Digits(date.getHours()), to2Digits(date.getMinutes())];
    return `${hour}:${minutes}`;
  }

  function to2Digits(value) {
    // making sure that the time has a 0, so if AM, then 02, but because maybe minutes has 12 it would try to add a 0, so the slice removes that 0. 012 => 12
    return ("0" + value).slice(-2);
  }

  function Booking() {
    const travelDate = isObjLoaded(schedules) ? formatDate((schedules[0].DepartureTime)) : 'laddar...';
    return (<>
      <div>
        <h1>Min bokning</h1>
      </div>
      <div>
        <h3>Boking Code: {bookingCode}</h3>

        <div className="travel-date">
          <br/>
          <div className="travel-date-title">Resdatum:</div>
          <div className="travel-date-result">{travelDate}</div>
        </div>

        <div className="itinerary">
          <br/>
          <div className="itinerary-title">Resväg:</div>
          {itineraryIsLoaded() ? <Itinerary /> : 'laddar...'}
        </div>

        <div className="name">
          <br/>
          <div className="name-title">Namn:</div>
          <div className="name-result">{traveller.FirstName} {traveller.LastName}</div>
        </div>

        <div className="email">
          <br/>
          <div className="email-title">E-post:</div>
          <div className="email-result">{traveller.Email}</div>
        </div>

        <div className="phoneNumber">
          <br/>
          <div className="phoneNumber-title">Telefonnummer:</div>
          <div className="phoneNumber-result">{traveller.PhoneNumber}</div>
        </div>

        <div className="price">
          <br/>
          <div className="price-title">Totalbelopp:</div>
          <div className="price-result">{booking.Price} kr</div>
        </div>
      </div>

      <div className="search-btn">
        <button type="button" id="cancel-booking-btn" onClick={handleClick}>Avboka bokningen</button>
      </div>
    </>);
  }

  // if we get error then it goes here, it's not checking a specific thing at the moment.
  function Error() {
    return (<>
      <div>
        Seems like something went wrong!<br/>
        Error: {error}
      </div>
    </>);
  }

  function DeleteBookingConfirmation() {
    return (
      <>
        <div>
        <p>
          Din bokning är nu avbokad
        </p>
        </div>
        <div className="search-btn">
          <button type="button" id="home-page-btn" onClick={handleClick}>Back to Start</button>
        </div>
      </>
    )
  }

  function MainContent() {
    if (!bookingCode || error) return <Error />;
    if (bookingDeleted) return <DeleteBookingConfirmation />;
    return <Booking/>;
  }

  return (
  <main>
    <MainContent />
    {/* {error ? <Error/> : bookingDeleted ? <DeleteBookingConfirmation /> : <Booking/>} */}
  </main>);
}

export default MyBookings2Page;