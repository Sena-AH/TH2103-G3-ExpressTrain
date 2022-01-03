import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../App'

function BookingForm() {
  const [context, updateContext] = useContext(Context)
  let navigate = useNavigate();

  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");

  function saveData() {

    updateContext({
      TravellerAmount: 2,
      FirstTrip: {
        ScheduleId: 3,
        Price: 599
      },
      SecondTrip: {
        ScheduleId: 2,
        Price: 985
      },
      Traveller: {
        FirstName: FirstName,
        Lastname: LastName,
        Email: Email,
        PhoneNumber: PhoneNumber
      }

    });
    navigate('/SeatsPage');
  }

  return (
    <div className="wrapper">
      <h2>Bokningsinformation</h2>
      <div className="input-search">
        <input
          className="input"
          type="text"
          name="FirstName"
          placeholder="Förnamn"
          value={FirstName}
          onChange={(e) => { setFirstName(e.target.value) }} />

        <br />
        <br />
      </div>

      <div className="input-search">
        <input
          className="input"
          type="text"
          name="LastName"
          placeholder="Efternamn"
          value={LastName}
          onChange={(e) => { setLastName(e.target.value) }} />
        <br />
        <br />
      </div>

      <div className="input-search">
        <input
          className="input"
          type="text"
          name="Email"
          placeholder="E-mail"
          value={Email}
          onChange={(e) => { setEmail(e.target.value) }} />
        <br />
        <br />
      </div>

      <div className="input-search">
        <input
          className="input"
          type="text"
          name="PhoneNumber"
          placeholder="Telefonnummer"
          value={PhoneNumber}
          onChange={(e) => { setPhoneNumber(e.target.value) }} />
        <br />
        <br />
      </div>

      <div className="current-total-price-div">
        <div className="search-btn">
          <button type="button" onClick={saveData}>Spara och Fortsätt</button>
        </div>
      </div>
    </div>

  );
}
export default BookingForm;