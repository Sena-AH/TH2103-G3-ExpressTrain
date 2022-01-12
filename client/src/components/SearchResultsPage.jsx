import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../App';

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

  const [firstTrip, setFirstTrip] = useState({});
  const [secondTrip, setSecondTrip] = useState({});

  const [ChosenSchedule, setChosenSchedule] = useState();

  const [ArrayOfChosenTrips, setArrayOfChosenTrips] = useState([]);

  const [FirstChoiceRoundTrip, setFirstChoiceRoundTrip] = useState();
  const [SecondChoiceRoundTrip, setSecondChoiceRoundTrip] = useState();

  const [indexOfClick, setIndexOfClick] = useState();

  const [TypeOfTrip, setTypeOfTrip] = useState('oneway');
  const [Trips, setTrips] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    console.log(context);
  }, [context]);

  useEffect(() => {
    if(isObjectLoaded(firstTrip)){
      updateContext(firstTrip)
    }
  }, [firstTrip]);

  useEffect(() => {
    if(isObjectLoaded(secondTrip)){
      updateContext(secondTrip)
    }
  }, [secondTrip]);

  function handleFirstTripClick(TripId) {
    setChosenSchedule(TripId);

    for (let i = 0; i < ArrayOfPossibleDepartures.length; i++) {
      if (ArrayOfPossibleDepartures[i].props.id === TripId) {
        let tripInfo = [ArrayOfPossibleReturnDepartures[i], FirstPrice]
        let price = calculatePrice(tripInfo)

        setFirstTrip({
          FirstTrip: {
            ScheduleId: TripId,
            Price: price
          }
        });

        // if (TypeOfTrip === 'oneway') {
        //   navigate('/BookingInformationPage');
        // }
      }
    }
  }

  function handleClickReturn(TripId) {
    for (let i = 0; i < ArrayOfPossibleReturnDepartures.length; i++) {
      if (TripId === ArrayOfPossibleReturnDepartures[i].props.id) {
        let tripInfo = [ArrayOfPossibleReturnDepartures[i], SecondPrice]

        let price = calculatePrice(tripInfo)
        setSecondTrip({
          SecondTrip: {
            ScheduleId: TripId,
            Price: price
          }
        })

        // navigate('/BookingInformationPage')
      }
    }
  }

  useEffect(() => {
    if (context.FirstTrip?.ScheduleId && TypeOfTrip === 'oneway') {
      navigate('/BookingInformationPage');
    }

    if (context.FirstTrip?.ScheduleId && context.SecondTrip?.ScheduleId && TypeOfTrip === 'roundtrip') {
      navigate('/BookingInformationPage');
    }
  }, [context]);

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
    setDepartureInput(context.TravelFrom);
    setDestinationInput(context.TravelTo);
    setTypeOfTrip(context.TravelType);
    setAmountOfTravellers(context.TravellerAmount);
    setWantedDateOfTrip(context.TravelDate + ' 00:00:00');
    setReturnTripDepartureStation(DestinationStation);
    setReturnTripDestinationStation(DepartureStation);
  }, [ArrayOfSchedules]);

  function Schedules() {
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
              let priceInfo = [trip.DepartureTime, FirstPrice];
              let price = calculatePrice(priceInfo);
              ArrayOfPossibleDepartureIds.push(trip.Id)
              ArrayOfPossibleDepartures.push(
                <div key={trip.Id} className="PossibleDeparture" id={trip.Id}>
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
    // console.log(ArrayOfPossibleDepartures)
    return ArrayOfPossibleDepartures;
  }

  function calculatePrice(priceInfo) {
    let date = new Date(priceInfo[0]);
    let today = Date.now();

    let price;
    if(date > today + 15){
      price = priceInfo[1] - 100;
      return (price);
    }

    return (priceInfo[1]);
  }

  function RoundTrip() {
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
              let priceInfo = [trip.DepartureTime, FirstPrice];
              console.log(priceInfo);
              let price = calculatePrice(priceInfo);

              ArrayOfPossibleReturnDepartureIds.push(trip.Id);
              ArrayOfPossibleReturnDepartures.push(
                <div key={trip.Id} className="PossibleDeparture" id={trip.Id}>
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

  function isSchedulesLoaded() {
    return (isObjectLoaded(ArrayOfSchedules));
  }

  function isObjectLoaded(state) {
    if (state === null) return false;
    if (state === undefined) return false;
    return !(Object.keys(state).length === 0);
  }

  function setStationLocations() {
    ArrayOfStations.forEach(station => {
      if (station.Location == DepartureInput) {
        setDepartureStation(station)
      } else if (station.Location == DestinationInput) {
        setDestinationStation(station)
      };
    });
  }

  useEffect(() => {
    if (isSchedulesLoaded()) {
      setStationLocations();
    }
  
  }, [isSchedulesLoaded]);
  
  // Rendering.
  if (TypeOfTrip == 'oneway') {
    return (
      <div>
        <h1>Avgångar</h1>
        {isSchedulesLoaded() ? <Schedules /> : 'laddar...'}
      </div>
    );

  } else {
    return (
      //Load roundtrip schedules
      <div>
        <h1>Utresor</h1>
        {isSchedulesLoaded() ? <Schedules /> : 'laddar...'}
        <h1>Returresor</h1>
        {isSchedulesLoaded() ? <RoundTrip /> : 'laddar...'}
      </div>
    )
  }
};

export default SearchResultsPage;