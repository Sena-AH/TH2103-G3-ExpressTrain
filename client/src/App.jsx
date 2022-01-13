import React, { useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import './css/Navigation.css';
import './css/header.css';
import './css/footer.css';
import './css/main.css';
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

// create and export the context
export const Context = createContext()

function App() {

  // use a state handled variable
  // as the value of our context
  const [contextVal, setContext] = useState({})

  // setContext replaces the whole context
  // create a method that let us update it instead
  function updateContext(updates) {
    setContext({
      ...contextVal,
      ...updates
    })
    console.log(updates);
  }

  return (
    <Context.Provider value={[contextVal, updateContext]}>
      <div className="App">
        <Menubar />
        <main>
          <div className="wrapper">
            <Routes>
              <Route path="/" element={<HomePage />} exact />
              <Route path="/About" element={<AboutPage />} />
              <Route path="/MyBookings" element={<MyBookingsPage />} />
              <Route path="/MyBookingsInfo" element={<MyBookings2Page />} />
              <Route path="/Contact" element={<ContactPage />} />
              <Route path="/BookingConfirmation" element={<BookingConfirmationPage />} />
              <Route path="/SeatsPage" element={<SeatsPage />} />
              <Route path="/SearchResultsPage" element={<SearchResultsPage />} />
              <Route path="/BookingInformationPage" element={<BookingInformationPage />} />
              <Route path="/Payment" element={<PaymentPage />} />
              <Route element={Error} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Context.Provider>
  );
}

export default App;
