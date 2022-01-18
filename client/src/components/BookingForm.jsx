import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../App';
import '../css/bookingForm.css';


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
    if (isAllFieldsValid()) {
      navigate('/SeatsPage', { state: navState });
    } else {
      navigate('/BookingInformationPage', { state: navState });
    }
  }

  useEffect(() => {
    console.log(context);
  }, []);

  // validation script here
const inp_field = {
  FirstName: /^([a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð.-]+\s)*[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð.-]{1,35}$/g,
  LastName: /^([a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð.-]+\s)*[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð.-]{1,35}$/g,
  Email: /^([a-zA-Z\d\.-]+)@([a-zA-Z\d-]+)\.([a-zA-Z]{2,8})(\.[a-zA-Z]{2,8})?$/,
  PhoneNumber:/^\d{10}$/,
}

//spaces are not allowed in range
//select all the input fields and add an onkeyup event listener to them

const validate = (field, regex) => {
  regex.test(field.value) ? field.className = 'valid' : field.className = 'invalid';
}



function isAllFieldsValid () {
  let keys = document.querySelectorAll('input');
    let allFieldsValid = true;
    keys.forEach(item => {
      if (item.className != 'valid') {
        allFieldsValid = false;
      }
    });
  return allFieldsValid;
}

let keys = document.querySelectorAll('input');
keys.forEach(item => item.addEventListener(
  'keyup', e => {
    validate(e.target, inp_field[e.target.attributes.name.value])
    document.querySelector('#submitBookingForm').disabled=!isAllFieldsValid();
  }
));

  return (
    <div id="bookingForm" className='bookingForm'>
      <h1 className="page-title bookingForm-header">Bokningsinformation</h1>
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
          <button 
            type="button" 
            id="submitBookingForm"
            className="submit-button" 
            onClick={submitData}
          >
              Spara och Fortsätt
          </button>
        </div>
      </div>
    </div>

  );
}
export default BookingForm;