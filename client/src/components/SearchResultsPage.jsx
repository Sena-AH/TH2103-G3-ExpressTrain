import { useNavigate } from 'react-router-dom';
import '../css/searchresult.css';
import React, { useState, useRef, useEffect } from 'react'

function HomePage() {

  const [DepartureStation, setDepartureStation]=useState("");
  const [ArrivalStation, setArrivalStation]=useState("");

  let navigate = useNavigate();

  function handleClick() {
    navigate("/SearchResultsPage");
  }

  function handleClick2() {
    navigate("/BookingInformationPage");
  }
  function handleClick3() {
    console.log("hello");
  }
  function handleClick4() {
    console.log("hello to you too");
  }


  let data = {ArrivalStation, DepartureStation}
  fetch("/api/TrainStation", {
    method: "GET",
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },

  })

  return (
    <main>
      <div className="input-search">
        <input type="text" placeholder='Vart vill du åka från?' value={DepartureStation} onChange={(e)=>setDepartureStation(e.target.value)}></input>
      </div>
      <div className="input-search">
        <input type="text" placeholder='Vart skall du åka till?' value={ArrivalStation} onChange={(e)=>setArrivalStation(e.target.value)}></input>
      </div>

      <form className="input-form" action="">
        <div>
          <input type="radio" id="oneWay" name="travelWay" value="oneWay" />
          <label htmlFor="oneWay">Enkelresa</label>
        </div>
        <div>
          <input type="radio" id="roundTrip" name="travelWay" value="roundTrip" />
          <label htmlFor="roundTrip">Tur & Retur</label>
        </div>
      </ form>

      <div className="input-tickets">
        <select name="tickets" id="tickets">
          <option value="1">1 biljett</option>
          <option value="2">2 biljett</option>
          <option value="3">3 biljett</option>
          <option value="4">4 biljett</option>
          <option value="5">5 biljett</option>
          <option value="6">6 biljett</option>
          <option value="7">7 biljett</option>
          <option value="8">8 biljett</option>
        </select>
      </div>

      <div className="input-date">
        <input type="date"></input>
      </div>

      <div className="search-btn">
        <button type="button" onClick={handleClick}>Sök</button>
      </div>

      <div className="filter-menu input-tickets">
        <select name="Filter" id="filter">
          <option value="Price low to high">Pris: Lågt till högt</option>
          <option value="Price high to low">Pris: Högt till lågt</option>
          <option value="Fastest route">Kortast restid</option>
          <option value="Recommended tickets">Rekommenderad resa</option>
        </select>
      </div>

      <div className="search-result-div">
        <button onClick={handleClick3} className="search-result-button">
          <span>{ArrivalStation} - {DepartureStation}</span>
          <span>XX:XX - XX:XX</span>
          <br></br>
          <span className="travel-duration">XXH XXM</span>
          <br></br>
          <span>__________________</span>
          <br></br>
          <span>Pris : XXXXKR</span>
        </button>
        <button onClick={handleClick4} className="search-result-button">
          <span>XX:XX - XX:XX</span>
          <br></br>
          <span className="travel-duration">XXH XXM</span>
          <br></br>
          <span>__________________</span>
          <br></br>
          <span>Pris : XXXXKR</span>
        </button>
      </div>

      <div className="current-total-price-div">
        <p>Totalkostnad: XXXXKR</p>
        <div className="search-btn">
          <button type="button" onClick={handleClick2}>Fortsätt</button>
        </div>
      </div>

    </main>
  );
};

export default HomePage;