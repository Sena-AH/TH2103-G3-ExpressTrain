import React, { useState } from 'react'


function BookingConfirmationPage() {
    // const [FirstName] = useState("");
    // const [LastName] = useState("");
    // const [Email] = useState("");
    // const [PhoneNumber] = useState("");
    const [BookingId, setBookingId] = useState("");




    async function getTravellerData() {
        console.log('Traveller Data')
        const response = await fetch('/api/Traveller');
        const travellerData = await response.json();
        console.log("only data: ", travellerData);

        for (let i = 0; i < travellerData.length; i++) {
            console.log("data split up: ", travellerData[i]);
        }
    }

    async function getBookingData() {
        console.log('Booking Data')
        const response = await fetch('/api/Booking');
        const bookingData = await response.json();
        console.log("only data: ", bookingData);

        for (let i = 0; i < bookingData.length; i++) {
            console.log("data split up: ", bookingData[i]);
        }
    }

    async function getScheduleStageData() {
        console.log('Schedule Stage Data')
        const response = await fetch('/api/ScheduleStage');
        const scheduleStageData = await response.json();
        console.log("only data: ", scheduleStageData);

        for (let i = 0; i < scheduleStageData.length; i++) {
            console.log("data split up: ", scheduleStageData[i]);
        }
    }


    return (
        <main>
            <div>
                <h1 className="Title">BOOKING CONFIRMATION</h1>
                <br></br>

                <p className="EmailText">THANK YOU FOR YOUR PURCHASE! A BOOKING CONFIRMATION HAS BEEN SENT TO YOUR EMAIL.</p>
                <br></br>
                <button type="button" onClick={getTravellerData}>getTravellerData</button>
                <button type="button" onClick={getBookingData}>getBookingData</button>
                <button type="button" onClick={getScheduleStageData}>getScheduleStageData</button>

                <p className="BookingId">BOOKING ID: {BookingId}</p>
                <br></br>
            </div>
            <div className="ConfirmationDetails">
                <div>
                    <p>TRIP LOCATION:</p>
                    <p>XXXXXXXX - XXXXXXXXX</p>
                    <br></br>
                </div>
                <div>
                    <p>DEPARTURE TIME AND DATE:</p>
                    <p>XXX KR</p>
                    <br></br>
                </div>
                <div>
                    <p>SEAT NUMBER:</p>
                    <p>XXX</p>
                    <br></br>
                </div>
                <div>
                    <p>NAME:</p>
                    <p>XXXX XXXXXX</p>
                    <br></br>
                </div>
                <div>
                    <p>EMAIL:</p>
                    <p>EXAMPLE@EMAIL.COM</p>
                    <br></br>
                </div>
                <div>
                    <p>PHONE NUMBER:</p>
                    <p>XXXX KR</p>
                    <br></br>
                </div>
                <div>
                    <p className="TotalPriceText">TOTAL PRICE:</p>
                    <p className="TotalPriceAmount">XXXX KR</p>
                </div>
            </div>
        </main>
    );
};
/* Todo: for webbrowser version (focusing on mobile only 16-12-2021) on web-browser needs a scroll added because the page cuts out after email. mobile version is fine.
        Footer (mobile) however looks weird. something to explore*/

export default BookingConfirmationPage