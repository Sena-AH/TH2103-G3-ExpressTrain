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
  fetch("/api/Traveller", {
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
    <div className="wrapper">
      <h2>Booking Information</h2>
      <div className="input-search"> 
        <input 
        className="input" 
        type="text" 
        name="FirstName" 
        placeholder="Förnamn"
        value={FirstName} 
        onChange={(e)=>{setFirstName(e.target.value)}}  />
        
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
        onChange={(e)=>{setLastName(e.target.value)}} /> 
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
        onChange={(e)=>{setEmail(e.target.value)}}/> 
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
        onChange={(e)=>{setPhoneNumber(e.target.value)}}/> 
        <br /> 
        <br />
      </div> 

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