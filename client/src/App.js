import React , { useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import './css/Navigation.css';
import './css/header.css';
import './css/footer.css';
import './css/main.css';
import './css/BookingConfirmation.css'
import './css/SeatsPage.css';
import './css/style.css';
import './css/SwitchStyle.css';

import Menubar from './components/Menubar';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import PaymentPage from './components/PaymentPage';
import Footer from './components/Footer';
import MyBookingsPage from './components/MyBookingsPage';
import BookingConfirmationPage from './components/BookingConfirmationPage';
import SeatsPage from './components/SeatsPage';
import SeatsViewSeats from './components/SeatsViewSeats';
import MyBookings2Page from './components/MyBookings2Page';
import MyBookings3Page from './components/MyBookings3Page';
import SearchResultsPage from './components/SearchResultsPage';
import BookingInformationPage from './components/BookingInformationPage';

// create and export the context
export const Context = createContext()

function App() {

  // use a state handled variable
  // as the value of our context
  const [contextVal, setContext] = useState({
    TravellerAmount: '',
    Schedules: [''],
    Price: '',
    Traveller: {
      FirstName: '',
      Lastname: '',
      Email: '',
      PhoneNumber: ''
    },
    TakenSeats: [{
      ScheduleId: '',
      SeatNumber: ''
    }],
    ScheduleStages: [{
      ScheduleId: '',
      SeatNumber: ''
    }]

  })

  // setContext replaces the whole context
  // create a method that let us update it instead
  function updateContext(updates) {
    setContext({
      ...contextVal,
      ...updates
    })
  }



  return (
    <Context.Provider value={[contextVal, updateContext]}>
    <div className="App">
      <Menubar />
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/AboutPage" element={<AboutPage />} />
        <Route path="/MyBookingsPage" element={<MyBookingsPage />} />
        <Route path="/MyBookings2Page" element={<MyBookings2Page />} />
        <Route path="/MyBookings3Page" element={<MyBookings3Page />} />
        <Route path="/ContactPage" element={<ContactPage />} />
        <Route path="/BookingConfirmation" element={<BookingConfirmationPage />} />
        <Route path="/SeatsPage" element={<SeatsPage />} />
        <Route path="/SeatsViewSeats" element={<SeatsViewSeats />} />
        <Route path="/SearchResultsPage" element={<SearchResultsPage />} />
        <Route path="/BookingInformationPage" element={<BookingInformationPage />} />
        <Route path="/PaymentPage" element={<PaymentPage />} />
        <Route element={Error} />
      </Routes>
      <Footer />
    </div>
    </Context.Provider>
  );
}

export default App;
