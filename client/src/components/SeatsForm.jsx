import React, { useState } from 'react'

// Hämta antalet säten
// Kolla vilka som är upptagna
// Rita ut i frontenden


function SeatsForm() {
    // nödvändiga const
    const [CartId, setCartId] = useState('1'); // Ska komma med från föregående sida
    const [SeatAmount, setSeatAmount] = useState('');

    async function getData() {
        console.log('tjohej')
        const response = await fetch('/api/Cart');
        const data = await response.json();
        console.log(data)

        //this.setState({ totalReactPackages: data.total })
        //SeatAmount = data[CartId];
        console.log(data[CartId]);
        setSeatAmount(data[CartId].SeatAmount);
    }
    return (
        <div class="WholePage" onLoad={getData}>


            <h1 class="Title">Sittplatser</h1>

            <div class="TrainCarts">
            </div>

            <div class="TotalPrice">
                <p class="TotalPriceText">PRIS TOTALT: XXX KR</p>
                <button class="TotalPriceContinueButton" onClick={getData}>Fortsätt</button>
                Antal sittplatser: {SeatAmount}


            </div>
        </div>
    );
};

export default SeatsForm;