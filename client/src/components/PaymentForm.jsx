import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PaymentForm(props) {
  const navigate = useNavigate();
  const [paymentFormData, setPaymentFormData] = useState({
    phoneNumber: "",
  });

  const bookingData = props.data ?? {};
  const payeeAlias = "1231181189";
  const price = bookingData.Price;
  // const message = "TrainCompany trip from ... to ...on date";
  const payeePaymentReference = "TripReference"; // TODO: implement

  function handlePhoneNumberChange(event) {
    setPaymentFormData({
      ...paymentFormData,
      [event.target.name]: event.target.value.trim(),
    });
  }

  function handlePaymentSubmit(event) {
    event.preventDefault();
    let phoneNumber =
      paymentFormData.phoneNumber[0] === 0
        ? paymentFormData.phoneNumber.slice(1)
        : paymentFormData.phoneNumber;
    let paymentData = {
      payeePaymentReference: payeePaymentReference,
      callbackUrl: "https://example.com/callback",
      payerAlias: "46" + phoneNumber,
      payeeAlias: payeeAlias,
      amount: price,
      currency: "SEK",
      message: "Trip to: ???",
    };
    (async () => {
      const paymentResult = await createPayment(paymentData);
      alert(paymentResult);
      const bookingResult = await createBooking(bookingData);
      const navState = { bookingId: bookingResult.lastInsertRowid};
      if (bookingResult.changes > 0) {
        navigate('/BookingConfirmation', { state: navState });
      }
    })();
  }

  async function createPayment(data) {
    const result = await axios.post("/api/swish/paymentrequest", data);
    return result.data;
  }

  async function createBooking(data) {
    const traveller = {
      FirstName: data.FirstName,
      LastName: data.LastName,
      Email: data.Email,
      PhoneNumber: data.PhoneNumber,
    };
    const travellerResult = await postTraveller(traveller);

    if (travellerResult.changes === 0) { return; }
    const bookingResult = await postBooking(travellerResult.lastInsertRowid, price);
    await postScheduleStages(
      bookingResult.lastInsertRowid,
      bookingData.ScheduleIds,
      bookingData.Seats
    );
    return bookingResult;
  }

  async function postTraveller(traveller) {
    const result = await axios.post("/api/Traveller", traveller);
    return result.data;
  }

  async function postBooking(travellerId, price) {
    const body = {
      TravellerId: travellerId,
      Price: price,
      BookingCode: getNewBookingCode(),
      ManipulationCode: getNewManipulationCode(),
    };
    const result = await axios.post("/api/Booking", body);
    return result.data;
  }

  function getRandomInt(inclusiveMin, exclusiveMax) {
    inclusiveMin = Math.ceil(inclusiveMin);
    exclusiveMax = Math.floor(exclusiveMax);
    return Math.floor(Math.random() * (exclusiveMax - inclusiveMin) + inclusiveMin);
  }

  function getNewBookingCode() {
    // TODO: check for duplicates and move to API
    let bookingCode = "";
    for (let i = 0; i < 6; i++) {
      let charCode = getRandomInt(48, 91);
      charCode = ((charCode < 58) || (charCode > 64)) ? charCode : charCode-7; // only numbers and letters
      bookingCode += String.fromCharCode(charCode);
    }

    return bookingCode;
  }

  function getNewManipulationCode() {
    // TODO: check for duplicates and move to API
    let bookingManipulationCode = "";
    for (let i = 0; i < 8; i++) {
      let charCode = getRandomInt(48, 91);
      charCode = ((charCode < 58) || (charCode > 64)) ? charCode : charCode-7; // only numbers and letters
      bookingManipulationCode += String.fromCharCode(charCode);
    }

    return bookingManipulationCode;
  }

  async function postScheduleStages(bookingId, scheduleIds, seats) {
    let scheduleStages = [];
    for (let i = 0; i < scheduleIds.length; i++) {
      for (let j = 0; j < seats[i].length; j++) {
        scheduleStages.push({
          ScheduleId: scheduleIds[i],
          SeatNumber: seats[i][j],
          BookingId: bookingId
        });
      }
    }
    return await Promise.all(scheduleStages.map(async (stage) => {
      const result = await axios.post("/api/ScheduleStage", stage)
      return result.data;
    }));
  }

  return (
    <div>
      <div className="input-form">
        <form onSubmit={handlePaymentSubmit}>
          <label>
            Telefonnummer:
            <input
              type="tel"
              pattern="[0-9]{8,15}"
              name="phoneNumber"
              value={paymentFormData.phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </label>
          <input type="submit" value="Betala" />
        </form>
      </div>
    </div>
  );
}

export default PaymentForm;
