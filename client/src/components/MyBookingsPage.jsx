import React from 'react';
import { useNavigate } from 'react-router-dom';

function MyBookingsPage() {

  let navigate = useNavigate();

  function handleClick() {
    navigate("/MyBookings2Page");
  }

  return (
    <main>
      <div class="first-group">
        <div>
          <h1 class="page-title">Mina bokningar</h1>
        </div>

        <form method="post" action="">
          <div className="my-bookings-search">
            <input class="search-bar" placeholder="Bokningsnummer"></input>
          </div>

          <div className="search-btn">
            <button type="submit" value="Submit" onClick={handleClick}>Sök</button>
          </div>
        </form>
        
      </div>
    </main>
  );
};

export default MyBookingsPage;