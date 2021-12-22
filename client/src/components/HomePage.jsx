import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react'


function HomePage() {
  
  const [DepartureInput, setDepartureinput]=useState("");
  const [ArrivalInput, setArrivalInput]=useState("");

  let navigate = useNavigate();

  function handleClick() {
    navigate("/SearchResultsPage");
  }

  return (
    <main>
      <div className="input-search">
        <input type="text" value={DepartureInput} placeholder="Vart vill du åka från?" onChange={(e)=>setDepartureinput(e.target.value)}></input>
      </div>
      <div className="input-search">
        <input type="text" value={ArrivalInput} placeholder="Vart vill du åka till?" onChange={(e)=>setArrivalInput(e.target.value)}></input>
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
        <button type="button" onClick={handleClick}>Search</button>
      </div>

    </main>
  );
};

export default HomePage;