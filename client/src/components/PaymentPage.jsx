import React, { useState, useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../App'

function PaymentPage(){
    const [context, updateContext] = useContext(Context)
    console.log('Context efter navigate');

console.log(context);
    return(
        <div className="centered-text-div">
            <div>
            <p style={{height: 10}}>YOUR BOOKING DETAILS</p>
                    <div className="booking-medium-div">

                            Departing from: xxxxxxxxx (Station and datetime)<br/>
                            Arriving at: xxxxxxxx<br/>
                            Seat Number: xx<br/>
                            Name: xxxxxx<br/>
                            Email: xxxxxxx<br/>
                            Phone number: xxxxxx<br/>
                            <br/>

                            Total cost of trip: xxxxx KR
                            
                            <br/><br/>
                    </div>
            </div>
            <p style={{height: 10}}>CHOOSE PAYMENT METHOD</p>
            <div className="booking-medium-div">
                <div className="horizontally-halved-div">
                <br/>
                    SWISH 
                </div>
                <div className="horizontally-halved-div">
                <br/>
                    SWISH 
                </div>
            </div>
            <div className="booking-medium-div">
                <div className="horizontally-halved-div">
                <br/>
                    <input type="radio" name="PaymentRadio" value="KlarnaPayment"></input> Klarna Payment card or invoice
                </div>
                <div className="vertical-line"></div>
                <div className="horizontally-halved-div">
                    <input type="radio" name="PaymentRadio"></input> Pay with card
                </div>
                
            </div>

            <div>
                <button>PROCEED TO PAYMENT</button> {/* Add link to next page here */}
            </div>
        </div>
    )        
};

export default PaymentPage;