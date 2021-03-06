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
  const [ArrayOfStations, setArrayOfStations] = useState([]);

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

  useEffect(() => {
    const url = "api/TrainStation/";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setArrayOfStations(json);
      } catch (error) {
        console.log("error", error);
      }
    } 
    fetchData(); 
  }, []);

  function checkErrorMessages(){
    let valid = false;
    if(!travelInfo.FromErrorMessage
      && !travelInfo.ToErrorMessage
      && !travelInfo.ToCharErrorMessage
      && !travelInfo.FromCharErrorMessage
      && !travelInfo.FromExistsErrorMessage
      && !travelInfo.ToExistsErrorMessage
      && !travelInfo.IdenticalErrorMessage
      && !travelInfo.DateErrorMessage){
        valid = true;
      }
      return valid;
  }

  function handleClick() {
    
    validateInput();
    checkLocations(travelInfo.TravelFrom, travelInfo.TravelTo);
    if (checkErrorMessages()) {
      trimContext();
      navigate('/SearchResultsPage');
    } else {
      navigate('/');
    }
  }

  function checkLocations(departure, arrival) {

    if(departure == arrival && departure && arrival){
      travelInfo.IdenticalErrorMessage = 'V??nligen ange tv?? olika stationer'
    } else {

      if(!travelInfo.FromErrorMessage){
        if(!travelInfo.FromCharErrorMessage){
          travelInfo.FromExistsErrorMessage = 'Hittade inga resor fr??n den ??nskade avg??ngsorten';
        }
      }
      if(!travelInfo.ToErrorMessage){
        if(!travelInfo.ToCharErrorMessage){
          travelInfo.ToExistsErrorMessage = 'Hittade inga resor till den ??nskade destinationen';
        }
      }

      ArrayOfStations.forEach(station => {
        if(departure == station.Location){
          travelInfo.FromExistsErrorMessage = null;
        }else if (arrival == station.Location){
          travelInfo.ToExistsErrorMessage = null;
        }
      });
    }
      
  }

  function resetErrors() {
    travelInfo.ToCharErrorMessage = null;
    travelInfo.ToErrorMessage = null;
    travelInfo.FromCharErrorMessage = null;
    travelInfo.FromErrorMessage = null;
    travelInfo.IdenticalErrorMessage = null;
    travelInfo.FromExistsErrorMessage = null;
    travelInfo.ToExistsErrorMessage = null;
  }

  

  function validateInput() {
    
    resetErrors();

    if(travelInfo.ToExistsErrorMessage == null || travelInfo.FromExistsErrorMessage == null){
        const valid = new RegExp(/[^a-zA-Z???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????]/)
        if(valid.test(travelInfo.TravelFrom)){
          travelInfo.FromCharErrorMessage = 'V??nligen ange enbart bokst??ver f??r avg??ng';
        } 
        if(valid.test(travelInfo.TravelTo)){
          travelInfo.ToCharErrorMessage = 'V??nligen ange enbart bokst??ver f??r destination';
        }
        if (!travelInfo.TravelFrom) {
          travelInfo.FromErrorMessage = 'Du har inte angivit n??gon avg??ng';
        }
        if (!travelInfo.TravelTo) {
          travelInfo.ToErrorMessage = 'Du har inte angivit n??gon destination';
        }
      }
      
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
          <input maxLength={35} className="input" placeholder="Fr??n:" name="TravelFrom" value={setTravelInfo.TravelFrom} onChange={handleChange} />
        </div>
        <div className="departure-error" style={{ fontWeight: 'bold' }}>
          {travelInfo.FromExistsErrorMessage}
          {travelInfo.FromErrorMessage}
          {travelInfo.FromCharErrorMessage}
        </div>

        <div className="input-search">
          <input maxLength={35} className="input" placeholder="Till:" name="TravelTo" value={setTravelInfo.TravelTo} onChange={handleChange} />
        </div>
        <div className="destination-error" style={{ fontWeight: 'bold' }}>
          {travelInfo.ToExistsErrorMessage}
          {travelInfo.ToErrorMessage}
          {travelInfo.ToCharErrorMessage}
          {travelInfo.IdenticalErrorMessage}
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
          <input className="input-color" placeholder="????????-MM-DD" type="date" name="TravelDate" onChange={handleChange}></input>
        </div>

        <div className="destination-error" style={{ fontWeight: 'bold' }}>
          {travelInfo.DateErrorMessage}
        </div>

        <div className="search-btn">
          <button type="button" onClick={() => handleClick()}>S??k</button>
        </div>
      </div>
    );
  }

  export default HomePage;
