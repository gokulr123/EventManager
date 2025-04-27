import React from 'react';
import Header from "../components/Header/Header";
import HomeComponent from '../components/Home/HomeComponent';
import LiveEvent from '../components/LiveEvent/LiveEvent';
import Footer from '../components/Footer/Footer';




const Home = () => {
  return (
    <>
    <Header />
    <HomeComponent />
    <LiveEvent/>
    <Footer/>
  </>
  );
};

export default Home;
