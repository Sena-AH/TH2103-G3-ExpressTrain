import { useNavigate } from 'react-router-dom';


function HomePage() {

  let navigate = useNavigate();

  function handleClick() {
    navigate("/SearchResultsPage");
  }

  return (
    <main>
      <div className="input-search">
        <input></input>
      </div>
      <div className="input-search">
        <input></input>
      </div>

      <form className="input-form" action="">
        <div>
          <input type="radio" id="oneWay" name="travelWay" value="oneWay" />
          <label htmlFor="oneWay">One Way</label>
        </div>
        <div>
          <input type="radio" id="roundTrip" name="travelWay" value="roundTrip" />
          <label htmlFor="roundTrip">Round Trip</label>
        </div>
      </ form>

      <div className="input-tickets">
        <select name="tickets" id="tickets">
          <option value="1">1 ticket</option>
          <option value="2">2 tickets</option>
          <option value="3">3 tickets</option>
          <option value="4">4 tickets</option>
          <option value="5">5 tickets</option>
          <option value="6">6 tickets</option>
          <option value="7">7 tickets</option>
          <option value="8">8 tickets</option>
        </select>
      </div>

      <div className="input-date">
        <input type="date"></input>
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

    </main>
  );
};

export default HomePage;