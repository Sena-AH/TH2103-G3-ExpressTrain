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

function HomePage() {

  const [context, updateContext] = useContext(Context)

  const [DepartureInput, setDepartureInput] = useState("");
  const [DepartureStation, setDepartureStation] = useState();
  const [DestinationInput, setDestinationInput] = useState("");
  const [DestinationStation, setDestinationStation] = useState();
  const [ArrayOfStations, setArrayOfStations] = useState([]);

  const [ArrayOfTrips, setArrayOfTrips] = useState([]);
  const [WantedDateOfTrip, setWantedDateOfTrip] = useState();

  const [ArrayOfSchedules, setArrayOfSchedules] = useState([]);
  const [ScheduleId, setScheduleId] = useState();
  const [ArrayOfPossibleDepartures, setArrayOfPossibleDepartures] = useState([]);

  const [TypeOfTrip, setTypeOfTrip] = useState('oneway');

  let navigate = useNavigate();

  function handleClick() {

    let trip = [];

    console.log(WantedDateOfTrip)

    ArrayOfSchedules.forEach(schedule => {

      let tempDate = schedule.DepartureTime;

      if (schedule.DepartureTime >= WantedDateOfTrip
        && schedule.DepartureTrainStationId === DepartureStation.Id
        && schedule.DestinationTrainStationId === DestinationStation.Id) {

        ArrayOfSchedules.push(schedule);

        ArrayOfStations.forEach(station => {

          if (schedule.DepartureTrainStationId === station.Id) {
            trip.DepartureStationName = station.Name;
          }
          if (schedule.DestinationTrainStationId === station.Id) {
            trip.DestinationStationName = station.Name;
          }
        });
      };
    });

  }

  function createTrips() {
    let trips = [];
    ArrayOfSchedules.forEach(schedule => {

      trips.push(

        <div>
          {schedule}<br></br>
        </div>

      );


    });
  }

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
        console.log(json);
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

        ArrayOfStations.forEach(station => {
          if (station.Location === DepartureInput) {
            setDepartureStation(station)
            console.log(station);
          } else if (station.Location === DestinationInput) {
            setDestinationStation(station)
            console.log(station);
          };
        });

        setArrayOfSchedules(json);

      } catch (error) {
        console.log("error", error);
      }
    };


    fetchData();
  }, []);

  return (
    <main>
      <div className="wrapper">
        <div className="input-search">
          <input className="input" placeholder="Till:" value={DepartureInput} onChange={(e) => { setDepartureInput(e.target.value) }} />
        </div>
        <div className="input-search">
          <input className="input" placeholder="Från:" value={DestinationInput} onChange={(e) => { setDestinationInput(e.target.value) }} />
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

export default HomePage;