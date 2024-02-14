import Button from 'react-bootstrap/Button';

export const BtnAppointments = ({active, hour}) => {

    let activeSchedule = "success"
    let inactiveSchedule = "danger"
    let disable 
    let color
    
    if (active == 1) {
        color = activeSchedule;
        disable = false
    } else {
        color = inactiveSchedule;
        disable = false
    }

  return (
    <>
      
      <Button variant={color} disabled={disable}>{hour}</Button>{' '}
      
    </>
  );
}

