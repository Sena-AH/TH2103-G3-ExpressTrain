import React, { useState } from 'react'


function BookingConfirmationPage() {
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Email, setEmail] = useState("");
    const [PhoneNumber, setPhoneNumber] = useState("");
    const [BookingId, setBookingId] = useState("");
    const [Price, setPrice] = useState("");
    const [SeatNumber, setSeatNumber] = useState("");
    const [DepartureTrainStationName, setDepartureTrainStationName] = useState("");
    const [DepartureTime, setDepartureTime] = useState("");
    const [ArrivalTrainStationName, setArrivalTrainStationName] = useState("");
    const [ArrivalTime, setArrivalTime] = useState("");



    async function getTravellerData() {
        console.log('Traveller Data')
        const response = await fetch('/api/Traveller');
        const travellerData = await response.json();
        console.log("only data: ", travellerData);
        setFirstName(travellerData[4].FirstName);
        setLastName(travellerData[4].LastName);
        setEmail(travellerData[4].Email);
        setPhoneNumber(travellerData[4].PhoneNumber);

        for (let i = 0; i < travellerData.length; i++) {
            console.log("data split up: ", travellerData[i]);
        }
        return travellerData;
    }

    async function getBookingData() {
        console.log('Booking Data')
        const response = await fetch('/api/Booking');
        const bookingData = await response.json();
        console.log("only data: ", bookingData);
        setBookingId(bookingData[1].BookingCodeId);
        setPrice(bookingData[1].Price);
        for (let i = 0; i < bookingData.length; i++) {
            console.log("data split up: ", bookingData[i]);
        }
        return bookingData;
    }

    async function getScheduleStageData() {
        console.log('Schedule Stage Data')
        const response = await fetch('/api/ScheduleStage');
        const scheduleStageData = await response.json();
        console.log("only data: ", scheduleStageData);
        setSeatNumber(scheduleStageData[0].SeatNumber);
        for (let i = 0; i < scheduleStageData.length; i++) {
            console.log("data split up: ", scheduleStageData[i]);
        }
        return scheduleStageData;
    }

    async function getScheduleData() {
        console.log('Schedule Data')
        const response = await fetch('/api/Schedule');
        const scheduleData = await response.json();
        console.log("only data: ", scheduleData);
        setDepartureTime(scheduleData[0].DepartureTime);
        setArrivalTime(scheduleData[0].ArrivalTime);
        for (let i = 0; i < scheduleData.length; i++) {
            console.log("data split up: ", scheduleData[i]);
        }
        return scheduleData;
    }

    async function getTrainStationData() {
        console.log('Train Station Data')
        const response = await fetch('/api/TrainStation');
        const trainStationData = await response.json();
        console.log("only data: ", trainStationData);
        setDepartureTrainStationName(trainStationData[0].Name)
        setArrivalTrainStationName(trainStationData[1].Name)

        for (let i = 0; i < trainStationData.length; i++) {
            console.log("data split up: ", trainStationData[i]);
        }
        return trainStationData;
    }

    return (
        <main >
            <div>
                <h1 className="Title">BOOKING CONFIRMATION</h1>
                <br></br>

                <p className="EmailText">THANK YOU FOR YOUR PURCHASE! A BOOKING CONFIRMATION HAS BEEN SENT TO YOUR EMAIL.</p>
                <br></br>
                <button type="button" onClick={getTravellerData}>getTravellerData</button>
                <button type="button" onClick={getBookingData}>getBookingData</button>
                <button type="button" onClick={getScheduleStageData}>getScheduleStageData</button>
                <button type="button" onClick={getScheduleData}>getScheduleData</button>
                <button type="button" onClick={getTrainStationData}>getTrainStationData</button>

                <p className="BookingId">BOOKING ID: {BookingId}</p>
                <br></br>
            </div>
            <div className="ConfirmationDetails">
                <div>
                    <p>TRIP LOCATION:</p>
                    <p>{DepartureTrainStationName} - {ArrivalTrainStationName}</p>
                    <br></br>
                </div>
                <div>
                    <p>DEPARTURE TIME AND DATE:</p>
                    <p>{DepartureTime} - {ArrivalTime}</p>
                    <br></br>
                </div>
                <div>
                    <p>SEAT NUMBER:</p>
                    <p>{SeatNumber}</p>
                    <br></br>
                </div>
                <div>
                    <p>NAME:</p>
                    <p>{FirstName} {LastName}</p>
                    <br></br>
                </div>
                <div>
                    <p>EMAIL:</p>
                    <p>{Email}</p>
                    <br></br>
                </div>
                <div>
                    <p>PHONE NUMBER:</p>
                    <p>{PhoneNumber}</p>
                    <br></br>
                </div>
                <div>
                    <p className="TotalPriceText">TOTAL PRICE:</p>
                    <p className="TotalPriceAmount">{Price} KR</p>
                </div>
            </div>
        </main>
    );
};
/* Todo: for webbrowser version (focusing on mobile only 16-12-2021) on web-browser needs a scroll added because the page cuts out after email. mobile version is fine.
        Footer (mobile) however looks weird. something to explore*/

export default BookingConfirmationPage