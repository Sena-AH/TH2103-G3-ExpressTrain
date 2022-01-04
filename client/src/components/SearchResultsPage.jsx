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

  const [context, updateContext] = useContext(Context)

  const [DepartureInput, setDepartureInput] = useState("");
  const [DepartureStation, setDepartureStation] = useState([]);
  const [DestinationInput, setDestinationInput] = useState("");
  const [DestinationStation, setDestinationStation] = useState([]);
  const [ArrayOfStations, setArrayOfStations] = useState([]);

  const [ArrayOfTrips, setArrayOfTrips] = useState([]);
  const [WantedDateOfTrip, setWantedDateOfTrip] = useState();

  const [ArrayOfSchedules, setArrayOfSchedules] = useState([]);
  const [ScheduleId, setScheduleId] = useState();
  const [ArrayOfPossibleDepartures, setArrayOfPossibleDepartures] = useState([]);

  const [TypeOfTrip, setTypeOfTrip] = useState('oneway');
  const [Trips, setTrips] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    const url = "api/TrainStation/";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        for (let i = 0; i < json.length; i++) {
          ArrayOfStations.push(json[i].Id);
        }
        setArrayOfStations(json);
      } catch (error) {
        console.log("error", error);
      }
    };


    fetchData();
  }, []);

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
  }, []);

  function handleClick() {

    ArrayOfStations.forEach(station => {
      console.log(station);
      if (station.Location == DepartureInput) {
        setDepartureStation(station)
      } else if (station.Location == DestinationInput) {
        setDestinationStation(station)
      };
    });

    /*HÄR FINNS ALLT*/

    ArrayOfSchedules.forEach(schedule => {


      
      let tempTime = new Date(WantedDateOfTrip + ' 00:00:00');
      let tempTime2 = new Date(schedule.DepartureTime);
      let tempTime3 = new Date();
      tempTime3.setDate(tempTime.getDate() + 8);
   
      if (tempTime2 >= tempTime
        && tempTime2 < tempTime3
        && schedule.DepartureTrainStationId === DepartureStation.Id
        && schedule.DestinationTrainStationId === DestinationStation.Id){
        let trip = schedule;

        ArrayOfStations.forEach(station => {

          if (schedule.DepartureTrainStationId === station.Id) {
            trip.DepartureStationName = station.Name;
          }
          if (schedule.DestinationTrainStationId === station.Id) {
            trip.DestinationStationName = station.Name;
          }

          // ArrayOfPossibleDepartures.push(trip);

          // 2Do tisdag:
          // - korta antalet dagar?
          // - kolla antalet lediga platser?
          // - klippa ut avresedatum för sig och avresetid för sig till trip (split??)
          // - bestämma hur vi ska sätta pris
          // - hitta ett sätt att sänka priset vid tidig bokning (ytterligare en temptime med plus massa dagar och jämföra?)

          ArrayOfPossibleDepartures.push(
            <div className="PossibleDeparture">
              <h2 className='StationNames'>Avgår från: {trip.DepartureStationName}</h2>
              <h2 className='StationNames'>Ankommer till: {trip.DestinationStationName}</h2>
              <br />
              <div className='DepartureDate'>{trip.tempTime2}</div>
              <br />
              <div className='DepartureAndArrival'></div>
              <div className='Price'></div>
            </div>
          )

        });
      };
      console.log(ArrayOfPossibleDepartures);
    });
    // createTrips();

  }

  // function createTrips() {
  //   return (<div>
      
  //       <ArrayOfPossibleDepartures />
      
  //     </div>)
  // }

  return (
    <main>
      <div className="wrapper">
        <div className="input-search">
          <input className="input" placeholder="Från:" value={DepartureInput} onChange={(e) => { setDepartureInput(e.target.value) }} />
        </div>
        <div className="input-search">
          <input className="input" placeholder="Till:" value={DestinationInput} onChange={(e) => { setDestinationInput(e.target.value) }} />
        </div>

        <form className="input-form" action="" method="post">
          <div className="switch" >
            <input type="radio"
              className="switch-input"
              name="view"
              value="oneway"
              id="oneway"
              onClick={(e) => { setTypeOfTrip(e.target.value) }}
            />
            <label htmlFor="oneway" className="switch-label switch-label-off">Enkelresa</label>

            <input type="radio"
              className="switch-input"
              name="view"
              value="roundtrip"
              id="roundtrip"
              onClick={(e) => { setTypeOfTrip(e.target.value) }}
            />
            <label htmlFor="roundtrip" className="switch-label switch-label-on">Tur & retur</label>
            <span className="switch-selection"></span>
          </div>
        </ form>

        <div className="input-tickets">
          <select className="input-color" name="tickets" id="tickets">
            <Tickets amount="8" />
          </select>
        </div>

        <div className="input-date">
          <input className="input-color" type="date" onChange={(e) => { setWantedDateOfTrip(e.target.value) }}></input>
        </div>

        <div className="search-btn">
          <button type="button" onClick={handleClick}>Sök</button>
        </div>

      </div>
    </main>
  );
};

export default SearchResultsPage;