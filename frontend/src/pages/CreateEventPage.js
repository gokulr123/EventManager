import React from 'react';
import Header from "../components/Header/Header";
import Footer from '../components/Footer/Footer';
import CreateEventForm from '../components/Admin/CreateEventForm/CreateEventForm';




const CreateEventPage = () => {
  return (
    <>
    <Header />
    <CreateEventForm/>
    <Footer/>
  </>
  );
};

export default CreateEventPage;
