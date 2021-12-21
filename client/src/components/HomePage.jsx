import React from 'react'
import { useNavigate } from 'react-router-dom';


function HomePage() {

  let navigate = useNavigate();

  function handleClick() {
    navigate("/SearchResultsPage");
  }




  return (
    <main>
      <div className="wrapper">
        <div className="input-search">
          <input className="input" placeholder="Till:" />
        </div>
        <div className="input-search">
          <input className="input" placeholder="Från:" />
        </div>

        <form className="input-form" action="">
          <div className="switch">
                    <input type="radio"
                           className="switch-input"
                           name="view"
                           value="oneway"
                           id="oneway"
                    />
                    <label htmlFor="oneway" className="switch-label switch-label-off">Enkelresa</label>

                    <input type="radio"
                           className="switch-input"
                           name="view"
                           value="roundtrip"
                           id="roundtrip"
                    />
                    <label htmlFor="roundtrip" className="switch-label switch-label-on">Tur & retur</label>
                    <span className="switch-selection"></span>
          </div>
        </ form>

        <div className="input-tickets">
          <select className="input-color" name="tickets" id="tickets">
            <option value="1">1 Biljett</option>
            <option value="2">2 Biljett</option>
            <option value="3">3 Biljett</option>
            <option value="4">4 Biljett</option>
            <option value="5">5 Biljett</option>
            <option value="6">6 Biljett</option>
            <option value="7">7 Biljett</option>
            <option value="8">8 Biljett</option>
          </select>
        </div>

        <div className="input-date">
          <input className="input-color" type="date"></input>
        </div>

        <div className="search-btn">
          <button type="button" onClick={handleClick}>Sök</button>
        </div>
      </div>
    </main>
  );
};

export default HomePage;