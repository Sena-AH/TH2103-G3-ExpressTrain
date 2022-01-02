import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../App'
// In i seats från Context: TravellerAmount, Schedules, Price, Traveller
// Sätts i Seats:
// Skickas vidare:
function SeatsPage() {
    const [context, updateContext] = useContext(Context)
    const firstScheduleId = context.FirstTrip.ScheduleId;
    const [secondScheduleId, setSecondScheduleId] = useState(0);

    let navigate = useNavigate();

    const [firstCart, setFirstCart] = useState([]);
    const [firstSchedule, setFirstSchedule] = useState();
    const firstTakenSeats = useState([]);
    const [firstStages, setFirstStages] = useState([]);
    const [firstChosenSeats] = useState([]);

    const [secondCart, setSecondCart] = useState([]);
    const [secondSchedule, setSecondSchedule] = useState();
    const secondTakenSeats = useState([]);
    const [secondStages, setSecondStages] = useState([]);
    const [secondChosenSeats] = useState([]);

    const [startStation, setStartStation] = useState([]);
    const [destinationStation, setDestinationStation] = useState([]);

    // Utresa
    // hämta schedule
    useEffect(() => {
        //if (!isObjectLoaded(firstScheduleId)) return;
        (async () => {
            console.log('hämta schedule');
            console.log(firstScheduleId);
            let res = await fetchSchedule(firstScheduleId);
            console.log(`har hämtat ${res.DeparturePlatformId}`);
            setFirstSchedule(res);
        })();

    }, [firstScheduleId]);

    // hämta stages
    useEffect(() => {
        if (!isObjectLoaded(firstSchedule)) return;
        (async () => {
            console.log('stages hämtas...')
            let res = await fetchStages(firstScheduleId);
            console.log(`har hämtat stages med ScheduleId: ${res[0].ScheduleId}`);
            setFirstStages(res);
        })();
    }, [firstSchedule]);

    // sätt taken seats
    useEffect(() => {
        if (!isObjectLoaded(firstStages)) return;
        firstStages.forEach(stage => {
            firstTakenSeats.push(stage.SeatNumber);
            console.log(`ett av takenseats är: ${firstTakenSeats[0]}`);
        });
    }, [firstStages]);

    // sätt startstation
    useEffect(() => {
        if (!isObjectLoaded(firstSchedule)) return;
        (async () => {
            console.log('sätter startStation...')
            let res = await fetchStation(firstSchedule.DeparturePlatformId);
            console.log(`har hämtat startstation med namn: ${res.Name}`);
            setStartStation(res.Name);
        })();
    }, [firstSchedule]);

    //sätt målstation
    useEffect(() => {
        if (!isObjectLoaded(firstSchedule)) return;
        (async () => {
            console.log('sätter målstation...')
            let res = await fetchStation(firstSchedule.DestinationPlatformId);
            console.log(`har hämtat målstation med namn: ${res.Name}`);
            setDestinationStation(res.Name);
        })();
    }, [firstSchedule]);

    // hämta cart
    useEffect(() => {
        if (!isObjectLoaded(firstSchedule)) return;
        (async () => {
            console.log('cart hämtas...')
            let res = await fetchCart(firstSchedule.CartId);
            console.log(`har hämtat cart med såhär många säten: ${res.SeatAmount}`);
            setFirstCart(res);
        })();
    }, [firstSchedule]);

    // Returresa
    // Sätt secondScheduleId
    useEffect(() => {
        if (!isObjectLoaded(firstSchedule)) return;
        if (context.SecondTrip !== undefined) {
            setSecondScheduleId(context.SecondTrip.ScheduleId);
        }

    }, [firstSchedule]);

    // hämta schedule
    useEffect(() => {
        (async () => {
            console.log('hämta schedule för retur');
            console.log(secondScheduleId);
            let res = await fetchSchedule(secondScheduleId);
            console.log(`har hämtat ${res.DeparturePlatformId}`);
            setSecondSchedule(res);
        })();
    }, [secondScheduleId]);

    // hämta stages
    useEffect(() => {
        if (!isObjectLoaded(secondSchedule)) return;
        (async () => {
            console.log('stages för retur hämtas...')
            let res = await fetchStages(secondScheduleId);
            console.log(`har hämtat stages `);
            setSecondStages(res);
        })();
    }, [secondSchedule]);

    // sätt taken seats
    useEffect(() => {
        if (!isObjectLoaded(secondStages)) return;
        secondStages.forEach(stage => {
            secondTakenSeats.push(stage.SeatNumber);
            console.log(`ett av takenseats på returresan`);
        });
    }, [secondStages]);

    // hämta cart
    useEffect(() => {
        if (!isObjectLoaded(secondSchedule)) return;
        (async () => {
            console.log('cart för returresan hämtas...')
            let res = await fetchCart(secondSchedule.CartId);
            console.log(`har hämtat cart returresan`);
            setSecondCart(res);
        })();
    }, [secondSchedule]);

    async function fetchStages(id) {

        return await fetchInfo(`/api/Schedulestage/ScheduleId/${id}`, 'scheduleStages');
    }

    async function fetchSchedule(id) {

        return await fetchInfo(`/api/Schedule/${id}`);
    }

    async function fetchStation(id) {

        return await fetchInfo(`/api/TrainStation/${id}`);
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

    function isObjectLoaded(state) {
        console.log(state);
        if (state === null) return false;
        if (state === undefined) return false;
        return !(Object.keys(state).length === 0);
    }

    function TakenSeat() {
        alert("Upptagen!");
    }

    function VacantSeatFirst(seatNumber) {
        if (firstChosenSeats.length === context.TravellerAmount) {
            console.log('firstChosenSeats')
            console.log(firstChosenSeats);
            alert("Du har redan valt sittplats(er)");
        }
        else if (firstChosenSeats.includes(seatNumber)) {
            alert("Du har redan valt den här platsen!")
        }
        else {
            firstChosenSeats.includes(seatNumber)
            console.log('firstChosenSeats')
            console.log(firstChosenSeats);
            firstChosenSeats.push(seatNumber);
        }

        // byt färg på knappen eller nåt
    }

    function VacantSeatSecond(seatNumber) {
        if (secondChosenSeats.length === context.TravellerAmount) {
            console.log('secondChosenSeats')
            console.log(secondChosenSeats);
            alert("Du har redan valt sittplats(er)");
        }
        else if (secondChosenSeats.includes(seatNumber)) {
            alert("Du har redan valt den här platsen!")
        }
        else {
            console.log('secondChosenSeats')
            console.log(secondChosenSeats);
            secondChosenSeats.push(seatNumber);
        }

        // byt färg på knappen eller nåt
    }

    function RenderFirstCart() {
        let cartSeats = [];
        console.log(firstTakenSeats[0]);
        // hämta upptagna platser

        // skapa divar med knappar
        for (let i = 1; i <= firstCart.SeatAmount; i++) {
            // if takenseats.contains {i}

            if (firstTakenSeats.includes(i)) {
                cartSeats.push(
                    <div key={i} className='seat'>
                        <button className='takenSeat' onClick={() => TakenSeat()}>
                            {i}, <br />
                            Upptagen</button>
                    </div >
                )
            }
            else {
                cartSeats.push(
                    <div key={i} className='seat'>
                        <button className='availableSeat' onClick={() => VacantSeatFirst(i)}>
                            {i}, <br />
                            Ledig</button>
                    </div >
                )
            }
        }

        console.log(cartSeats);
        return cartSeats;
    }

    function RenderSecondCart() {
        let cartSeats = [];
        console.log(secondTakenSeats[0]);
        // skapa divar med knappar
        for (let i = 1; i <= secondCart.SeatAmount; i++) {
            if (secondTakenSeats.includes(i)) {
                cartSeats.push(
                    <div key={i} className='seat'>
                        <button className='takenSeat' onClick={() => TakenSeat()}>
                            {i}, <br />
                            Upptagen</button>
                    </div >
                )
            }
            else {
                cartSeats.push(
                    <div key={i} className='seat'>
                        <button className='availableSeat' onClick={() => VacantSeatSecond(i)}>
                            {i}, <br />
                            Ledig</button>
                    </div >
                )
            }
        }

        console.log(cartSeats);
        return cartSeats;
    }

    function SaveTripSeats() {
        if (secondScheduleId === 0) {
            updateContext({
                FirstTripSeats: firstChosenSeats
            });
        }
        else {
            updateContext({
                FirstTripSeats: firstChosenSeats,
                SecondTripSeats: secondChosenSeats
            });
        }
        navigate('/PaymentPage');
    }

    function RenderAllSeats() {
        if (secondScheduleId === 0) {
            console.log('enkelresa')
            return (<div className="WholePage">
                <h1 className="Title">Sittplatser {startStation} - {destinationStation}</h1>
                <div className="TrainCart">
                    {isRenderedFirstSeatsLoaded() ? <RenderFirstCart /> : 'laddar...'}

                </div>
                <div className="TotalPrice">
                    <div className="search-btn">
                        <button type="button" onClick={() => SaveTripSeats()}>Spara och Fortsätt</button>
                    </div>
                </div>
            </div>)
        }

        else {
            console.log('tur och retur')
            return (<div className="WholePage">
                <h1 className="Title">Sittplatser {startStation} - {destinationStation}</h1>
                <div className="TrainCart">
                    {isRenderedFirstSeatsLoaded() ? <RenderFirstCart /> : 'laddar...'}
                </div>
                <h1 className="Title">Sittplatser {destinationStation} - {startStation}</h1>
                <div className="TrainCart">
                    {isRenderedSecondSeatsLoaded() ? <RenderSecondCart /> : 'laddar...'}
                </div>
                <div className="TotalPrice">
                    <div className="search-btn">
                        <button type="button" onClick={() => SaveTripSeats()}>Spara och Fortsätt</button>
                    </div>
                </div>
            </div>
            )
        }

    }

    function isRenderedFirstSeatsLoaded() {
        return (isObjectLoaded(firstCart));
    }

    function isRenderedSecondSeatsLoaded() {
        return (isObjectLoaded(secondCart));
    }

    return (
        <main>
            <RenderAllSeats />
        </main>);
}

export default SeatsPage;