import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../css/myBookingsPage.css";
import "../css/myBookings2Page.css";

function Booking(props) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const bookingCode = props.bookingCode ?? state.bookingCode;

  const [booking, setBooking] = useState([]);
  const [error, setError] = useState(null);
  const [isBookingDeleted, setIsBookingDeleted] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(true);
  const [isManipulationCodeRequired, setIsManipulationCodeRequired] = useState(null);
  const [manipulationCode, setManipulationCode] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [stages, setStages] = useState([]);
  const [stations, setStations] = useState([]);
  const [traveller, setTraveller] = useState([]);

  useEffect(() => {
    if (!bookingCode) {
      setError("Booking Code missing.");
      return;
    }

    (async () => {
      const booking = await fetchBooking();
      const stages = await fetchStages(booking.Id);
      const schedules = await fetchSchedules(stages);
      const [traveller, stations, platforms] = await Promise.all([
        await fetchTraveller(booking.TravellerId),
        await fetchStations(schedules),
        await fetchPlatforms(schedules),
      ]);

      setBooking(booking);
      setTraveller(traveller);
      setStages(stages);
      setSchedules(schedules);
      setStations(stations);
      setPlatforms(platforms);
    })();
  }, [bookingCode]);

  async function deleteBooking() {
    return await fetchDelete(`/api/Booking/${booking.Id}`, {
      ManipulationCode: manipulationCode,
    });
  }

  async function fetchBooking() {
    return await fetchUrl(`/api/Booking/BookingCode/${bookingCode}`);
  }

  async function fetchTraveller(id) {
    return await fetchUrl(`/api/Traveller/${id}`);
  }

  async function fetchStages(bookingId) {
    return await fetchUrl(`/api/ScheduleStage/Booking/${bookingId}`);
  }

  async function fetchSchedules(stages) {
    const schedulesPromises = stages.map(async (stage) => {
      const schedule = await fetchUrl(`/api/Schedule/${stage.ScheduleId}`);
      schedule.DepartureTime = new Date(schedule.DepartureTime);
      schedule.ArrivalTime = new Date(schedule.ArrivalTime);
      return schedule;
    });

    const allSchedules = await Promise.all(schedulesPromises);

    let schedules = [];
    
    for (let i = 0; i < allSchedules.length; i++) {
      const schedule = allSchedules[i];
      
      if(!(schedules.some(x => schedule.Id == x.Id))){
        schedules.push(schedule);
      }
    }

    return schedules;
  }

  async function fetchStations(schedules) {
    const stationsPromises = schedules.map(async (schedule) => {
      return await Promise.all([
        await fetchUrl(`/api/TrainStation/${schedule.DepartureTrainStationId}`),
        await fetchUrl(
          `/api/TrainStation/${schedule.DestinationTrainStationId}`
        ),
      ]);
    });
    const unorderedStations = [].concat.apply(
      [],
      await Promise.all(stationsPromises)
    );

    let stations = {};
    for (const station of unorderedStations) {
      if (!(station.Id in stations)) {
        stations[station.Id] = station;
      }
    }

    return stations;
  }

  async function fetchPlatforms(schedules) {
    const platformPromises = schedules.map(async (schedule) => {
      return await fetchUrl(
        `/api/TrainStationPlatform/${schedule.DeparturePlatformId}`
      );
    });
    const unorderedPlatforms = await Promise.all(platformPromises);

    let platforms = {};
    for (const platform of unorderedPlatforms) {
      if (!(platform.Id in platforms)) {
        platforms[platform.Id] = platform;
      }
    }

    return platforms;
  }

  async function fetchDelete(url, body = "") {
    return await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => {
      if (!response.ok) {
        setError(`${response.status}`);
      }
      return response.json();
    });
  }

  async function fetchUrl(url, method = "GET") {
    return await fetch(url, {
      method: method,
    }).then((response) => {
      if (!response.ok) {
        setError(`${response.status}`);
      }
      return response.json();
    });
  }

  function handleManipulationCodeChange(event) {
    setManipulationCode(event.target.value.trim());
    setIsCodeValid(true);
  }

  function handleManipulationCodeEntrySubmit(event) {
    event.preventDefault();
    (async () => {
      const response = await deleteBooking();
      if (error === null && response.changes > 0) {
        setIsBookingDeleted(true);
      }
      if (error === null && response.changes === 0) {
        setIsCodeValid(false);
      }
    })();
  }

  function handleCancleBookingClick(event) {
    setIsManipulationCodeRequired(true);
  }

  function handleHomePageClick(event) {
    navigate("/");
  }

  function Itinerary() {
    let itineraries = [];

    for (let i = 0; i < schedules.length; i++) {
      const schedule = schedules[i];
      let departureStation =
        stations[schedule.DepartureTrainStationId]?.Name ?? "unknown";
      let destinationStation =
        stations[schedule.DestinationTrainStationId]?.Name ?? "unknown";
      let departurePlatform =
        platforms[schedule.DeparturePlatformId]?.Name ?? "unknown";
      let departureDate = formatDate(schedule.DepartureTime) ?? "unknown";
      let departureTime = formatTime(schedule.DepartureTime) ?? "unknown";
      let arrivalTime = formatTime(schedule.ArrivalTime) ?? "unknown";
      let seats = stages
        .filter(stage => stage.ScheduleId == schedule.Id) // c# where
        .map(x => { return x.SeatNumber; }); // c# select

      itineraries.push(
        <div key={schedule.Id} className="itinerary-result">
          <div className="itinerary-date">{departureDate}</div>
          <div className="intinerary section-content">
            {departureTime} - {departureStation} (Platform {departurePlatform} -
              Seats: {seats?.join(", ") ?? []})<br />
            {arrivalTime} - {destinationStation} (Platform {departurePlatform})
          </div>
        </div>
      );
    }
    return itineraries.length > 0 ? (
      itineraries
    ) : (
      <Skeleton count={2} height="3rem" width="100%" />
    );
  }

  function formatDate(date) {
    return date.toLocaleDateString("sv-SE");
  }

  function formatTime(date) {
    return date.toLocaleTimeString("sv-SE", { timeStyle: "short" });
  }

  function Booking() {
    const travelDate = schedules[0] ? (
      formatDate(schedules[0].DepartureTime)
    ) : (
      <Skeleton width="100%" />
    );

    return (
      <>
        <h2 className="booking-title-header bold">Min bokning</h2>
        
        <h3 className="page-subtitle">Bokning Code: {bookingCode}</h3>

          <div className="page-content">
            <div className="travel-date">
              <div className="title section-title">Resdatum:</div>
              <div className="section-content">{travelDate}</div>
            </div>

            <div className="itinerary">
              <div className="section-title">Resväg:</div>
              <Itinerary />
            </div>

            <div className="name">
              <br />
              <div className="section-title">Namn:</div>
              <div className="section-content">
                {traveller.FirstName ?? <Skeleton width="100%" />}{" "}
                {traveller.LastName}
              </div>
            </div>

            <div className="email">
              <br />
              <div className="section-title">E-post:</div>
              <div className="section-content">
                {traveller.Email ?? <Skeleton width="100%" />}
              </div>
            </div>

            <div className="phoneNumber">
              <br />
              <div className="section-title">Telefonnummer:</div>
              <div className="section-content">
                {traveller.PhoneNumber ?? <Skeleton width="100%" />}
              </div>
            </div>

            <div className="price-section">
              <br />
              <div className="section-price-title">Totalbelopp:</div>
              <div className="section-price-content">
                {booking.Price ? (
                  booking.Price + " kr"
                ) : (
                  <Skeleton width="100%" />
                )}
              </div>
            </div>
          </div>
          <div className="search-btn">
            <button
              type="button"
              id="cancel-booking-btn"
              onClick={handleCancleBookingClick}
            >
              Avboka bokningen
            </button>
          </div>
      </>
    );
  }

  function Error() {
    return (
      <>
        <div className="error">
          Seems like something went wrong!
          <br />
          Error: {error}
        </div>
      </>
    );
  }

  function ManipulationCodeEntry() {
    return (
      <div class="bookings-font">
        <div>
          <h1 className="page-title bold">Veriferings kod</h1>
        </div>

        <div className="page-content">
          <div className="instructions-text">
            Vi behöver din veriferings kod för att kunna gör andringar till din
            bokning.
          </div>
          <div className="input-form">
            <form onSubmit={handleManipulationCodeEntrySubmit}>
              <label
                htmlFor="verification-code-input"
                className="validation-label"
              >
                Veriferingskod {isCodeValid ? '' : <span class="invalid-input-label invalid-input-label-orange">(*Fel Veriferingskod)</span>}
              </label>
              <div className="input-search input-search-mod">
                <input
                  id="verification-code-input"
                  className={"input " + (isCodeValid ? '' : 'invalid-input-field invalid-input-field-orange')}
                  value={manipulationCode}
                  onChange={handleManipulationCodeChange}
                  autoFocus
                />
              </div>
              <div className="search-btn">
                <input
                  type="submit"
                  id="validate-cancellation-btn"
                  value="Avboka bokningen"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  function BookingDeletedConfirmation() {
    return (
      <>
        <div>
          <h1 className="page-deleted-title">Din bokning är nu avbokad</h1>
        </div>
        <div className="search-btn">
          <button
            type="button"
            id="home-page-btn"
            onClick={handleHomePageClick}
          >
            Back to Start
          </button>
        </div>
      </>
    );
  }

  function MainContent() {
    if (!bookingCode || error) return <Error />;
    if (isBookingDeleted) return <BookingDeletedConfirmation />;
    if (isManipulationCodeRequired) return <ManipulationCodeEntry />;
    return <Booking />;
  }

  return <MainContent />;
}

export default Booking;
