import React ,{ useEffect, useState }from 'react';
import axios from "axios";
import Header from "../components/Header/Header";
import Eventparticipants from '../components/EventParticipantsList/EventparticipantsList'
import EventActionPanel from '../components/EventActionpanel/EventActionpanel'
import EventOverview from '../components/EventOverview/EventOverview';
import Footer from '../components/Footer/Footer';
import { useParams } from "react-router-dom"; 



const EventPage = () => {
  const { eventId } = useParams(); // Get eventId from the URL
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`https://eventmanager-abvk.onrender.com/api/events/${eventId}`); // Fetch event data by eventId
        setEventData(response.data);
      } catch (error) {
        console.error("Error fetching event data", error);
      }
    };

    fetchEvent();
  }, [eventId]); // Re-fetch data when eventId changes

  if (!eventData) {
    return <p>Loading event details...</p>;
  }
  return (
    <>
    <Header />
    <EventOverview
    eventName={eventData.eventName}
    eventImage="TeaPic.png"
    selectedPeople={eventData.participants}
    dishSummary={eventData.dishSummary}
/>
    <Eventparticipants/>
    <EventActionPanel/>
    <Footer/>
  </>
  );
};

export default EventPage;
