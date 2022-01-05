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
    ticketOptions.push(<option value={i + 1} >{i + 1} {severalTickets}</option>);
  }
  return ticketOptions;
}

function HomePage() {

  const [context, updateContext] = useContext(Context)

  const [DepartureInput, setDepartureInput] = useState("");
  const [DestinationInput, setDestinationInput] = useState("");
  const [ArrayOfStations, setArrayOfStations] = useState([]);
  const [TicketAmountChoice, setTicketAmountChoice] = useState(1);

  const [TypeOfTrip, setTypeOfTrip] = useState('oneway');

  const [DateOfTrip, setDateOfTrip] = useState();

  let navigate = useNavigate();

  function handleClick() {
    updateContext(
      {
        TravellerAmount: TicketAmountChoice,
        InputInfo: {
          From: DepartureInput,
          To: DestinationInput,
          TypeOfTrip: TypeOfTrip,
          DateOfTrip: DateOfTrip,
        }
      }
    );

    navigate('/SearchResultsPage');
  }

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
          <select className="input-color" name="tickets" id="tickets" onChange={(e) => { setTicketAmountChoice(e.target.value); }} >
            <Tickets amount="8" />
          </select>
        </div>

        <div className="input-date">
          <input className="input-color" type="date" onChange={(e) => { setDateOfTrip(e.target.value) }}></input>
        </div>

        <div className="search-btn">
          <button type="button" onClick={() => handleClick()}>Sök</button>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
