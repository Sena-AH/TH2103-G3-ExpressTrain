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

  const [DepartureInput, setDepartureInput] = useState("Göteborg");
  const [DepartureStation, setDepartureStation] = useState([]);
  const [DestinationInput, setDestinationInput] = useState("Stockholm");
  const [DestinationStation, setDestinationStation] = useState([]);
  const [ArrayOfStations, setArrayOfStations] = useState([]);

  const [ArrayOfTrips, setArrayOfTrips] = useState([]);
  const [WantedDateOfTrip, setWantedDateOfTrip] = useState(new Date('2021-01-20 00:00:00'));

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

  function loadSchedules() {

    ArrayOfStations.forEach(station => {
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
   
      // if (tempTime2 >= tempTime
      //   && tempTime2 < tempTime3
      //   && schedule.DepartureTrainStationId === DepartureStation.Id
      //   && schedule.DestinationTrainStationId === DestinationStation.Id)
        if ( schedule.DepartureTrainStationId === DepartureStation.Id
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
    });
  }
  
  function createTrips() {
    return ArrayOfPossibleDepartures;
  }
  
  return (
    <main>
      <div className="wrapper">
       
      
        

      </div>
    </main>
  );
};

export default SearchResultsPage;