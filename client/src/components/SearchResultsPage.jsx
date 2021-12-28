import { useNavigate } from 'react-router-dom';
import '../css/searchresult.css';

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

  function handleClick2() {
    navigate("/BookingInformation");
  }
  function handleClick3() {
    console.log("hello");
  }
  function handleClick4() {
    console.log("hello to you too");
  }

  return (
    <main>
      <div className="wrapper">
        <div className="input-search">
          <input className="input" placeholder="Till:"></input>
        </div>
        <div className="input-search">
          <input className="input" placeholder="Från:"></input>
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
          <button type="button" onClick={handleClick}>Search</button>
        </div>

        <div className="filter-menu input-tickets">
          <select name="Filter" id="filter">
            <option value="Price low to high">Price low to high</option>
            <option value="Price high to low">Price high to low</option>
            <option value="Fastest route">Fastest route</option>
            <option value="Recommended tickets">Recommended tickets</option>
          </select>
        </div>

        <div className="search-result-div">
          <button onClick={handleClick3} className="search-result-button">
            <span>XX:XX - XX:XX</span>
            <br></br>
            <span className="travel-duration">XXH XXM</span>
            <br></br>
            <span>__________________</span>
            <br></br>
            <span>Price : XXXXKR</span>
          </button>
          <button onClick={handleClick4} className="search-result-button">
            <span>XX:XX - XX:XX</span>
            <br></br>
            <span className="travel-duration">XXH XXM</span>
            <br></br>
            <span>__________________</span>
            <br></br>
            <span>Price : XXXXKR</span>
          </button>
        </div>

        <div className="current-total-price-div">
          <p>Total price: XXXXKR</p>
          <div className="search-btn">
            <button type="button" onClick={handleClick2}>Continue</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;