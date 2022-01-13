import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../App';
import { validate } from 'uuid';



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
    validateInput();
    if (!travelInfo.LocationErrorMessage && travelInfo.TravelDate) {
      trimContext();
      navigate('/SearchResultsPage');
    } else {
      navigate('/');
    }
  }

  function resetErrors() {
    travelInfo.ToCharErrorMessage = null;
    travelInfo.ToErrorMessage = null;
    travelInfo.FromCharErrorMessage = null;
    travelInfo.FromErrorMessage = null;
  }

  function validateInput() {
    resetErrors();
    const valid = new RegExp(/[^a-zA-ZåäöÅÄÖ]/)
    
      if(valid.test(travelInfo.TravelFrom)){
        console.log(travelInfo.FromCharErrorMessage);
        travelInfo.FromCharErrorMessage = 'Vänligen ange enbart bokstäver för avgång';
      } 
      if(valid.test(travelInfo.TravelTo)){
        console.log(travelInfo.ToCharErrorMessage);
        travelInfo.ToCharErrorMessage = 'Vänligen ange enbart bokstäver för destination';
      }
      if (!travelInfo.TravelFrom) {
        travelInfo.FromErrorMessage = 'Du har inte angivit någon avgång';
      }
      if (!travelInfo.TravelTo) {
        travelInfo.ToErrorMessage = 'Du har inte angivit någon destination';
      }
        
      console.log(travelInfo.FromErrorMessage);
      console.log(travelInfo.TravelTo);
      console.log(travelInfo.ToErrorMessage);


      if (!travelInfo.TravelDate) {
        travelInfo.DateErrorMessage = 'Inget datum angivet';
      } else {
        travelInfo.DateErrorMessage = null;
      }
      if (travelInfo.TravelFrom) {
        let fromTemp = travelInfo.TravelFrom.toLowerCase();
        travelInfo.TravelFrom = capitalizeInput(fromTemp);
      }
      if (travelInfo.TravelTo) {
        let toTemp = travelInfo.TravelTo.toLowerCase();
        travelInfo.TravelTo = capitalizeInput(toTemp);
      }
      updateContext(travelInfo);
    }

    function capitalizeInput(input) {
      input = input.slice(0, 1).toUpperCase() + input.slice(1, input.length);
      return input;
    }

    function trimContext() {

      context.FromErrorMessage = null;
      context.FromCharErrorMessage = null;

      context.ToErrorMessage = null;
      context.ToCharErrorMessage = null;

      context.DateErrorMessage = null;
    }

    // handleClick();

    return (
      <div>
        <div className="input-search">
          <input maxLength={35} className="input" placeholder="Från:" name="TravelFrom" value={setTravelInfo.TravelFrom} onChange={handleChange} />
        </div>
        <div className="departure-error" style={{ fontWeight: 'bold' }}>
          {travelInfo.FromErrorMessage}
          {travelInfo.FromCharErrorMessage}
        </div>

        <div className="input-search">
          <input maxLength={35} className="input" placeholder="Till:" name="TravelTo" value={setTravelInfo.TravelTo} onChange={handleChange} />
        </div>
        <div className="destination-error" style={{ fontWeight: 'bold' }}>
          {travelInfo.ToErrorMessage}
          {travelInfo.ToCharErrorMessage}
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
          <input className="input-color" placeholder="ÅÅÅÅ-MM-DD" type="date" name="TravelDate" onChange={handleChange}></input>
        </div>

        <div className="input-search" style={{ fontWeight: 'bold' }}>
          {travelInfo.DateErrorMessage}
        </div>

        <div className="search-btn">
          <button type="button" onClick={() => handleClick()}>Sök</button>
        </div>
      </div>
    );
  }

  export default HomePage;
