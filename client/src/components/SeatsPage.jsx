import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../css/SeatsPage.css';

function SeatsPage() {
  const { state } = useLocation();
  const [context, updateContext] = useState(state);

  const firstScheduleId = context.FirstTrip.ScheduleId;
  const [secondScheduleId, setSecondScheduleId] = useState(0);

  let navigate = useNavigate();

  const [firstCart, setFirstCart] = useState([]);
  const [firstSchedule, setFirstSchedule] = useState();
  const [firstTakenSeats] = useState([]);
  const [firstStages, setFirstStages] = useState([]);

  const [secondCart, setSecondCart] = useState([]);
  const [secondSchedule, setSecondSchedule] = useState();
  const [secondTakenSeats] = useState([]);
  const [secondStages, setSecondStages] = useState([]);

  const [startStation, setStartStation] = useState([]);
  const [destinationStation, setDestinationStation] = useState([]);

  // Utresa
  // hämta schedule
  useEffect(() => {
    //if (!isObjectLoaded(firstScheduleId)) return;
    (async () => {
      let res = await fetchSchedule(firstScheduleId);

      setFirstSchedule(res);
    })();
    // eslint-disable-next-line
  }, [firstScheduleId]);

  // hämta stages
  useEffect(() => {
    if (!isObjectLoaded(firstSchedule)) return;
    (async () => {
      let res = await fetchStages(firstScheduleId);

      setFirstStages(res);
    })();
    // eslint-disable-next-line
  }, [firstSchedule]);

  // sätt taken seats
  useEffect(() => {
    if (!isObjectLoaded(firstStages)) return;
    firstStages.forEach((stage) => {
      firstTakenSeats.push(stage.SeatNumber);
    });
    // eslint-disable-next-line
  }, [firstStages]);

  // sätt startstation
  useEffect(() => {
    if (!isObjectLoaded(firstSchedule)) return;
    (async () => {
      let res = await fetchStation(firstSchedule.DepartureTrainStationId);

      setStartStation(res.Name);
    })();
    // eslint-disable-next-line
  }, [firstSchedule]);

  // sätt målstation
  useEffect(() => {
    if (!isObjectLoaded(firstSchedule)) return;
    (async () => {
      let res = await fetchStation(firstSchedule.DestinationTrainStationId);

      setDestinationStation(res.Name);
    })();
    // eslint-disable-next-line
  }, [firstSchedule]);

  // hämta cart
  useEffect(() => {
    if (!isObjectLoaded(firstSchedule)) return;
    (async () => {
      let res = await fetchCart(firstSchedule.CartId);

      setFirstCart(res);
    })();
    // eslint-disable-next-line
  }, [firstSchedule]);

  // Returresa
  // Sätt secondScheduleId
  useEffect(() => {
    if (!isObjectLoaded(firstSchedule)) return;
    if (context.SecondTrip !== undefined) {
      setSecondScheduleId(context.SecondTrip.ScheduleId);
    }
    // eslint-disable-next-line
  }, [firstSchedule]);

  // hämta schedule
  useEffect(() => {
    (async () => {
      let res = await fetchSchedule(secondScheduleId);

      setSecondSchedule(res);
    })();
    // eslint-disable-next-line
  }, [secondScheduleId]);

  // hämta stages
  useEffect(() => {
    if (!isObjectLoaded(secondSchedule)) return;
    (async () => {
      let res = await fetchStages(secondScheduleId);

      setSecondStages(res);
    })();
    // eslint-disable-next-line
  }, [secondSchedule]);

  // sätt taken seats
  useEffect(() => {
    if (!isObjectLoaded(secondStages)) return;
    secondStages.forEach((stage) => {
      secondTakenSeats.push(stage.SeatNumber);
    });
    // eslint-disable-next-line
  }, [secondStages]);

  // hämta cart
  useEffect(() => {
    if (!isObjectLoaded(secondSchedule)) return;
    (async () => {
      let res = await fetchCart(secondSchedule.CartId);

      setSecondCart(res);
    })();
    // eslint-disable-next-line
  }, [secondSchedule]);

  async function fetchStages(id) {
    return await fetchInfo(
      `/api/Schedulestage/ScheduleId/${id}`,
      "scheduleStages"
    );
  }

  async function fetchSchedule(id) {
    return await fetchInfo(`/api/Schedule/${id}`);
  }

  async function fetchStation(id) {
    return await fetchInfo(`/api/TrainStation/${id}`);
  }

  async function fetchCart(id) {
    return await fetchInfo(`/api/Cart/${id}`, "carts");
  }

  async function fetchInfo(url) {
    return await fetch(url)
      .then((response) => {
        if (!response.ok) {
        }
        return response.json();
      })
      .then(
        (result) => {
          return result;
        },
        () => { }
      );
  }

  function isObjectLoaded(state) {
    if (state === null) return false;
    if (state === undefined) return false;
    return !(Object.keys(state).length === 0);
  }

  function TakenSeat() {
    alert("Upptagen!");
  }

  function VacantSeatFirst(seatNumber) {
    if (context.FirstTripSeats.length == context.TravellerAmount) {
      alert("Du har redan valt sittplats(er)");
    } else if (context.FirstTripSeats.includes(seatNumber)) {
      alert("Du har redan valt den här platsen!");
    } else {
      context.FirstTripSeats.push(seatNumber);
    }
    // byt färg på knappen eller nåt
  }

  function VacantSeatSecond(seatNumber) {
    if (context.SecondTripSeats.length == context.TravellerAmount) {
      alert("Du har redan valt sittplats(er)");
    } else if (context.SecondTripSeats.includes(seatNumber)) {
      alert("Du har redan valt den här platsen!");
    } else {
      context.SecondTripSeats.push(seatNumber);
    }

    // byt färg på knappen eller nåt
  }

  function RenderFirstCart() {
    let cartSeats = [];

    // hämta upptagna platser

    // skapa divar med knappar
    for (let i = 1; i <= firstCart.SeatAmount; i++) {
      // if takenseats.contains {i}

      if (firstTakenSeats.includes(i)) {
        cartSeats.push(
          <div key={i} className="seat">
            <button className="takenSeat" onClick={() => TakenSeat()}>
              {i}, <br />
              Upptagen
            </button>
          </div>
        );
      } else {
        cartSeats.push(
          <div key={i} className="seat">
            <button
              className="availableSeat"
              onClick={() => VacantSeatFirst(i)}
            >
              {i}, <br />
              Ledig
            </button>
          </div>
        );
      }
    }

    return cartSeats;
  }

  function RenderSecondCart() {
    let cartSeats = [];

    // skapa divar med knappar
    for (let i = 1; i <= secondCart.SeatAmount; i++) {
      if (secondTakenSeats.includes(i)) {
        cartSeats.push(
          <div key={i} className="seat">
            <button className="takenSeat" onClick={() => TakenSeat()}>
              {i}, <br />
              Upptagen
            </button>
          </div>
        );
      } else {
        cartSeats.push(
          <div key={i} className="seat">
            <button
              className="availableSeat"
              onClick={() => VacantSeatSecond(i)}
            >
              {i}, <br />
              Ledig
            </button>
          </div>
        );
      }
    }

    return cartSeats;
  }

  function navToPayment() {
    navigate("/Payment", { state: context });
  }

  function RenderAllSeats() {
    if (secondScheduleId === 0) {
      return (
        <div className="WholePage">
          <h1 className="Title">
            Sittplatser <br />
          </h1>
          <h2> {startStation} <br />
          - <br />
            {destinationStation}</h2>
          <div className="TrainCart">
            {isRenderedFirstSeatsLoaded() ? <RenderFirstCart /> : "laddar..."}
          </div>
          <div className="TotalPrice">
            <div className="search-btn">
              <button type="button" onClick={() => navToPayment()}>
                Spara och Fortsätt
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="WholePage">
          <h1 className="Title">
            Sittplatser <br />
          </h1>
          <h2> {startStation} <br />
          - <br />
            {destinationStation}</h2>
          <div className="TrainCart">
            {isRenderedFirstSeatsLoaded() ? <RenderFirstCart /> : "laddar..."}
          </div>

          <h1 className="Title">
            Sittplatser <br />
          </h1>
          <h2> {destinationStation} <br />
          - <br />
            {startStation}</h2>

          <div className="TrainCart">
            {isRenderedSecondSeatsLoaded() ? <RenderSecondCart /> : "laddar..."}
          </div>
          <div className="TotalPrice">
            <div className="search-btn">
              <button type="button" onClick={() => navToPayment()}>
                Spara och Fortsätt
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  function isRenderedFirstSeatsLoaded() {
    return isObjectLoaded(firstCart);
  }

  function isRenderedSecondSeatsLoaded() {
    return isObjectLoaded(secondCart);
  }

  return (
    <main>
      <RenderAllSeats />
    </main>
  );
}

export default SeatsPage;
