import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentForm from "./PaymentForm";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function PaymentPage(props) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [context, updateContext] = useState(state);

  const [platforms, setPlatforms] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [stations, setStations] = useState([]);

  const [travellerAmount, setTravellerAmount] = useState(
    context.TravellerAmount
  );
  const [firstTrip, setTirstTrip] = useState(context.FirstTrip);
  const [secondTrip, setSecondTrip] = useState(context.SecondTrip.ScheduleId == 0 ? {} : context.SecondTrip);
  const [seats, setSeats] = useState(context.SecondTripSeats ? [
    context.FirstTripSeats,
    context.SecondTripSeats,
  ] : [context.FirstTripSeats]);
  const [scheduleIds, setScheduleIds] = useState(secondTrip.ScheduleId != undefined ? [
    firstTrip.ScheduleId,
    secondTrip.ScheduleId
  ] : [firstTrip.ScheduleId]);
  const [totalPrice, setTotalPrice] = useState(
    firstTrip.Price + (secondTrip?.Price ?? 0)
  );

  const [bookingData, setBookingData] = useState();
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  useEffect(() => {
    (async () => {
      const schedules = await fetchSchedules(scheduleIds);
      const [stations, platforms] = await Promise.all([
        await fetchStations(schedules),
        await fetchPlatforms(schedules),
      ]);

      setSchedules(schedules);
      setStations(stations);
      setPlatforms(platforms);
    })();
  }, []);

  useEffect(() => {
    // TODO: maybe no useEffect
    setBookingData({
      FirstName: context.TravellerFirstName,
      LastName: context.TravellerLastName,
      Email: context.TravellerEmail,
      PhoneNumber: context.TravellerPhoneNumber,
      Price: totalPrice,
      ScheduleIds: getScheduleIds(schedules),
      Seats: seats
    })
  }, [schedules, seats]);

  async function fetchSchedules(scheduleIds) {
    const schedulesPromises = scheduleIds.map(async (scheduleId) => {
      const schedule = await fetchUrl(`/api/Schedule/${scheduleId}`);
      schedule.DepartureTime = new Date(schedule.DepartureTime);
      schedule.ArrivalTime = new Date(schedule.ArrivalTime);
      return schedule;
    });
    return await Promise.all(schedulesPromises);
  }

  async function fetchStations(schedules) {
    const stationsPromises = schedules.map(async (schedule) => {
      return await Promise.all([
        await fetchUrl(`/api/TrainStation/${schedule.DepartureTrainStationId}`),
        await fetchUrl( `/api/TrainStation/${schedule.DestinationTrainStationId}`),
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

  async function fetchUrl(url, method = "GET") {
    return await fetch(url, {
      method: method,
    }).then((response) => {
      if (!response.ok) {
        console.log(`${response.status}`);
      }
      return response.json();
    });
  }

  function Itinerary() {
    let itineraries = [];
    if (schedules.length > 2) {
      return [];
    }
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

      itineraries.push(
        <div key={schedule.Id} className="itinerary-result">
          <div className="itinerary-date">{departureDate}</div>
          <div className="intinerary section-content">
            {departureTime} - {departureStation} (Platform {departurePlatform} -
            Seats: {seats[i]?.join(", ") ?? []})<br />
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

  function Booking() {
    const travelDate = schedules[0] ? (
      formatDate(schedules[0].DepartureTime)
    ) : (
      <Skeleton width="100%" />
    );

    return (
      <>
        <div>
          <h1 className="page-title">Min bokning</h1>
        </div>
        <div className="page-content">
          {/* <h3 className="page-subtitle">Boking Code: {bookingCode}</h3> */}

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
              {context.TravellerFirstName ?? <Skeleton width="100%" />}{" "}
              {context.TravellerLastName}
            </div>
          </div>

          <div className="email">
            <br />
            <div className="section-title">E-post:</div>
            <div className="section-content">
              {context.TravellerEmail ?? <Skeleton width="100%" />}
            </div>
          </div>

          <div className="phoneNumber">
            <br />
            <div className="section-title">Telefonnummer:</div>
            <div className="section-content">
              {context.TravellerPhoneNumber ?? <Skeleton width="100%" />}
            </div>
          </div>

          <div className="price">
            <br />
            <div className="section-title">Totalbelopp:</div>
            <div className="section-content">
              {totalPrice ? totalPrice + " kr" : <Skeleton width="100%" />}
            </div>
          </div>
        </div>
        <div className="search-btn">
          <button
            type="button"
            id="cancel-booking-btn"
            onClick={() => setShowPaymentForm(true)}
          >
            Betala
          </button>
        </div>
      </>
    );
  }

  function formatDate(date) {
    return date.toLocaleDateString("sv-SE");
  }

  function formatTime(date) {
    return date.toLocaleTimeString("sv-SE", { timeStyle: "short" });
  }

  function getScheduleIds(schedules) {
    return schedules.map(schedule => { return schedule.Id });
  }

  if (showPaymentForm) {
    return <PaymentForm data={bookingData}/>;
  }
  return <Booking />;
}

export default PaymentPage;
