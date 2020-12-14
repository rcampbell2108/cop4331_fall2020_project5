//  ***Russell Campbell
//  ***COP4331 Fall 2020
//  ***Form.js

//  ***This module runs the app 

import React, { Fragment, useState, useEffect } from "react";
import Form from "./components/Form";
import Appointment from "./components/Appointment";

import Icon from "react";
import ReactDOM from "react-dom";

import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

//  This function drives the app
function App() 
{
  let initial_appointments = JSON.parse(localStorage.getItem('appointments'));
  
  if (!initial_appointments) 
  {
    initial_appointments = [];
  }

  //    array of appointments
  const [appointments, savedAppointments] = useState(initial_appointments);

  //    useEffect does operations when the state changes
  useEffect(() => {
    let initial_appointments = JSON.parse(localStorage.getItem('appointments'));

    if (initial_appointments) 
    {
      localStorage.setItem('appointments', JSON.stringify(appointments));
    } 
    else {
      localStorage.setItem('appointments', JSON.stringify([]));
    }

  }, [appointments]);

  //    Function to take appointment and add new
  const created_appointment = appointment => {
    savedAppointments([...appointments, appointment]);
  };

  const deleted_appointment = id => {
    const newAppointments = appointments.filter(appointment => appointment.id !== id );
    savedAppointments(newAppointments);
  }

  const title =
    appointments.length === 0 ? "No appointments" : "Manage Appointments";

  //    Displays web app
  return (
    <Fragment>
      <h1> Appointment System </h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Form created_appointment={created_appointment} />
          </div>
          
          <div className="one-half column">
            <h2> {title}</h2>
            {appointments.map((appointment) => (
              <Appointment key={appointment.id} appointment={appointment} deleted_appointment={deleted_appointment} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;