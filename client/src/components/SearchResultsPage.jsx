import { useNavigate } from 'react-router-dom';
import '../css/searchresult.css';
import React, { useState, useRef, useEffect } from 'react' 

<<<<<<< HEAD
function SearchResults() {
=======
function Tickets(props) {
  let ticketOptions = [];
  let amount = props.amount
  for (let i = 0; i < amount; i++) {
    ticketOptions.push(<option value="{i+1}">{i+1} Biljett</option>);
  }
  return ticketOptions;
}
>>>>>>> main

  const [DepartureStation, setDepartureStation]=useState("");
  const [ArrivalStation, setArrivalStation]=useState("");
  const [OutputDeparture, setOutputDeparture]=useState("");
  const [OutputArrival, setOutputArrival]=useState("");
  const [TotalCost, setTotalCost]=useState("");
  const [DepartureTime, setDepartureTime]=useState("");
  const [ArrivalTime, setArrivalTime]=useState("");
  const [ListOfStations, setListOfStations]=useState("");

  let navigate = useNavigate();

  function handleClick() {
    navigate("/SearchResultsPage");
    navigate("/SearchResults");
  }

  function handleClick2() {
    navigate("/BookingInformationPage");
    navigate("/BookingInformation");
  }
  function handleClick3() {
    console.log("hello");
  }
  function handleClick4() {
    console.log("hello to you too");
  }

  useEffect(()=>{
    const url = "api/TrainStation/";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
      } catch (error) {
        console.log("error", error);
      }
    };
    
    
    fetchData();
  },[]);
  
  // response.forEach(e =>  {
  //   try{
  //     if(e.Name === {ArrivalStation}){
  //     setOutputArrival({ArrivalStation})

  //   }
  //   } catch (error) {
  //     console.log('arrival station not set', error)
  //   }
    
  // });
  function applyInformation(){

  }


  return (
    <main>
<<<<<<< HEAD
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
          <option value="2">2 biljetter</option>
          <option value="3">3 biljetter</option>
          <option value="4">4 biljetter</option>
          <option value="5">5 biljetter</option>
          <option value="6">6 biljetter</option>
          <option value="7">7 biljetter</option>
          <option value="8">8 biljetter</option>
        </select>
      </div>

      <div className="input-date">
        <input type="date"></input>
      </div>

=======
      <div className="wrapper">
        <div className="input-search">
          <input className="input" placeholder="Till:"></input>
        </div>
        <div className="input-search">
          <input className="input" placeholder="Från:"></input>
        </div>
>>>>>>> main

        <form className="input-form" action="">
        <div className="switch">
                    <input type="radio"
                           className="switch-input"
                           name="view"
                           value="oneway"
                           id="oneway"
                    />
                    <label htmlFor="oneway" className="switch-label switch-label-off">Enkelresa</label>

<<<<<<< HEAD
      <div className="search-btn">
        <button type="button" onClick={handleClick}>Sök</button>
      </div>

      <div className="filter-menu input-tickets">
        <select name="Filter" id="filter">
          <option value="low-high">Pris: Lågt till högt</option>
          <option value="Price high to low">Pris: Högt till lågt</option>
          <option value="Fastest route">Kortast restid</option>
          <option value="Recommended tickets">Rekommenderad resa</option>
        </select>
      </div>

      <div className="search-result-div">
        <button onClick={handleClick3} className="search-result-button">
          <span>{DepartureStation} - {ArrivalStation}</span>
          <br></br>
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
=======
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
>>>>>>> main
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

export default SearchResults;