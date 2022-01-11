import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../App';


function BookingForm(props) {
  const [context, updateContext] = useContext(Context);
  console.log(context);
  
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

  // validation script here
const inp_field = {
  FirstName: /^[a-zA-Z]{1,35}$/i,
  LastName: /^[a-zA-Z]{1,35}$/i,
  Email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
  PhoneNumber:/^\d{10}$/,
}

//spaces are not allowed in range
//select all the input fields and add an onkeyup event listener to them

const validate = (field, regex) => {
  regex.test(field.value) ? field.className = 'valid' : field.className = 'invalid';
}

let keys = document.querySelectorAll('input');
keys.forEach(item => item.addEventListener(
  'keyup', e => {
    validate(e.target, inp_field[e.target.attributes.name.value])
  }
));

  return (
    <div>
      <h2>Bokningsinformation</h2>
      <div className="input-search">
        <input
          id="FirstName"
          className="input"
          type="text"
          name="FirstName"
          title="förnamn får bara innehålla bokstäver. Exempel: Johan"
          placeholder="Förnamn"
          value={navState.TravellerFirstName}
          onChange={handleChange} 
          required
          />
      </div>

      <div className="input-search">
        <input
          id="LastName"
          className="input"
          type="text"
          name="LastName"
          title="Efternamn får bara innehålla bokstäver. Exempel: Johansson"
          placeholder="Efternamn"
          value={navState.TravellerLastName}
          onChange={handleChange} 
          required
          />
      </div>

      <div className="input-search">
        <input
          id="Email"
          className="input"
          type="text"
          name="Email"
          title="Email måste innehålla giltig e-postadress. Exempel: johansson@mail.com"
          placeholder="E-mail"
          value={navState.TravellerEmail}
          onChange={handleChange} 
          required
          />
      </div>

      <div className="input-search">
        <input
          id="PhoneNumber"
          className="input"
          type="text"
          name="PhoneNumber"
          title="Telefonnummer ska vara 10 tecken långt utan +46. Exempel 0701234567"
          placeholder="Telefonnummer"
          value={navState.TravellerPhoneNumber}
          onChange={handleChange} 
          required
          />
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