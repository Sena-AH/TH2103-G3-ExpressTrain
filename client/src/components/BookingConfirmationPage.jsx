import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import BookingInfo from './MyBookings2Page';

function BookingConfirmationPage() {
    return(
        <main>
            <BookingInfo bookingCode="P99G43"/>
            {/* <div>
                <h1 class="Title">BOOKING CONFIRMATION</h1>
                <br></br>

                <p class="EmailText">THANK YOU FOR YOUR PURCHASE! A BOOKING CONFIRMATION HAS BEEN SENT TO YOUR EMAIL.</p>
                <br></br>

                <p class="BookingId">BOOKING ID: exampleId123</p>
                <br></br>
            </div>
            <div class="ConfirmationDetails">
                <div> hi
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
                    <p class="TotalPriceText">TOTAL PRICE:</p>
                    <p class="TotalPriceAmount">XXXX KR</p>
                </div>
            </div> */}
        </main>
    );
};
/* Todo: for webbrowser version (focusing on mobile only 16-12-2021) on web-browser needs a scroll added because the page cuts out after email. mobile version is fine.
        Footer (mobile) however looks weird. something to explore*/

export default BookingConfirmationPage