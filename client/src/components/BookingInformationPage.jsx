import { useNavigate } from 'react-router-dom';
// import '../css/searchresult.css';


function BookingInformationPage() {

  let navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }

  return (
    <main>
      <h2>Booking Information</h2>

      <div className="input-search input-firstname">
        <input></input>
      </div>
      <div className="input-search input-lastname">
        <input></input>
      </div>
      <div className="input-search input-email">
        <input type="email"></input>
      </div>
      <div className="input-search input-phonenumber">
        <input type="tel"></input>
      </div>


      <div className="current-total-price-div">
        <p>Total price: XXXXKR</p>
        <div className="search-btn">
          <button type="button" onClick={handleClick}>Continue</button>
        </div>
      </div>

    </main>
  );
};

export default BookingInformationPage;