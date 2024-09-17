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
    <div className="daily-card-container">
      <h2 className="daily-card-title">Citas del Día: {today}</h2>
      {filteredAppointments.length > 0 ? (
        filteredAppointments.map((appointment) => (
          <div key={appointment.id} className="appointment-card">
            <div className="card-header">
              <h3>{appointment.patient}</h3>
              <span className={`status ${appointment.status.toLowerCase()}`}>
                {appointment.status}
              </span>
            </div>
            <div className="card-body">
              <p><strong>Hora:</strong> {appointment.time}</p>
              <p><strong>Tipo de Cita:</strong> {appointment.type}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No hay citas para el día de hoy</p>
      )}
    </div>
  );
};

export default DailyAppointments;

