import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
//import index from '../../../server'


// 2Do
// ScheduleId
// Hämta alla carts med ScheduleId xxx
// Hämta antalet säten i dessa carts
// Kolla vilka som är upptagna
// Rita ut i frontenden


function SeatsForm() {
    // nödvändiga const
    const [CartId, setCartId] = useState('1'); // Ska komma med från föregående sida
    const [SeatAmount, setSeatAmount] = useState('');
    const [travellerAmount, setTravellerAmount] = useState('');
    const [scheduleId, setScheduleId] = useState('3');


    async function getData() {
        console.log('getData start')
        // Hämta SeatAmount i cart
        const response = await fetch('/api/Cart');
        const data = await response.json();

        
        console.log(data);

        //SeatAmount = data[CartId];
        console.log(data[CartId]);
        setSeatAmount(data[CartId].SeatAmount);
    }
    return (
        <div class="WholePage">
            <button class="TotalPriceContinueButton" onClick={getData()}>Visa lediga platser</button>


            <h1 class="Title">Sittplatser</h1>

            <div class="TrainCarts">
            </div>

            <div class="TotalPrice">
                <p class="TotalPriceText">PRIS TOTALT: XXX KR</p>
                {/* <button class="TotalPriceContinueButton" onClick={getData}>Fortsätt</button> */}
                Antal sittplatser: {SeatAmount}


            </div>
        </div>
    );
};

export default SeatsForm;