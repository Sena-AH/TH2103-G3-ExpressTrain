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
  
  const [TravelFromErr, setTravelFromErr] = useState(false);
  const [TravelToErr, setTravelToErr] = useState(false);

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

  function validateInput() {

    const valid = new RegExp(/[^a-zA-ZåäöÅÄÖ]/)
    if (valid.test(travelInfo.TravelFrom) || valid.test(travelInfo.TravelTo)) {
      if(valid.test(travelInfo.TravelFrom) && valid.test(travelInfo.TravelTo)){
        travelInfo.LocationErrorMessage = 'Vänligen ange enbart bokstäver för avgång och destination';
      } else if(valid.test(travelInfo.TravelFrom)){
        travelInfo.LocationErrorMessage = 'Vänligen ange enbart bokstäver för din avgång';
      } else {
        travelInfo.LocationErrorMessage = 'Vänligen ange enbart bokstäver för din destination';
      }   
    }else if(!travelInfo.TravelFrom && !travelInfo.TravelTo) {
      travelInfo.LocationErrorMessage = 'Vänligen fyll i både avgång och destination';
    } else {
      if (!travelInfo.TravelTo) {
        travelInfo.LocationErrorMessage = 'Du har inte angivit någon destination';
      } else if (!travelInfo.TravelFrom) {
        travelInfo.LocationErrorMessage = 'Du har inte angivit någon avgång';
      } else {
        travelInfo.LocationErrorMessage = null;
      }
    }


    

    console.log(TravelFromErr);
    console.log(TravelToErr);

    if (!travelInfo.TravelDate) {
      travelInfo.DateErrorMessage = 'Inget datum angivet';
    } else {
      travelInfo.DateErrorMessage = null;
    }
    let fromTemp = travelInfo.TravelFrom.toLowerCase();
    let toTemp = travelInfo.TravelTo.toLowerCase();

    travelInfo.TravelFrom = capitalizeInput(fromTemp);
    travelInfo.TravelTo = capitalizeInput(toTemp);

    updateContext(travelInfo);
    console.log(travelInfo.TravelFrom);
    console.log(travelInfo.TravelTo);

  }

  function capitalizeInput(input) {
    input = input.slice(0, 1).toUpperCase() + input.slice(1, input.length);
    return input;
  }

  function trimContext() {
    context.DateErrorMessage = null;
    context.LocationErrorMessage = null;
  }

  // handleClick();

  return (
    <div>
      <div className="input-search">
        <input maxLength={35} className="input" placeholder="Från:" name="TravelFrom" value={setTravelInfo.TravelFrom} onChange={handleChange} />
      </div>
      <div className="input-search">
        <input maxLength={35} className="input" placeholder="Till:" name="TravelTo" value={setTravelInfo.TravelTo} onChange={handleChange} />
      </div>
      <div className="input-search" style={{ fontWeight: 'bold' }}>
        {travelInfo.LocationErrorMessage}
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
