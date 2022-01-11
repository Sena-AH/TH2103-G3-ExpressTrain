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
    ticketOptions.push(<option key={i} value={i + 1} >{i + 1} {severalTickets}</option>);
  }
  return ticketOptions;
}

function HomePage() {

  const [context, updateContext] = useContext(Context)
  const [travelInfo, setTravelInfo] = useState({});

  const [DepartureInput, setDepartureInput] = useState("");
  const [DestinationInput, setDestinationInput] = useState("");
  const [ArrayOfStations, setArrayOfStations] = useState([]);
  const [TicketAmountChoice, setTicketAmountChoice] = useState(1);

  const [TypeOfTrip, setTypeOfTrip] = useState('oneway');
  const [DateOfTrip, setDateOfTrip] = useState();

  let navigate = useNavigate();

  function handleChange(event) {
    setTravelInfo({
      ...travelInfo,
      [event.target.name]: event.target.value.trim(),
    });
  }

  useEffect(() => {
    setTravelInfo({
      ...travelInfo,
      'TravelType': 'oneway',
      'TravellerAmount': '1'
    });
  }, []);

  useEffect(() => {
    updateContext(travelInfo);
  }, [travelInfo]);


  function handleClick() {
    navigate('/SearchResultsPage');
  }

  // handleClick();

  return (
    <div>
      <div className="input-search">
        <input className="input" placeholder="Från:" name="TravelFrom" value={setTravelInfo.TravelFrom} onChange={handleChange} />
      </div>
      <div className="input-search">
        <input className="input" placeholder="Till:" name="TravelTo" value={setTravelInfo.TravelTo} onChange={handleChange} />
      </div>

      <form className="input-form" action="" method="post">
        <div className="switch" >
          <input type="radio"
            className="switch-input"
            name="TravelType"
            value="oneway"
            id="oneway"
            onClick={handleChange}
          />
          <label htmlFor="oneway" className="switch-label switch-label-off">Enkelresa</label>

          <input type="radio"
            className="switch-input"
            name="TravelType"
            value="roundtrip"
            id="roundtrip"
            onClick={handleChange}
          />
          <label htmlFor="roundtrip" className="switch-label switch-label-on">Tur & retur</label>
          <span className="switch-selection"></span>
        </div>
      </ form>

      <div className="input-tickets">
        <select className="input-color" name="TravellerAmount" id="tickets" onChange={handleChange} >
          <Tickets amount="8" />
        </select>
      </div>

      <div className="input-date">
        <input className="input-color" type="date" name="TravelDate" onChange={handleChange}></input>
      </div>

      <div className="search-btn">
        <button type="button" onClick={() => handleClick()}>Sök</button>
      </div>
    </div>
  );
}

export default HomePage;
