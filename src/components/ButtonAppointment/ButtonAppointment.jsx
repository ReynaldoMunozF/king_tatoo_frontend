import Button from 'react-bootstrap/Button';

export const BtnAppointments = ({active, hour}) => {

    let activeSchedule = "dark"
    let inactiveSchedule = "outline-dark"
    let disable 
    let color
    
    if (active == 1) {
        color = activeSchedule;
        disable = false
    } else {
        color = inactiveSchedule;
        disable = true
    }

  return (
    <>
      
      <Button variant={color} disabled={disable}>{hour}</Button>{' '}
      
    </>
  );
}

