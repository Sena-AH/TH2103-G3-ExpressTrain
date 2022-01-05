import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../App';

function Tickets(props) {
  let ticketOptions = [];
  let amount = props.amount
  let severalTickets;
  for (let i = 0; i < amount; i++) {
    if (i === 0) {
      severalTickets = 'Biljett';
    } else {
      severalTickets = 'Biljetter';
    }
    ticketOptions.push(<option value="{i+1}">{i + 1} {severalTickets}</option>);
  }
  return ticketOptions;
}

function SearchResultsPage() {
  const [context, updateContext] = useContext(Context);

  const [DepartureInput, setDepartureInput] = useState();
  const [DepartureStation, setDepartureStation] = useState([]);
  const [DestinationInput, setDestinationInput] = useState();
  const [DestinationStation, setDestinationStation] = useState([]);
  const [AmountOfTravellers, setAmountOfTravellers] = useState();

  const [ReturnTripDepartureStation, setReturnTripDepartureStation] = useState();
  const [ReturnTripDestinationStation, setReturnTripDestinationStation] = useState();

  const [WantedDateOfTrip, setWantedDateOfTrip] = useState();

  const [ArrayOfStations, setArrayOfStations] = useState([]);
  const [ArrayOfSchedules, setArrayOfSchedules] = useState([]);
  const [ArrayOfPossibleDepartures, setArrayOfPossibleDepartures] = useState([]);
  const [ArrayOfPossibleDepartureIds, setArrayOfPossibleDepartureIds] = useState([]);
  const [ArrayOfPossibleReturnDepartures, setArrayOfPossibleReturnDepartures] = useState([]);
  const [ArrayOfPossibleReturnDepartureIds, setArrayOfPossibleReturnDepartureIds] = useState([]);

  const [FirstPrice, setFirstPrice] = useState(499);
  const [SecondPrice, setSecondPrice] = useState(399);

  const [ChosenSchedule, setChosenSchedule] = useState();

  const [ArrayOfChosenTrips, setArrayOfChosenTrips] = useState([]);

  const [FirstChoiceRoundTrip, setFirstChoiceRoundTrip] = useState();
  const [SecondChoiceRoundTrip, setSecondChoiceRoundTrip] = useState();

  const [indexOfClick, setIndexOfClick] = useState();

  const [TypeOfTrip, setTypeOfTrip] = useState('oneway');
  const [Trips, setTrips] = useState([]);

  let navigate = useNavigate();

  function handleFirstTripClick(TripId) {
    setChosenSchedule(TripId);

    for (let i = 0; i < ArrayOfPossibleDepartures.length; i++) {
      if (ArrayOfPossibleDepartures[i].props.id === TripId) {
        let tripInfo = [ArrayOfPossibleReturnDepartures[i], SecondPrice]
        let price = calculatePrice(tripInfo)

        updateContext({
          FirstTrip: {
            ScheduleId: TripId,
            Price: price
          }
        })
        if (TypeOfTrip == 'oneway') {
          navigate('/BookingInformationPage');
        }
      }
    }
  }

  function handleClickReturn(TripId) {
    for (let i = 0; i < ArrayOfPossibleReturnDepartures.length; i++) {
      if (TripId === ArrayOfPossibleReturnDepartures[i].props.id) {
        let tripInfo = [ArrayOfPossibleReturnDepartures[i], SecondPrice]

        let price = calculatePrice(tripInfo)
        updateContext({
          SecondTrip: {
            ScheduleId: TripId,
            Price: price
          }
        })
        navigate('/BookingInformationPage')
      }
    }
  }

  useEffect(() => {
    if (!context) {
      return;
    }

    const url = "api/TrainStation/";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setArrayOfStations(json);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [context]);

  useEffect(() => {
    const url = "api/Schedule/";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();

        setArrayOfSchedules(json);

      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [ArrayOfStations]);

  useEffect(() => {
    setDepartureInput(context.InputInfo.From);
    setDestinationInput(context.InputInfo.To);
    setTypeOfTrip(context.InputInfo.TypeOfTrip);
    setAmountOfTravellers(context.TravellerAmount);
    setWantedDateOfTrip(context.InputInfo.DateOfTrip + ' 00:00:00');
    setReturnTripDepartureStation(DestinationStation);
    setReturnTripDestinationStation(DepartureStation);
  }, [ArrayOfSchedules]);

  function LoadSchedules() {
    console.log(context)

    ArrayOfStations.forEach(station => {
      if (station.Location == DepartureInput) {
        setDepartureStation(station)
      } else if (station.Location == DestinationInput) {
        setDestinationStation(station)
      };
    });

    ArrayOfSchedules.forEach(schedule => {
      let selectedTime = new Date(WantedDateOfTrip);
      let departureTime = new Date(schedule.DepartureTime);
      let tempTime = new Date();
      tempTime.setDate(selectedTime.getDate() + 8);

      if (departureTime >= selectedTime
        && schedule.DepartureTrainStationId === DepartureStation.Id
        && schedule.DestinationTrainStationId === DestinationStation.Id) {
        let trip = schedule;
        let i = 0;

        ArrayOfStations.forEach(station => {

          if (schedule.DepartureTrainStationId === station.Id) {
            trip.DepartureStationName = station.Name;
          }
          if (schedule.DestinationTrainStationId === station.Id) {
            trip.DestinationStationName = station.Name;
          }

          // 2Do tisdag:
          // - korta antalet dagar?
          // - kolla antalet lediga platser?
          // - klippa ut avresedatum för sig och avresetid för sig till trip (split??)
          // - bestämma hur vi ska sätta pris
          // - hitta ett sätt att sänka priset vid tidig bokning (ytterligare en temptime med plus massa dagar och jämföra?)

          if (trip.DepartureStationName && trip.DestinationStationName) {
            if (!ArrayOfPossibleDepartureIds.includes(trip.Id)) {
              let priceInfo = [FirstPrice, trip.DepartureTime];
              let price = calculatePrice(priceInfo);
              ArrayOfPossibleDepartureIds.push(trip.Id)
              ArrayOfPossibleDepartures.push(
                <div className="PossibleDeparture" id={trip.Id}>
                  <button type="submit" border="solid" value={trip.Id} onClick={() => handleFirstTripClick(trip.Id)}>
                    <h2 className='StationNames'>Avgår från: {trip.DepartureStationName}</h2>
                    <div className='DepartureDate'>{schedule.DepartureTime}</div>
                    <h2 className='StationNames'>Ankommer till: {trip.DestinationStationName}</h2>
                    <div className='DepartureAndArrival'>{schedule.ArrivalTime}</div>
                    <br />
                    <div className='Price'>{price} kr</div>
                  </button>
                </div>
              )
            }
          }
        });
      };
    });
    console.log(ArrayOfPossibleDepartures)
    return ArrayOfPossibleDepartures;
  }

  function calculatePrice(priceInfo) {
    let date = new Date(priceInfo[1])
    let today = Date.now();

    let price;
    if(date > today + 15){
      price = priceInfo[0] - 100;
      return (price);
    }
    return (priceInfo[0]);
  }

  function LoadRoundtrip() {
    ArrayOfSchedules.forEach(schedule => {
      // let selectedTime = new Date(WantedDateOfTrip);
      // let departureTime = new Date(schedule.DepartureTime);
      // let tempTime = new Date();
      // tempTime.setDate(selectedTime.getDate() + 8);

      let returnTripDate = new Date(WantedDateOfTrip);
      let departureTime = new Date(schedule.DepartureTime);
      let tempTime = new Date();
      tempTime.setDate(returnTripDate.getDate() + 1);

      if (departureTime > tempTime
        && ReturnTripDepartureStation.Id == schedule.DepartureTrainStationId
        && ReturnTripDestinationStation.Id == schedule.DestinationTrainStationId) {
        let trip = schedule;

        ArrayOfStations.forEach(station => {

          if (schedule.DepartureTrainStationId === station.Id) {
            trip.DepartureStationName = station.Name;
          }
          if (schedule.DestinationTrainStationId === station.Id) {
            trip.DestinationStationName = station.Name;
          }
          if (trip.DepartureStationName && trip.DestinationStationName) {
            if (!ArrayOfPossibleReturnDepartureIds.includes(trip.Id)) {
              let priceInfo = [FirstPrice, trip.DepartureTime];
              let price = calculatePrice(priceInfo);
              ArrayOfPossibleReturnDepartureIds.push(trip.Id);
              ArrayOfPossibleReturnDepartures.push(
                <div className="PossibleDeparture" id={trip.Id}>
                  <button type="submit" border="solid" value={trip.Id} onClick={() => handleClickReturn(trip.Id)}>
                    <h2 className='StationNames'>Avgår från: {trip.DepartureStationName}</h2>
                    <div className='DepartureDate'>{schedule.DepartureTime}</div>
                    <h2 className='StationNames'>Ankommer till: {trip.DestinationStationName}</h2>
                    <div className='DepartureAndArrival'>{schedule.ArrivalTime}</div>
                    <br />
                    <div className='Price'>{price} kr</div>
                  </button>
                </div>
              )
            }
          }
        });
      };
    })

    return ArrayOfPossibleReturnDepartures;
  }

  function isLoadschedulesLoaded() {

    return (isObjectLoaded(ArrayOfSchedules));
  }

  function isLoadRoundtripLoaded() {
    return (isObjectLoaded(ArrayOfSchedules));
  }

  function isObjectLoaded(state) {
    if (state === null) return false;
    if (state === undefined) return false;
    return !(Object.keys(state).length === 0);
  }
  if (TypeOfTrip == 'oneway') {
    return (
      <main>
        <div className="wrapper">
          <h1>Avgångar</h1>
          {isLoadschedulesLoaded() ? <LoadSchedules /> : 'laddar...'}
        </div>
      </main>
    );

  } else {
    return (
      //Load roundtrip schedules
      <main>
        <div className='wrapper'>
          <h1>Utresor</h1>
          {isLoadschedulesLoaded() ? <LoadSchedules /> : 'laddar...'}
          <h1>Returresor</h1>
          {isLoadRoundtripLoaded() ? <LoadRoundtrip /> : 'laddar...'}
        </div>
      </main>
    )
  }
};

export default SearchResultsPage;