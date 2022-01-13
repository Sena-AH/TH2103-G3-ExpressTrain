import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/myBookingsPage.css";

function MyBookingsPage() {
  let navigate = useNavigate();
  const [idIsValid, setIdIsValid] = useState(true);
  const [formData, updateFormData] = useState({
    bookingCode: "",
  });

  // in order to be able to change the state we need this function. without it you can't type the Id on the input.
  function handleChange(event) {
    updateFormData({
      // we are targeting the input field, the name is the key, and the value would be the value, we are telling which formdata element to change.
      ...formData,
      [event.target.name]: event.target.value.trim(),
    });
    setIdIsValid(true);
  }

  // checking if its a valid booking number, if true then it lets you go onto the next page.
  function handleSubmit(event) {
    // this prevents the default behavior of the form. I want the page here to only show /MyBookingsPage with no other values once a booking id is submitted.
    event.preventDefault();
    (async () => {
      if (await bookingExists(formData.bookingCode)) {
        // navigate('/MyBookingsInfo', {state: formData});
        navigate("/MyBookingsInfo", { state: formData });
        return;
      } else {
        setIdIsValid(false);
      }
    })();
  }

  // We make a call to the api to check if the booking is there. We are only looking for the response.
  async function bookingExists(code) {
    return await fetch(`/api/Booking/BookingCode/${code}`).then((response) => {
      return response.ok;
    });
  }

  function InvalidEntry(props) {
    return (<label for={props.for} className="invalid-input-label">* {props.message}</label>);
  }

  return (
    <>
      <h2 className="booking-title bold">Min bokning</h2>
      <form className="bookings-form" onSubmit={handleSubmit}>
        {idIsValid ? '' : <InvalidEntry for="booking-number" message="Ogiltig Bokningsnummer" />}
        <input
          className={"booking-input " + (idIsValid ? '' : 'invalid-input-field')}
          id="booking-number"
          placeholder="Bokningsnummer"
          min="0"
          name="bookingCode"
          value={formData.bookingCode}
          onChange={handleChange}
        />
        <input className="booking-btn" type="submit" value="Sök bokning" />
      </form>
    </>
  );
}

export default MyBookingsPage;
