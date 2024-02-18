import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const ModalAppointment = ({ createAppointmentById, Title, date, hour, closeModal }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
     

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{Title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <h1> Día : {date}</h1>
            <br />
            <h2>Hora: {hour}</h2>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModal}>
            Cerrar
          </Button>
          <Button variant="success" onClick={createAppointmentById} >
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
