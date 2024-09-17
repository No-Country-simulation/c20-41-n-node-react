
import "./InfoSteps.css";

const InfoSteps = () => {
  return (
    <div className="info-steps-container">
      <h3 className="info-title">Agenda tus citas de manera versátil y eficiente</h3>
      <ul className="info-steps-list">
        <li><strong>Selecciona un día y hora disponible:</strong> Haz clic en un día de la semana que te convenga y elige una franja horaria dentro de tu horario de atención.</li>
        <li><strong>Confirma y guarda la cita:</strong> Una vez que seleccionas un horario, el cuadro cambiará de color. Revisa los detalles de la cita y haz clic en “Reservar” para confirmar.</li>
        <li><strong>Consulta tus citas programadas:</strong> Las citas que ya hayas agendado se mostrarán en el calendario con un color distinto. Puedes volver a esta página para ver en qué horas tienes citas asignadas.</li>
        <li><strong>Modifica o elimina una cita:</strong> Si deseas cambiar el horario de una cita, selecciónala nuevamente para modificarla. También puedes eliminar una cita si ya no es necesaria.</li>
        <li><strong>Organiza tu agenda de manera simple:</strong> Con este calendario semanal, puedes gestionar fácilmente tus citas de lunes a viernes, asegurándote de optimizar tu tiempo.</li>
      </ul>
    </div>
  );
};

export default InfoSteps;
