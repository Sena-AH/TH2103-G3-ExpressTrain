import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../css/myBookingsPage.css';

function MyBookingsPage() {
  let navigate = useNavigate();
  const [idIsValid, setIdIsValid] = useState(true);
  const [formData, updateFormData] = useState({
    bookingId: ""
  });

  function handelChange(event) {
    updateFormData({
      ...formData, [event.target.name]: event.target.value.trim()
    });
    setIdIsValid(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    (async () => {
      if (await bookingIdIsValid(formData.bookingId)) {
        navigate('/MyBookings2Page', {state: formData});
      }
    })();
    setIdIsValid(false);
  }

  async function bookingIdIsValid(id) {
    return (!isNaN(id) && await bookingExists(id));
  }

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
              <input className="search-bar" placeholder="Bokningsnummer" min="0" name="bookingId" value={formData.bookingId}
                     onChange={handelChange}/> {idIsValid ? '' : '(Invalid Booking-ID)'}
            </div>
            <div className="search-btn">
              <input type="submit" value="Sök bokning"/>
            </div>
          </form>
        </div>
  </main>);
};

export default MyBookingsPage;