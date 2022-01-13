import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../App';
import '../css/searchresult.css';


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

  const [TypeOfTrip, setTypeOfTrip] = useState('oneway');
  const [isReturnTripPossible, setIsReturnTripPossible] = useState(true);

  let navigate = useNavigate();

  useEffect(() => {
    console.log(context);
  }, [context]);

  useEffect(() => {
    if (isObjectLoaded(firstTrip)) {
      updateContext(firstTrip)
    }
  }, [firstTrip]);

  useEffect(() => {
    if (isObjectLoaded(secondTrip)) {
      updateContext(secondTrip)
    }
  }, [secondTrip]);

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

  function handleFirstTripClick(TripId) {
    setChosenSchedule(TripId);

    for (let i = 0; i < ArrayOfPossibleDepartures.length; i++) {
      if (ArrayOfPossibleDepartures[i].props.id === TripId) {

        setFirstTrip({
          FirstTrip: {
            ScheduleId: TripId,
            Price: FirstPrice
          }
        });
      }
    }
  }

  function handleClickReturn(TripId) {
    for (let i = 0; i < ArrayOfPossibleReturnDepartures.length; i++) {
      if (TripId === ArrayOfPossibleReturnDepartures[i].props.id) {

        setSecondTrip({
          SecondTrip: {
            ScheduleId: TripId,
            Price: SecondPrice
          }
        })
      }
    }
  }

  function handleOnewayClick() {
    setTypeOfTrip('oneway');
  }

  function handleRestartClick() {
    navigate('/');
  }

  function Schedules() {
    ArrayOfSchedules.forEach(schedule => {
      let selectedTime = fixDate(WantedDateOfTrip);
      let selectedTimeNew = new Date(selectedTime);

      let departureTime = fixDate(schedule.DepartureTime);
      let departureTimeNew = new Date(departureTime);

      if (departureTimeNew >= selectedTimeNew
        && schedule.DepartureTrainStationId === DepartureStation.Id
        && schedule.DestinationTrainStationId === DestinationStation.Id) {
        let trip = schedule;

        ArrayOfStations.forEach(station => {

          if (schedule.DepartureTrainStationId === station.Id) {
            trip.DepartureStationName = station.Name;
          }
          if (schedule.DestinationTrainStationId === station.Id) {
            trip.DestinationStationName = station.Name;
          }

          if (trip.DepartureStationName && trip.DestinationStationName) {
            if (!ArrayOfPossibleDepartureIds.includes(trip.Id)) {

              ArrayOfPossibleDepartureIds.push(trip.Id)
              ArrayOfPossibleDepartures.push(
                <div key={trip.Id} className="PossibleDeparture" id={trip.Id}>
                  <button className="search-result-button-css" type="submit" value={trip.Id} onClick={() => handleFirstTripClick(trip.Id)}>
                    <div className='StationNames'>Från: {trip.DepartureStationName}</div>
                    <div className='DepartureDate'>{schedule.DepartureTime}</div>
                    <div className='StationNames'>Till: {trip.DestinationStationName}</div>
                    <div className='DepartureAndArrival'>{schedule.ArrivalTime}</div>
                    <br />
                    <div className='Price search-result-price-css'>{FirstPrice} kr</div>

                  </button>

                </div>
              )
            }
          }
        });
      };
    });
    if (isObjectLoaded(ArrayOfPossibleDepartures)) {
      setIsReturnTripPossible(true);
      return (<div className='search-result-wrapper'>
        <h2>Avgångar</h2>
        {ArrayOfPossibleDepartures}
      </div>);
    }
    else {
      setIsReturnTripPossible(false);
      return (
        <div className='noPossibleFirstTrips search-result-wrapper'>
          <h2>Avgångar</h2>
          <div className='sorry-msg'>
            Tyvärr finns inga resor nära ditt angivna datum.
          </div>
          <div className='choice-btn-wrapper'>
            <button className="choice-btn" type="button" onClick={() => handleRestartClick()}>Börja om</button>
          </div>
        </div>
      )
    }
  }

  function RoundTrip() {
    ArrayOfSchedules.forEach(schedule => {

      let scheduleDepartureTime = fixDate(schedule.DepartureTime);
      let scheduleDepartureTimeNew = new Date(scheduleDepartureTime);

      let fixedWantedDate = fixDate(WantedDateOfTrip);
      let dateFixedWantedDate = new Date(fixedWantedDate);

      if (scheduleDepartureTimeNew > dateFixedWantedDate
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

              ArrayOfPossibleReturnDepartureIds.push(trip.Id);
              ArrayOfPossibleReturnDepartures.push(
                <div key={trip.Id} className="PossibleDeparture" id={trip.Id}>
                  <button type="submit" className="search-result-button-css" value={trip.Id} onClick={() => handleClickReturn(trip.Id)}>
                    <div className='StationNames'>Från: {trip.DepartureStationName}</div>
                    <div className='DepartureDate'>{schedule.DepartureTime}</div>
                    <div className='StationNames'>Till: {trip.DestinationStationName}</div>
                    <div className='DepartureAndArrival'>{schedule.ArrivalTime}</div>
                    <br />
                    <div className='TripPrice Price search-result-price-css'>{SecondPrice} kr</div>

                  </button>
                </div>



              )
            }
          }
        });
      };
    })
    if (isObjectLoaded(ArrayOfPossibleReturnDepartures) && isReturnTripPossible) {
      return (<div className='search-result-wrapper'>
        <h2>Avgångar returresa</h2>
        {ArrayOfPossibleReturnDepartures}
      </div>);
    }
    else if (!isObjectLoaded(ArrayOfPossibleReturnDepartures)) {
      return (
        <div className='search-result-wrapper'>
          <h2>Avgångar returresa</h2>
          <div className='sorry-msg'>Tyvärr finns inga returresor nära ditt angivna datum.</div>
          <div className='choice-btn-wrapper'>
            <button className="choice-btn" type="button" onClick={() => handleRestartClick()}>Börja om</button>
            <button className="choice-btn" type="button" onClick={() => handleOnewayClick()}>Boka utresa som enkelresa</button>
          </div>
        </div>
      );
    }
    else
      return (
        <div></div>
      );
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

  function fixDate(date) {
    let dateString = date.toString();
    let addT = dateString.replace(/ /g, "T");
    let addZ = addT + 'Z';
    return addZ;
  }

  useEffect(() => {
    if (isSchedulesLoaded()) {
      setStationLocations();
    }

  }, [isSchedulesLoaded]);

  // Rendering.
  if (TypeOfTrip == 'oneway') {
    return (
      <div className='search-result'>
        {isSchedulesLoaded() ? <Schedules /> : 'laddar...'}
      </div>
    );

  } else {
    return (
      <div className='search-result'>
        {isSchedulesLoaded() ? <Schedules /> : 'laddar...'}
        {isSchedulesLoaded() ? <RoundTrip /> : 'laddar...'}
      </div>
    )
  }
};

export default SearchResultsPage;