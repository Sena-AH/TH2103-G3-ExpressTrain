import React from 'react';
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
import MyBookings2Page from './components/MyBookings2Page';
import SearchResultsPage from './components/SearchResultsPage';
import BookingInformationPage from './components/BookingInformationPage';


function App() {
  return (
    <div className="App">
      <Menubar />
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/About" element={<AboutPage />} />
        <Route path="/MyBookings" element={<MyBookingsPage />} />
        <Route path="/MyBookingsInfo" element={<MyBookings2Page />} />
        <Route path="/Contact" element={<ContactPage />} />
        <Route path="/BookingConfirmation" element={<BookingConfirmationPage />} />
        <Route path="/Seats" element={<SeatsPage />} />
        <Route path="/SearchResults" element={<SearchResultsPage />} />
        <Route path="/BookingInformation" element={<BookingInformationPage />} />
        <Route path="/Payment" element={<PaymentPage />} />
        <Route element={Error} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
