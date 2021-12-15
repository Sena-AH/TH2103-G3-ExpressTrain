function PaymentPage(){
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
                    <hr style={{backgroundColor: "black"}, {margin: 5}}></hr>
                    SWISH
                </div>
                <div className="horizontally-halved-div">
                <br/>
                    <input type="radio" id="Klarna" value="KlarnaPayment"></input> Klarna Payment card or invoice
                    <br></br>
                    <input type="radio" id="CardPayment"></input> Pay with card
                </div>
            </div>

            <div>
                <button>PROCEED TO PAYMENT</button>
            </div>
        </div>
    )        
};

export default PaymentPage;