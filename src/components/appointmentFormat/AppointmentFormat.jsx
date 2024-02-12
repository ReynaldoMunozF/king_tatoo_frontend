import "./AppointmentsCard.css"
export const AppointmentCard = ({ date, hour, artist }) => {
  return (
    <div className="AppointmentFormat">
      <h3>{artist}</h3>
      <p>{date}</p>
      <p>{hour}</p>
      
    </div>
  );
};