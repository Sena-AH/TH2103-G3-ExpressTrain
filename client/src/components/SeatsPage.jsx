import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../App'
// In i seats från Context: TravellerAmount, Schedules, Price, Traveller
// Sätts i Seats:
// Skickas vidare:
function SeatsPage() {
    const [context, updateContext] = useContext(Context)
    let navigate = useNavigate();

    const [cart, setCart] = useState([]);
    const [schedules, setSchedules] = useState(context.Schedules);
    const [stages, setStages] = useState([]);
    const [takenSeats, setTakenSeats] = useState([]);
    const [scheduleId, setScheduleId] = useState();
    const [seatInformation, setSeatInformation] = useState([]);

    useEffect(() => {
        (async () => {
            for (let i = 0; i < schedules.length; i++) {
                console.log('kattjävel');
                // hämta cart till denna schedule för att hitta number of seats
                (async () => { setCart(await fetchCart(schedules[i].CartId)); })();
                console.log(schedules[i].CartId);
                console.log(cart.SeatAmount);

                // hämta alla schedulestage för att hitta taken seats
                setScheduleId(schedules[i].ScheduleId);
                console.log(scheduleId);
                (async () => { setStages(await fetchStages(scheduleId)); })();

                stages.forEach(stage => {
                    console.log(stages);
                    const seatnumber = stage.SeatNumber;
                    takenSeats.push(seatnumber);
                    console.log(takenSeats);
                });

                //spara info i lista
                const seatinfo = [];
                seatinfo.ScheaduleId = scheduleId;
                seatinfo.Cartid = schedules[i].CartId;
                seatinfo.NoOfSeats = cart.SeatAmount;
                seatinfo.TakenSeats = takenSeats;

                seatInformation.push(seatinfo);
                console.log(seatInformation);
                // updateContext({
                //     SeatInformation: [{
                //         ScheduleId: schedule.ScheduleId,
                //         CartId: schedule.CartId,
                //         NoOfSeats: cart.SeatAmount,
                //         TakenSeats: takenSeats
                //     }]
                // });
            };
        })();
        console.log('context efter manipulation:')
    console.log(context);
    }, []);

    

    async function GetContext() {

    }

    function ContextPrint() {
        console.log(context);
        console.log(takenSeats);
        console.log(seatInformation);

    }

    async function fetchStages(id) {
        return await fetchInfo(`/api/Schedulestage/ScheduleId/${id}`, 'scheduleStages');
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

            <button className="TotalPriceContinueButton" onClick={() => ContextPrint()}>
                Hämta tillgängliga sittplatser</button>
            <div className="TrainCarts">

            </div>

            <div className="TotalPrice">
                <p className="TotalPriceText">TOTAL PRICE: {context.Price} KR</p>
                <button className="TotalPriceContinueButton">Continue</button>

            </div>
        </div>
    );
};

export default SeatsPage;