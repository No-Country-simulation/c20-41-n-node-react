import React, { useState, useEffect } from 'react';
import "./ScheduleAppointment.css";
import InfoSteps from './InfoSteps';
import { getSchedule } from '../../../api/auth';

const ScheduleAppointments: React.FC = () => {
  const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  const hours = [
    '8:00 - 9:00', '9:00 - 10:00', '10:00 - 11:00',
    '11:00 - 12:00', '12:00 - 13:00', '13:00 - 14:00',
    '14:00 - 15:00', '15:00 - 16:00'
  ];

  const [appointments, setAppointments] = useState<[{ dia_semana: number, hora_inicio: string, hora_fin: string }] | []>([]);
  const [confirmedConsultations, setConfirmedConsultations] = useState<{ dia_semana: number, hora_inicio: string, hora_fin: string }[]>([]);

  // Obtener la lista de citas del backend
  useEffect(() => {
    const getconsult = async () => {
      const response = await getSchedule(19);
      return response.data;
    }
    getconsult().then(data => {
      setAppointments(data);
    });
  }, []);

  // Manejar la selección de una cita
  const handleAppointment = (day: string, hour: string) => {
    const startHour = hour.split(' - ')[0];
    const endHour = hour.split(' - ')[1];

    const startTimeUTC = new Date(`2024-09-17T${startHour}:00Z`).toISOString();
    const endTimeUTC = new Date(`2024-09-17T${endHour}:00Z`).toISOString();

    const selectedConsultation = {
      dia_semana: daysOfWeek.indexOf(day),
      hora_inicio: startTimeUTC,
      hora_fin: endTimeUTC
    };

    setConfirmedConsultations(prev => [...prev, selectedConsultation]);
  };

  // Cancelar una cita
  const cancelAppointment = (day: string, hour: string) => {
    const updatedConsultations = confirmedConsultations.filter(appointment => 
      !(appointment.dia_semana === daysOfWeek.indexOf(day) && appointment.hora_inicio.includes(hour.split(' - ')[0]))
    );
    setConfirmedConsultations(updatedConsultations);
  };

  return (
    <>
      <div className="schedule-container">
        <InfoSteps />
        <div>
          <table className="schedule-table">
            <thead>
              <tr>
                {daysOfWeek.map(day => (
                  <th key={day}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hours.map(hour => (
                <tr key={hour}>
                  {daysOfWeek.map(day => {
                    const key = `${day}-${hour}`;
                    return (
                      <td
                        key={key}
                        className="cell"
                      >
                        <div onClick={() => handleAppointment(day, hour)} className="hour-slot">
                          {hour}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contenedor de citas confirmadas */}
      <div className="confirmed-appointments">
        <h3>Citas Seleccionadas</h3>
        {confirmedConsultations.length > 0 ? (
          <ul>
            {confirmedConsultations.map((appointment, index) => (
              <li key={index}>
                {`${daysOfWeek[appointment.dia_semana]}, de ${appointment.hora_inicio} a ${appointment.hora_fin}`}
                <button onClick={() => cancelAppointment(daysOfWeek[appointment.dia_semana], appointment.hora_inicio)} className="cancel-small-btn">
                  X
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay citas seleccionadas</p>
        )}
      </div>
    </>
  );
};


export default ScheduleAppointments;




