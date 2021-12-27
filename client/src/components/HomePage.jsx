import React from 'react'
import { useNavigate } from 'react-router-dom';

function Tickets(props) {
  let ticketOptions = [];
  let amount = props.amount
  for (let i = 0; i < amount; i++) {
    ticketOptions.push(<option value="{i+1}">{i+1} Biljett</option>);
  }
  return ticketOptions;
}

function HomePage() {

  let navigate = useNavigate();

  function handleClick() {
    navigate("/SearchResults");
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
            <Tickets amount="8"/>
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