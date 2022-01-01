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
    const [schedules, setSchedules] = useState([]);
    const [stages, setStages] = useState([]);
    const [takenSeats, setTakenSeats] = useState([]);
    const [scheduleId, setScheduleId] = useState();
  const [error, setError] = useState(null);
  const [startStation, setStartStation] = useState([]);
  const [destinationStation, setDestinationStation] = useState([]);


    async function GetContext() {
        setSchedules(context.Schedules)
        console.log(context)
        // skapa och uppdatera seatInfo per tur
        schedules.forEach(schedule => {
            console.log('kattjävel');
            // hämta cart till denna schedule för att hitta number of seats
            (async () => { setCart(await fetchCart(schedule.CartId)); })();
            console.log(schedule.CartId);
            console.log(cart.SeatAmount);

            // hämta alla schedulestage för att hitta taken seats
            setScheduleId(schedule.ScheduleId);
            console.log(scheduleId);
            (async () => { setStages(await fetchStages(scheduleId)); })();

            stages.forEach(stage => {
                console.log(stages);
                const seatnumber = stage.SeatNumber;
                takenSeats.push(seatnumber);
            });

            //uppdatera context
            updateContext({
                SeatInformation: [{
                    ScheduleId: schedule.ScheduleId,
                    CartId: schedule.CartId,
                    NoOfSeats: cart.SeatAmount,
                    TakenSeats: takenSeats
                }]
            });
        });


        //navigate('/SeatsViewSeats');
    }

    function ContextPrint() {
        console.log('finally - context')
        console.log(context);
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

    // if its empty then it doesnt get loaded.
    function isObjectLoaded(state) {
        return !(Object.keys(state).length === 0);
    }

    // function Booking() {
    //     const travelDate = isObjectLoaded(schedules) ? formatDate((schedules[0].DepartureTime)) : 'laddar...';
    //     return (<>
    //         <div>
    //             <h1>Min bokning</h1>
    //         </div>
    //         <div>
    //             <h3>Boking ID: {bookingId}</h3>

    //             <div className="travel-date">
    //                 <br />
    //                 <div className="travel-date-title">Resdatum:</div>
    //                 <div className="travel-date-result">{travelDate}</div>
    //             </div>

    //             <div className="itinerary">
    //                 <br />
    //                 <div className="itinerary-title">Resväg:</div>
    //                 {isRenderSeatsLoaded() ? <Itinerary /> : 'laddar...'}
    //             </div>

    //             <div className="name">
    //                 <br />
    //                 <div className="name-title">Namn:</div>
    //                 <div className="name-result">{traveller.FirstName} {traveller.LastName}</div>
    //             </div>

    //             <div className="email">
    //                 <br />
    //                 <div className="email-title">E-post:</div>
    //                 <div className="email-result">{traveller.Email}</div>
    //             </div>

    //             <div className="phoneNumber">
    //                 <br />
    //                 <div className="phoneNumber-title">Telefonnummer:</div>
    //                 <div className="phoneNumber-result">{traveller.PhoneNumber}</div>
    //             </div>

    //             <div className="price">
    //                 <br />
    //                 <div className="price-title">Totalbelopp:</div>
    //                 <div className="price-result">{booking.Price} kr</div>
    //             </div>
    //         </div>

    //         <div className="search-btn">
    //             <button type="button" id="cancel-booking-btn" onClick={handleClick}>Avboka bokningen</button>
    //         </div>
    //     </>);
    // }

    function TakenSeat() {
        alert("Upptagen!");
    }
    function VacantSeat() {
        // if chosenseats.length == travellerAmount 
        // lägg till nya klicket på chosenseats[0]
        // else lägg bara till i listan

        // byt färg på knappen eller nåt
    }

    function RenderCart(data) {
        let cartSeats = [];
        setScheduleId(data.ScheduleId);

        // hämta antal sittplatser
        useEffect(() => {
            if (!isObjectLoaded(scheduleId)) return;
            (async () => {
                setCart(await fetchCart(scheduleId));
            })();
        }, [cart]);

        // hämta upptagna platser

        // skapa divar med knappar
        for (let i = 1; i = cart.seatAmount; i++) {
            // if takenseats.contains {i}
            if (takenSeats.includes(i)) {
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
                        <button className='availableSeat' onClick={() => VacantSeat()}>
                            {i}, <br />
                            Ledig</button>
                    </div >
                )
            }

        }
// return (returnera cartseats
//     )
    }

    function RenderAllSeats() {
        // en if-sats kollar om det finns innehåll i context.firstTrip och context.secondTrip och skickar till RenderCart
RenderCart(context.FirstTrip)
    }

    function isRenderedSeatsLoaded() {
        return (isObjectLoaded(scheduleId) && isObjectLoaded(cart));
    }

    function SeatsPage() {
        <div className="wrapper">
            <h2>Välj plats(er)</h2>
            <div className="chooseSeats">
                <br />
                <div className="chooseSeats-title"></div>
                {isRenderedSeatsLoaded() ? <RenderAllSeats /> : 'laddar...'}
            </div>
            <div className="search-btn">
                {/* <button type="button" onClick={saveData}>Spara och Fortsätt</button> */}
            </div>
        </div>
    }
    // if we get error then it goes here, it's not checking a specific thing at the moment.
    function Error() {
        return (<>
            <div>
                Seems like something went wrong!<br />
                Error: {error}
            </div>
        </>);
    }

    function MainContent() {
        if (error) return <Error />;
        return <Booking />;
    }

    return (
        <main>
            <MainContent />
            {/* {error ? <Error/> : bookingDeleted ? <DeleteBookingConfirmation /> : <Booking/>} */}
        </main>);
}

export default SeatsPage;