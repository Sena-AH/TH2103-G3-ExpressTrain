import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SeatsPage() {
    let navigate = useNavigate();
    const [usefulInfo, updateUsefulInfo] = useState({
        travellerAmount: 0,
        schedules: [3]
        // schedule 3 har flera upptagna seats
    })

    function handleClick(event) {

        navigate('/SeatsPage2', { state: usefulInfo });
    }

    function handleChange(event) {

        updateUsefulInfo({
            ...usefulInfo,
            travellerAmount: event.target.value
        });
        console.log(usefulInfo)
    }

    return (
        <main>
            <div class="Seats">
                <button class="TotalPriceContinueButton" onClick={handleClick}>Visa lediga platser</button>
                {/* <SeatsPage2 /> */}

                <form onSubmit={handleClick}>
          <div className="my-bookings-search">
            {/* <input type="number" min="0"  name="bookingId" class="search-bar" placeholder="Bokningsnummer"></input> */}
            <input placeholder="Antal passagerare" name="travellerAmount" value={usefulInfo.travellerAmount} onChange={handleChange}/>
          </div>
          <div className="search-btn">
            {/* <button type="submit" value="Submit" onClick={handleClick}>Sök</button> */}
            <input type="submit" value="My Bookings"/>
          </div>
        </form>    


            </div>
        </main>

    );
};

export default SeatsPage;