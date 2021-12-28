import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../App'
// In i seats från Context: TravellerAmount, Schedules, Price, Traveller
// Sätts i Seats:
// Skickas vidare:
function SeatsPage() {
    const [context, updateContext] = useContext(Context)
    let navigate = useNavigate();

    const [cart, setCart] = useState([]);
    //const [takenSeats, setTakenSeats] = useState(['']);
    //const [cart, setCart] = useState([]);

    function GetContext() {
        // Denna update bara för utveckling, detta skall sättas i bokningsinformation
        updateContext({
            TravellerAmount: '1',
            Schedules: [{
                Id: '3',
                CartId: '1',
                DepartureTrainStationId: '3',
                DeparturePlatformId: '2',
                DestinationTrainStationId: '2',
                DestinationPlatformId: '3',
                DepartureTime: '2021-12-26 17:30:00',
                ArrivalTime: '2021-12-26 20:15:00'
            }],
            Traveller: {
                FirstName: 'Sofie',
                Lastname: 'Bäverstrand',
                Email: 'sofie@sofie.se',
                PhoneNumber: '46706888888'
            }
        });
        console.log('Getcontext');

        context.Schedules.forEach(schedule => {
            console.log(schedule);
            // skapa och uppdatera seatInfo
            (async () => { setCart(await fetchCart(schedule.CartId)); })();
            console.log('cartId:' + schedule.CartId);
            console.log(cart.SeatAmount);
        });


        //navigate('/SeatsViewSeats');
    }

    async function fetchCart(id) {
        return await fetchInfo(`/api/Cart/${id}`, 'carts')
    }

    async function fetchInfo(url) {
        return await fetch(url)
            .then(response => {
                if (!response.ok) {
                }
                return response.json();
            })
            .then(result => {
                return result;
            }, error => {
            });
    }

    return (
        <div className="WholePage">
            <h1 className="Title">Sittplatser</h1>
            <button className="TotalPriceContinueButton" onClick={() => GetContext()}>
                Hämta tillgängliga sittplatser</button>

            <div className="TrainCarts">

            </div>

            <div className="TotalPrice">
                <p className="TotalPriceText">TOTAL PRICE: XXX KR</p>
                <button className="TotalPriceContinueButton">Continue</button>

            </div>
        </div>
    );
};

export default SeatsPage;