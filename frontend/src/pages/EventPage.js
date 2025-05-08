import React ,{ useEffect, useState }from 'react';
import axios from '../Services/Api';
import Header from "../components/Header/Header";
import Eventparticipants from '../components/EventParticipantsList/EventparticipantsList'
import EventActionPanel from '../components/EventActionpanel/EventActionpanel'
import EventOverview from '../components/EventOverview/EventOverview';
import Footer from '../components/Footer/Footer';
import { useParams } from "react-router-dom"; 
import io from "socket.io-client";
import GlobalLoading from '../components/GlobalModal/GlobalLoading';

const socket = io(`${process.env.REACT_APP_API_BASE_URL}`); 



// const EventPage = () => {
//   const { eventId } = useParams(); // Get eventId from the URL
//   const [eventData, setEventData] = useState(null);
//   const [showRandomNames, setShowRandomNames] = useState(false);
//   const [loading, setLoading] = useState(false);
  
//   const fetchEvent = async () => {
//     try {
//       const response = await axios.get(`/api/events/${eventId}`);
//       await new Promise((resolve) => setTimeout(resolve, 10000));
//       setEventData(response.data);
//     } catch (error) {
//       console.error("Error fetching event data", error);
//     }
//   };
//   useEffect(() => {
//     socket.emit("join-event-room", eventId);
//     setShowRandomNames(false)
//     fetchEvent();
//   }, [eventId]); // Re-fetch data when eventId changes

//   useEffect(() => {
//     const handleEventUpdated = () => {
//       fetchEvent();
//     };
  
//     socket.on("event-updated", handleEventUpdated);
  
//     return () => {
//       socket.off("event-updated", handleEventUpdated);
//     };
//   }, [eventId]);

//   if (!eventData) {
//     return <GlobalLoading/>;
//   }
//   return (
//     <>
//     <Header />
//     <EventOverview
//     eventName={eventData.eventName}
//     eventImage="TeaPic.png"
//     selectedPeople={eventData.randomTeaServants}
//     dishSummary={eventData.dishSummary}
//     eventId={eventId}
//     showRandomNames={showRandomNames}
// />
//     <Eventparticipants participants={eventData.participants}  eventId={eventId}/>
//     <EventActionPanel setShowRandomNames={setShowRandomNames} eventId={eventId} eventData={eventData} participants={eventData.participants} socket={socket}/>
//     <Footer/>
//   </>
//   );
// };
const EventPage = () => {
  const { eventId } = useParams(); // Get eventId from the URL
  const [eventData, setEventData] = useState(null);
  const [showRandomTeaRunners, setShowRandomTeaRunners] = useState(false);
  const [showRandomCleanupCrew, setShowRandomCleanupCrew] = useState(false);
  const [loading, setLoading] = useState(false); // start as true

  const fetchEvent = async () => {
    try {
      setLoading(true); // show loading
      const response = await axios.get(`/api/events/${eventId}`);
      setEventData(response.data);
    } catch (error) {
      console.error("Error fetching event data", error);
    } finally {
      setLoading(false); // hide loading
    }
  };

  useEffect(() => {
    socket.emit("join-event-room", eventId);
    setShowRandomTeaRunners(false);
    setShowRandomCleanupCrew(false)
    fetchEvent();
  }, [eventId]);

  useEffect(() => {
    const handleEventUpdated = () => {
      fetchEvent();
    };
  
    socket.on("event-updated", handleEventUpdated);
  
    return () => {
      socket.off("event-updated", handleEventUpdated);
    };
  }, [eventId]);

  return (
    <>
      <Header />
      {loading && <GlobalLoading />} {/* Loading modal on top */}
  
      {/* Always render the components with fallback if data is not available */}
      <EventOverview
        eventName={eventData?.eventName}
        eventImage="TeaPic.png"
        selectedPeople={eventData?.randomTeaServants}
        dishSummary={eventData?.dishSummary}
        eventId={eventId}
        showRandomTeaRunners={showRandomTeaRunners}
        showRandomCleanupCrew={showRandomCleanupCrew}
      />
  
      <Eventparticipants
        participants={eventData?.participants || []}
        eventId={eventId}
      />
  
      <EventActionPanel
        setShowRandomTeaRunners={setShowRandomTeaRunners}
        setShowRandomCleanupCrew={setShowRandomCleanupCrew}
        eventId={eventId}
        eventData={eventData}
        participants={eventData?.participants || []}
        socket={socket}
      />
  
      <Footer />
    </>
  );
};

export default EventPage;
