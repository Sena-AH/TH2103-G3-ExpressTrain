import { useNavigate } from 'react-router-dom';


function HomePage() {

  let navigate = useNavigate();

  function handleClick() {
    navigate("/SearchResultsPage");
  }

  return (
    <main>
      <div className="input-search">
        <input value="To"></input>
      </div>
      <div className="input-search">
        <input value="From"></input>
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

    </main>
  );
};

export default HomePage;