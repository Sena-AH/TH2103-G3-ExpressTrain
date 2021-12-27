import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../css/myBookingsPage.css';

function MyBookingsPage() {
  let navigate = useNavigate();
  const [idIsValid, setIdIsValid] = useState(true);
  const [formData, updateFormData] = useState({
    bookingId: ""
  });

  // in order to be able to change the state we need this function. without it you can't type the Id on the input.
  function handelChange(event) {
    updateFormData({
      // we are targeting the input field, the name is the key, and the value would be the value, we are telling which formdata element to change.
      ...formData, [event.target.name]: event.target.value.trim()
    });
    setIdIsValid(true);
  }

  // checking if its a valid booking number, if true then it lets you go onto the next page.
  function handleSubmit(event) {
    // this prevents the default behavior of the form. I want the page here to only show /MyBookingsPage with no other values once a booking id is submitted.
    event.preventDefault();
    (async () => {
      if (await bookingIdIsValid(formData.bookingId)) {
        navigate('/MyBookings2Page', {state: formData});
      }
    })();
    setIdIsValid(false);
  }

  // we check if boking is valid, we use if its a number (isNaN from javascript library) and if the booking exists.
  async function bookingIdIsValid(id) {
    return (!isNaN(id) && await bookingExists(id));
  }

  // we make a call to the api to check if the booking is there. We are only looking for the response.
  async function bookingExists(id) {
    return await fetch(`/api/booking/${id}`)
      .then(response => {
        return response.ok;
      });
  }

    return (
    <main>
        <div>
          <div>
            <h1 className="page-title">Min bokning</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="my-bookings-search">
              {/* ternary; if its valid do nothing, otherwise '(Invalid booking-Id)' is printed */}
              <input className="search-bar" placeholder="Bokningsnummer" min="0" name="bookingId" value={formData.bookingId}
                     onChange={handelChange}/><div className="error-message">{idIsValid ? '' : '(Ogiltig Boknings-ID)'}</div>
            </div>
            <div className="search-btn">
              <input type="submit" value="Sök bokning"/>
            </div>
          </form>
        </div>
  </main>);
};

export default MyBookingsPage;