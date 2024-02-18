import Table from "react-bootstrap/Table";
import Badge from 'react-bootstrap/Badge';

export const Tables = ({artist, date, hour, anular}) => {
  return (
    <Table striped bordered hover  >
      
      <tbody variant="light">
        <tr>
        
          <td>{artist}</td>
          <td>{date}</td>
          <td>{hour}</td>
          <td><Badge pill bg="warning" onClick = {anular} >
            Modificar
          </Badge><br /><Badge pill bg="danger">
            Anular
          </Badge></td>
         
          
          
        </tr>
      </tbody>
    </Table>
  );
};
