import React from 'react';
import Header from "../components/Header/Header";
import Eventparticipants from '../components/EventParticipantsList/EventparticipantsList'
import EventActionPanel from '../components/EventActionpanel/EventActionpanel'
import EventOverview from '../components/EventOverview/EventOverview';
import Footer from '../components/Footer/Footer';



const EventPage = () => {
  return (
    <>
    <Header />
    <EventOverview
  eventName="Evening Tea Break"
  eventImage="TeaPic.png"
  selectedPeople={["John", "Jane"]}
  dishSummary={{ Tea: 2, Samosa: 1 }}
/>
    <Eventparticipants/>
    <EventActionPanel/>
    <Footer/>
  </>
  );
};

export default EventPage;
