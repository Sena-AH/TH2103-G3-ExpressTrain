import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../App';


function BookingForm(props) {
  const [context, updateContext] = useContext(Context);
  
  const [navState, updateNavState] = useState({
    TravellerAmount: context.TravellerAmount,
    FirstTrip: {
      ScheduleId: context.FirstTrip?.ScheduleId ?? 0,
      Price: context.FirstTrip?.Price ?? 0
    },
    SecondTrip: {
      ScheduleId: context.SecondTrip?.ScheduleId ?? 0,
      Price: context.SecondTrip?.Price ?? 0
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
    updateNavState({
      ...navState,
      ['Traveller' + event.target.name]: event.target.value.trim(),
    });
  }

  function submitData() {
    navigate('/SeatsPage', { state: navState });
  }

  useEffect(() => {
    console.log(context);
  }, []);

  return (
    <div>
      <h2>Bokningsinformation</h2>
      <div className="input-search">
        <input
          className="input"
          type="text"
          name="FirstName"
          placeholder="Förnamn"
          value={navState.TravellerFirstName}
          onChange={handleChange} />
      </div>

      <div className="input-search">
        <input
          className="input"
          type="text"
          name="LastName"
          placeholder="Efternamn"
          value={navState.TravellerLastName}
          onChange={handleChange} />
      </div>

      <div className="input-search">
        <input
          className="input"
          type="text"
          name="Email"
          placeholder="E-mail"
          value={navState.TravellerEmail}
          onChange={handleChange} />
      </div>

      <div className="input-search">
        <input
          className="input"
          type="text"
          name="PhoneNumber"
          placeholder="Telefonnummer"
          value={navState.TravellerPhoneNumber}
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