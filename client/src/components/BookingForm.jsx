import React, { useState } from 'react'
function BookingForm() {
 const [FirstName, setFirstName]=useState("");
 const [LastName, setLastName]=useState("");
 const [Email, setEmail]=useState("");
 const [PhoneNumber, setPhoneNumber]=useState("");
function saveData()
{
  let data={FirstName, LastName, Email, PhoneNumber}
// console.warn(data);
  fetch("/api/User", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(data)
  }).then((resp)=>{
    // console.warn("resp",resp);;
    resp.json().then((result)=>{
      console.warn("result",result)
    })
  })
}
  return (
    <div className="bookingform">
      <input className="input-form" type="text" name="FirstName" value={FirstName} onChange={(e)=>{setFirstName(e.target.value)}}  /> <br /> <br />
      <input className="input-form" type="text" name="LastName"  value={LastName} onChange={(e)=>{setLastName(e.target.value)}} /> <br /> <br />
      <input className="input-form" type="text" name="Email"  value={Email} onChange={(e)=>{setEmail(e.target.value)}}/> <br /> <br />
      <input className="input-form" type="text" name="PhoneNumber"  value={PhoneNumber} onChange={(e)=>{setPhoneNumber(e.target.value)}}/> <br /> <br />

      <div className="current-total-price-div">
        <p>Total price: XXXXKR</p>
        <div className="search-btn">
          <button type="button" onClick={saveData}>Continue</button>
        </div>
      </div>
    </div>
    
  );
}
export default BookingForm;