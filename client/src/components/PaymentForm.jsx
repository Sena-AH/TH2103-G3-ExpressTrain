import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import "../css/PaymentForm.css"

function PaymentForm(props) {
  const navigate = useNavigate();
  const [paymentFormData, setPaymentFormData] = useState({
    phoneNumber: "",
  });

  const bookingData = props.data ?? {};
  const payeeAlias = "1231181189";
  const price = bookingData.Price;
  const payeePaymentReference = uuidv4().split('-').join('');

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
      message: "Express Train",
    };
    (async () => {
      const paymentResult = await createPayment(paymentData);
      // alert message to show the swish url.
      // alert(paymentResult);
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
    };
    const result = await axios.post("/api/Booking", body);
    return result.data;
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
    <div className="paymentform-font">
      <div className="input-payment-form">
        <form onSubmit={handlePaymentSubmit}>
          <label className="label-telephone-swish bold">
            Telefonnummer:
            <input
              className="telephone-swish-input"
              type="tel"
              pattern="[0-9]{8,15}"
              name="phoneNumber"
              value={paymentFormData.phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </label>
          <input className="payment-swish-input" type="submit" value="Betala" />
        </form>
      </div>
    </div>
  );
}

export default PaymentForm;
