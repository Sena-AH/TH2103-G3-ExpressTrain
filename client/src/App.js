import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './css/Navigation.css';
import './css/header.css';
import './css/footer.css';
import './css/main.css';
import './css/SeatsPage.css';
import './css/style.css';


import Menubar from './components/Menubar';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import PaymentPage from './components/PaymentPage';
import Footer from './components/Footer';
import MyBookingsPage from './components/MyBookingsPage';
import SeatsPage from './components/SeatsPage';
import MyBookings2Page from './components/MyBookings2Page';
import MyBookings3Page from './components/MyBookings3Page';
import SearchResultsPage from './components/SearchResultsPage';

function App() {
  return (
    <div className="App">
      <Menubar />
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/AboutPage" element={<AboutPage />} />
        <Route path="/MyBookingsPage" element={<MyBookingsPage />} />
        <Route path="/MyBookings2Page" element={<MyBookings2Page />} />
        <Route path="/MyBookings3Page" element={<MyBookings3Page />} />
        <Route path="/ContactPage" element={<ContactPage />} />
        <Route path="/SeatsPage" element={<SeatsPage />} />
        <Route path="/SearchResultsPage" element={<SearchResultsPage />} />
        <Route path="/PaymentPage" element={<PaymentPage />} />
        <Route element={Error} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
