import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../App'
// In i seats från Context: TravellerAmount, Schedules, Price, Traveller
// Sätts i Seats:
// Skickas vidare:
function SeatsViewSeats() {
    const [context, updateContext] = useContext(Context)
  let navigate = useNavigate();

    function GetContext() {
        // Denna update bara för utveckling, detta skall sättas i bokningsinformation
      
        console.log(context);
        navigate('/SeatsViewSeats');
    }

    return (
        <div class="WholePage">
            <h1 class="Title">Sittplatser</h1>
            <button class="TotalPriceContinueButton" onClick={() => GetContext()}>
                Hämta tillgängliga sittplatser</button>

            <div class="TrainCarts">

            </div>

            <div class="TotalPrice">
                <p class="TotalPriceText">TOTAL PRICE: XXX KR</p>
                <button class="TotalPriceContinueButton">Continue</button>

            </div>
        </div>
    );
};

export default SeatsViewSeats;