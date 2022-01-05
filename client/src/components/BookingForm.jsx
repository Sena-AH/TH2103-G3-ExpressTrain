import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';

function BookingForm(props) {
  const [context, updateContext] = useState({
    TravellerAmount: 2,
    FirstTrip: {
      ScheduleId: 3,
      Price: 599
    },
    SecondTrip: {
      ScheduleId: 2,
      Price: 985
    },
    FirstTripSeats: [],
    SecondTripSeats: [],
    TravellerFirstName: "",
    TravellerLastName: "",
    TravellerEmail: "",
    TravellerPhoneNumber: ""
  });
  let navigate = useNavigate();

  function handleChange(event) {
    updateContext({
      ...context,
      ['Traveller' + event.target.name]: event.target.value.trim(),
    });
  }

  function submitData() {
    navigate('/SeatsPage', { state: context });
  }

  return (
    <div>
      <h2>Bokningsinformation</h2>
      <div className="input-search">
        <input
          className="input"
          type="text"
          name="FirstName"
          placeholder="Förnamn"
          value={context.TravellerFirstName}
          onChange={handleChange} />
      </div>

      <div className="input-search">
        <input
          className="input"
          type="text"
          name="LastName"
          placeholder="Efternamn"
          value={context.TravellerLastName}
          onChange={handleChange} />
      </div>

      <div className="input-search">
        <input
          className="input"
          type="text"
          name="Email"
          placeholder="E-mail"
          value={context.TravellerEmail}
          onChange={handleChange} />
      </div>

      <div className="input-search">
        <input
          className="input"
          type="text"
          name="PhoneNumber"
          placeholder="Telefonnummer"
          value={context.TravellerPhoneNumber}
          onChange={handleChange} />
      </div>

      <div className="current-total-price-div">
        <div className="search-btn">
          <button type="button" onClick={submitData}>Spara och Fortsätt</button>
        </div>
      </div>
    </div>

  );
}
export default BookingForm;