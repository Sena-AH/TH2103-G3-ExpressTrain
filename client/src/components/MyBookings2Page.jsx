import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import '../css/myBookings2Page.css'; 

function MyBookings2Page() {
  const navigate = useNavigate();
  const {state} = useLocation();
  const bookingId = state.bookingId;

  const [booking, setBooking] = useState([]);
  const [traveller, setTraveller] = useState([]);
  const [stages, setStages] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [stations, setStations] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      setBooking(await fetchBooking());
    })();
  }, [bookingId]);

  useEffect(() => {
    if (!isObjLoaded(booking)) return;
    (async () => {
      setTraveller(await fetchTraveller(booking.TravellerId));
    })();
  }, [booking]);

  useEffect(() => {
    if (!isObjLoaded(traveller)) return;
    (async () => {
      setStages(await fetchStages());
    })();
  }, [traveller]);

  useEffect(() => {
    if (!isObjLoaded(stages)) return;
    (async () => {
      setSchedules(await fetchSchedules(stages));
    })();
  }, [stages]);

  useEffect(() => {
    if (!isObjLoaded(schedules)) return;
    (async () => {
      setStations(await fetchStations(schedules));
      setPlatforms(await fetchPlatforms(schedules));
    })();
  }, [schedules]);

  function isObjLoaded(state) {
    return !(Object.keys(state).length === 0);
  }

  function handleClick() {
    navigate("/MyBookings3Page");
  }

  async function fetchBooking() {
    return await fetchUrl(`/api/booking/${bookingId}`, 'booking');
  }

  async function fetchTraveller(id) {
    return await fetchUrl(`/api/Traveller/${id}`, 'traveller');
  }

  async function fetchStages() {
    return await fetchUrl(`/api/ScheduleStage/booking/${bookingId}`, 'stages');
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
      if (!(departureStationId in stations)) {
        const departureStation = await fetchUrl(`/api/TrainStation/${departureStationId}`, 'stations');
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

  async function fetchUrl(url, errorMessage = 'unknown') {
    return await fetch(url)
      .then(response => {
        if (!response.ok) {
          setError(`${response.status} (${errorMessage})`);
        }
        return response.json();
      })
      .then(result => {
        return result;
      }, error => {
        // setError(`${error} (${errorMessage})`);
      });
  }

  function Itinerary() {
    let itineraries = [];
    for (let i = 0; i < schedules.length; i++) {
      const schedule = schedules[i];
      let departureStation = stations[schedule.DepartureTrainStationId].Name ?? 'unknown';
      let destinationStation = stations[schedule.DestinationTrainStationId].Name ?? 'unknown';
      let departurePlatform = platforms[schedule.DeparturePlatformId].Name ?? 'unknown';
      let departureDate = formatDate(schedule.DepartureTime);
      let departureTime = formatTime(schedule.DepartureTime);
      let arrivalTime = formatTime(schedule.ArrivalTime);
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
    const [day, month, year] = [to2Digits(date.getDate()), to2Digits(date.getMonth()), date.getFullYear()];
    return `${year}-${month}-${day}`;
  }

  function formatTime(date) {
    const [hour, minutes] = [to2Digits(date.getHours()), to2Digits(date.getMinutes())];
    return `${hour}:${minutes}`;
  }

  function to2Digits(value) {
    return ("0" + value).slice(-2);
  }

  function Booking() {
    // if (!isObjLoaded(platforms)) {
    //   return(<div>Laddar bokning...</div>);
    // }
    const travelDate = isObjLoaded(schedules) ? formatDate((schedules[0].DepartureTime)) : 'loading...';
    return (<>
      <div>
        <h1>Min bokning</h1>
      </div>
      <div>
        <h3>Boking ID: {bookingId}</h3>

        <div className="travel-date">
          <br/>
          <div className="travel-date-title">Resdatum:</div>
          <div className="travel-date-result">{travelDate}</div>
        </div>

        <div className="itinerary">
          <br/>
          <div className="itinerary-title">Resväg:</div>
          {itineraryIsLoaded() ? <Itinerary/> : 'loading...'}
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
        <button type="button" onClick={handleClick}>Avboka bokningen</button>
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

  return (<main>
    {error ? <Error/> : <Booking/>}
  </main>);
}

export default MyBookings2Page;