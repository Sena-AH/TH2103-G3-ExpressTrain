import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './css/Navigation.css';
import './css/header.css';
import './css/footer.css';
import './css/main.css';

import Menubar from './components/Menubar';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import Footer from './components/Footer';
import MyBookingsPage from './components/MyBookingsPage';
import SearchResultsPage from './components/SearchResultsPage';
import BookingInformationPage from './components/BookingInformationPage';



function App() {

  return (
    <div className="App">
      <Menubar />
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/AboutPage" element={<AboutPage />} />
        <Route path="/MyBookingsPage" element={<MyBookingsPage />} />
        <Route path="/ContactPage" element={<ContactPage />} />
        <Route path="/SearchResultsPage" element={<SearchResultsPage />} />
        <Route path="/BookingInformationPage" element={<BookingInformationPage />} />

        <Route element={Error} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
