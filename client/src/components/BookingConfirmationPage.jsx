import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import '../css/BookingConfirmation.css';

function BookingConfirmationPage() {
    // const navigate = useNavigate();
    // useLocation holds several items, we grab the {state} and then we can access it by state.bookingId
    const { state } = useLocation();
    const bookingId = state.bookingId;
    // const bookingCode = state.bookingCode;

    const [booking, setBooking] = useState([]);
    const [traveller, setTraveller] = useState([]);
    const [stages, setStages] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [stations, setStations] = useState([]);
    const [platforms, setPlatforms] = useState([]);
    const [error, setError] = useState(null);

    // using hooks, trying to prevent the code running a million times. we use the hook so if the bookingId changes then it will run the code(setbooking)
    useEffect(() => {
        (async () => {
            setBooking(await fetchBooking());
        })();
    }, [bookingId]);

    useEffect(() => {
        if (!isObjLoaded(booking)) return;
        (async () => {
            setTraveller(await fetchTraveller(booking.TravellerId));
        })();
    }, [booking]);

    useEffect(() => {
        if (!isObjLoaded(traveller)) return;
        (async () => {
            setStages(await fetchStages());
        })();
    }, [traveller]);

    useEffect(() => {
        if (!isObjLoaded(stages)) return;
        (async () => {
            setSchedules(await fetchSchedules(stages));
        })();
    }, [stages]);

    useEffect(() => {
        if (!isObjLoaded(schedules)) return;
        (async () => {
            setStations(await fetchStations(schedules));
            setPlatforms(await fetchPlatforms(schedules));
        })();
    }, [schedules]);

    // if its empty then it doesnt get loaded.
    function isObjLoaded(state) {
        return !(Object.keys(state).length === 0);
    }

    async function fetchBooking() {
        return await fetchUrl(`/api/Booking/${bookingId}`, 'booking');
    }

    async function fetchTraveller(id) {
        return await fetchUrl(`/api/Traveller/${id}`, 'traveller');
    }

    async function fetchStages() {
        return await fetchUrl(`/api/ScheduleStage/Booking/${bookingId}`, 'stages');
    }

    async function fetchSchedules(stages) {
        let schedules = [];
        for (const stage of stages) {
            const schedule = await fetchUrl(`/api/Schedule/${stage.ScheduleId}`, 'schedules');
            schedule.DepartureTime = fixDate(schedule.DepartureTime);
            schedule.ArrivalTime = fixDate(schedule.ArrivalTime);
            schedule.DepartureTime = new Date(schedule.DepartureTime);
            schedule.ArrivalTime = new Date(schedule.ArrivalTime);
            console.log(schedule.DepartureTime);

            schedules.push(schedule);
        }
        return schedules;
    }

    async function fetchStations(schedules) {
        let stations = {};
        for (const schedule of schedules) {
            const departureStationId = schedule.DepartureTrainStationId;
            // we only add it to the dictionary if it is missing to avoid duplicate api calls.
            if (!(departureStationId in stations)) {
                const departureStation = await fetchUrl(`/api/TrainStation/${departureStationId}`, 'stations');
                //         key                        value
                stations[departureStation.Id] = departureStation;
            }
            const destinationStationId = schedule.DestinationTrainStationId;
            if (!(destinationStationId in stations)) {
                const destinationStation = await fetchUrl(`/api/TrainStation/${destinationStationId}`, 'stations');
                stations[destinationStation.Id] = destinationStation;
            }
        }
        return stations;
    }

    async function fetchPlatforms(schedules) {
        let platforms = {};
        for (const schedule of schedules) {
            const platformId = schedule.DeparturePlatformId;
            if (!(platformId in platforms)) {
                const platform = await fetchUrl(`/api/TrainStationPlatform/${platformId}`, 'platforms');
                platforms[platform.Id] = platform;
            }
        }
        return platforms;
    }

    async function fetchUrl(url, errorMessage = 'unknown', method = 'GET') {
        return await fetch(url, {
            method: method
        })
            .then(response => {
                if (!response.ok) {
                    // error 404 etc
                    setError(`${response.status} (${errorMessage})`);
                }
                return response.json();
            })
            .then(result => {
                return result;
            }, error => {
                // more developer errors
                // setError(`${error} (${errorMessage})`);
            });
    }

    async function deleteUrl(url, errorMessage = 'unknown') {
        return fetchUrl(url, errorMessage, 'DELETE');
    }

    function Itinerary() {
        let itineraries = [];
        for (let i = 0; i < schedules.length; i++) {
            const schedule = schedules[i];
            // if its null then return 'unknown'
            let departureStation = stations[schedule.DepartureTrainStationId].Name ?? 'unknown';
            let destinationStation = stations[schedule.DestinationTrainStationId].Name ?? 'unknown';
            let departurePlatform = platforms[schedule.DeparturePlatformId].Name ?? 'unknown';
            let departureDate = formatDate(schedule.DepartureTime) ?? 'unknown';
            console.log('schedule.DepartureTime: ' + schedule.DepartureTime);
            console.log('departureDate:' + departureDate);
            let departureTime = formatTime(schedule.DepartureTime) ?? 'unknown';
            let arrivalTime = formatTime(schedule.ArrivalTime) ?? 'unknown';
            let seat = stages[i].SeatNumber ?? 'unknown';

            itineraries.push(<div key={schedule.Id} className="itinerary-result">
                <div className="travel-split-up">
                    <div className="departure-and-destination-div">
                        <p>{departureStation}</p> - <p>{destinationStation}</p>
                    </div><br />

                    <div className="departure-details-div">
                        <div className="travel-date-title">Avgång</div>
                        <p>{departureDate}</p><br />
                        <p>Kl: {departureTime}</p>  <p>Plattform {departurePlatform}</p><br />
                        <p>Sittplats: {seat}</p>
                    </div><br />
                    <div className="destination-details-div">
                        <div className="travel-date-title">Ankomst</div>
                        <p>Kl: {arrivalTime}</p>  <p>Plattform {departurePlatform}</p>
                    </div>

                </div>
            </div>);
        }
        return itineraries;
    }

    function itineraryIsLoaded() {
        return (isObjLoaded(stations) && isObjLoaded(platforms));
    }

    function fixDate(date) {
        let dateString = date.toString();
        let addT = dateString.replace(/ /g, "T");
        return addT;
    }

    function formatDate(date) {
        const [day, month, year] = [to2Digits(date.getDate()), to2Digits(date.getMonth() + 1), date.getFullYear()];
        return `${year}-${month}-${day}`;
    }

    function formatTime(date) {
        const [hour, minutes] = [to2Digits(date.getHours()), to2Digits(date.getMinutes())];
        return `${hour}:${minutes}`;
    }

    function to2Digits(value) {
        // making sure that the time has a 0, so if AM, then 02, but because maybe minutes has 12 it would try to add a 0, so the slice removes that 0. 012 => 12
        return ("0" + value).slice(-2);
    }

    function Booking() {
        const travelDate = isObjLoaded(schedules) ? formatDate((schedules[0].DepartureTime)) : 'laddar...';
        return (<>
            <div className="review-square">
                <div className="thank-you-text">
                    <h1>Tack för att du bokar hos oss!</h1><br />
                    <p>Spara din bokningsinformation</p>
                    <p>Trevlig resa!</p>
                </div>
                <div>
                    <div className="booking-id-h3">
                        <p className="booking-id-title">Bokningskod</p>
                        <p className="booking-id-result">{booking.BookingCode}</p>
                    </div>
                    <div className="booking-id-h3">
                        <p className="booking-id-title">Kod för avbokning</p>
                        <p className="booking-id-result">{booking.ManipulationCode}</p>
                    </div>
                    {/* TODO: Needs a Manipulation Code: veriferings kod. */}
                    <div className="travel-detail-div">

                        <div className="itinerary">
                            <br />
                            {itineraryIsLoaded() ? <Itinerary /> : 'laddar...'}
                        </div>

                        <div className="price price-confirmation">
                            <br />
                            <div className="price-title">Totalbelopp:</div>
                            <div className="price-result">{booking.Price} kr</div>
                        </div>
                    </div>
                    <div className="traveller-detail-div">
                        <p className="booking-traveller-title">Bokningsinformation</p>
                        <div className="name">
                            <br />
                            <div className="name-title">Namn</div>
                            <div className="name-result">{traveller.FirstName} {traveller.LastName}</div>
                        </div>

                        <div className="email">
                            <br />
                            <div className="email-title">E-post</div>
                            <div className="email-result">{traveller.Email}</div>
                        </div>

                        <div className="phoneNumber">
                            <br />
                            <div className="phoneNumber-title">Telefonnummer</div>
                            <div className="phoneNumber-result">{traveller.PhoneNumber}</div>
                        </div>


                    </div>
                    <div className="traveller-blue-line">
                        <br />
                    </div>
                </div>

            </div>
        </>);
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

    return (<MainContent />);
}
export default BookingConfirmationPage