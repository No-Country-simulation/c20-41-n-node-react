import React, { useState, useEffect } from 'react';
import "./ScheduleAppointment.css";
import InfoSteps from './InfoSteps';
import { getSchedule } from '../../../api/auth';


const saveToLocalStorage = (data: { [key: string]: boolean }) => {
  localStorage.setItem('appointments', JSON.stringify(data));
};

const loadFromLocalStorage = () => {
  const data = localStorage.getItem('appointments');
  return data ? JSON.parse(data) : {};
};

const ScheduleAppointments: React.FC = () => {
  const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  const hours = [
    '8:00 - 9:00', '9:00 - 10:00', '10:00 - 11:00',
    '11:00 - 12:00', '12:00 - 13:00', '13:00 - 14:00',
    '14:00 - 15:00', '15:00 - 16:00'
  ];


  const [appointments, setAppointments] = useState<[{dia_semana:number, hora_inicio:string, hora_fin:string}]|[]>([]);

  const [confirmedconsultation, setconfirmedconsultation] = useState([])

  const [schedule, setSchedule] = useState([])
  useEffect(() => {
    const getconsult = async () => {
      const response = await getSchedule (19)
      return response.data
    }
    getconsult().then(data => {
      setAppointments(data)
    })
  
  }, [])
  




  const handleAppointment = (day: string, hour: string) => {
    const key = `${day}-${hour}`;
    setAppointments(prev => {
      const updated = { ...prev, [key]: !prev[key]};
      saveToLocalStorage(updated);  
      return updated;
    });
  };


  const cancelAppointment = (day: string, hour: string) => {
    const key = `${day}-${hour}`;
    setAppointments(prev => {
      const updated = { ...prev, [key]: false };  
      saveToLocalStorage(updated);  
      return updated;
    });
  };

  useEffect(() => {
    const savedAppointments = loadFromLocalStorage();
    setAppointments(savedAppointments);
  }, []);

  const selectedAppointments = Object.keys(appointments).filter(key => appointments[key]);
  return (
    <>
    <div className="schedule-container">
    <InfoSteps></InfoSteps>
      <div>
        <table className="schedule-table">
          <thead>
            <tr>
              {daysOfWeek.map(day => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody className="body">
            {hours.map(hour => (
              <tr key={hour}>
                {daysOfWeek.map(day => {
                  const key = `${day}-${hour}`;
                  return (
                    <td
                      key={key}
                      className={`cell ${appointments ? 'selected' : ''}`} // Añadir clase selected si está marcada
                    >
                      {appointments[key] ? (
                        <div className="appointment">
                          <p>{hour}</p>
                          <button onClick={() => cancelAppointment(day, hour)} className="cancel-btn">Cancelar</button>
                        </div>
                      ) : (
                        <div onClick={() => handleAppointment(day, hour)} className="hour-slot">
                          {hour}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <div className="confirmed-appointments">
    <div className="selected-appointments-container">
        <h3>Citas Seleccionadas</h3>
        {confirmedconsultation.length > 0 ? (
          <ul>
            {confirmedconsultation.map((key) => {
              // const [day, hour] = key.split('-');
              return (
                <li key={key} className="selected-appointment-item">
                  {`${daysOfWeek[key.dia_semana]}, ${key.hora_inicio}`}
                  <button onClick={() => cancelAppointment(key.dia_semana, key.hora_inicio)} className="cancel-small-btn">
                    X
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No hay citas seleccionadas</p>
        )}
      </div>
      </div>
    </>
  );
};

export default ScheduleAppointments;





