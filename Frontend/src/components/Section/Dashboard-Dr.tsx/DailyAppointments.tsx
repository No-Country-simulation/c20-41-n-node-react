import "./DailyAppointments.css";
const appointmentsData = [
  { id: 1, patient: 'Juan Pérez', date: '2024-09-12', time: '10:00 AM', type: 'Consulta general', status: 'Confirmada' },
  { id: 2, patient: 'María López', date: '2024-09-13', time: '12:30 PM', type: 'Consulta psicológica', status: 'Pendiente' }
];

const DailyAppointments = () => {
  const today = new Date().toISOString().split('T')[0];

  const filteredAppointments = appointmentsData.filter(
    (appointment) => appointment.date === today
  );

  return (
    <div className="appointments-container">
      <h2>Citas del Día: {today}</h2>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Hora</th>
            <th>Tipo de Cita</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.patient}</td>
                <td>{appointment.time}</td>
                <td>{appointment.type}</td>
                <td>{appointment.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No hay citas para el día de hoy</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DailyAppointments;

