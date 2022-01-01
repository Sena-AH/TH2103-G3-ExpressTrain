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
    //let data = { FirstName, LastName, Email, PhoneNumber }

    updateContext({
      // TravellerAmount: '1',
      // Schedules: [{
      //   ScheduleId: '3',
      //   CartId: '1',
      //   DepartureTrainStationId: '3',
      //   DeparturePlatformId: '2',
      //   DestinationTrainStationId: '2',
      //   DestinationPlatformId: '3',
      //   DepartureTime: '2021-12-26 17:30:00',
      //   ArrivalTime: '2021-12-26 20:15:00'
      // }],
      // Price: 7896,
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
        <p>Total price: {context.Price}KR</p>
        <div className="search-btn">
          <button type="button" onClick={saveData}>Spara och Fortsätt</button>
        </div>
      </div>
    </div>

  );
}
export default BookingForm;