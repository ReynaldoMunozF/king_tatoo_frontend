import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import "./Artist_Profile.css";
import {
  getArtistById,
  getAppointmentByArtistId,
} from "../../services/apiCalls";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import Button from "react-bootstrap/Button";
import moment from "moment";
import { ListGroupItem } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import icono_cita from "../../assets/img/icono_cita.png";
import icono_equipo from "../../assets/img/icono_equipo.png";
import icono_contacto from "../../assets/img/icono_contacto.png";
import icono_mis_citas from "../../assets/img/icono_miscitas.png";
import Table from "react-bootstrap/Table";
import { Tables } from "../../components/Tables/Tables";

export const Artist_profile = () => {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({});
  const [appointmentsData, setAppointmentData] = useState([]);
  const userRdxData = useSelector(userData);
  const [isEditing, setIsEditing] = useState(false);
  const [show, setShow] = useState(true);

  const token = userRdxData.credentials.token;
  const myId = userRdxData.credentials.userData?.tattoo_artist_id;

  console.log(profileData);
  console.log(appointmentsData);
  console.log(token);

  console.log(token);

  const appointmentPending = appointmentsData.length;
  console.log(appointmentPending);

  //console.log(artistAppointmentsData[0].user.first_name)
  useEffect(() => {
    if (!token) {
      navigate("/register");
    } else {
      setTimeout(() => {
        getArtistById(token, myId).then((res) => {
          setProfileData(res);
        });
        getAppointmentByArtistId(token, myId).then((res) => {
          setAppointmentData(res);
        });
      }, 100);
    }
  }, []);

  return (
    <div className="profile_container">
      <div className="alert_container">
        <Alert variant="warning" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>
            Tienes {appointmentPending} citas nuevas
          </Alert.Heading>
        </Alert>
      </div>
      <ListGroup variant="flush">
        <ListGroup.Item variant="secondary">PERFIL</ListGroup.Item>
        <ListGroup.Item>
          <strong>Nickname: </strong>
          <CustomInput
            placeholder={profileData.nickname}
            statusDisabled={!isEditing}
            statusFocus={!isEditing}
            name="nickname"
            type="text"
            // handler={inputHandler}
          ></CustomInput>
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Nombre: </strong>
          <CustomInput
            placeholder={profileData.first_name}
            statusDisabled={!isEditing}
            statusFocus={!isEditing}
            name="first_name"
            type="text"
            // handler={inputHandler}
          ></CustomInput>
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Apellido: </strong>
          <CustomInput
            placeholder={profileData.last_name}
            statusDisabled={!isEditing}
            statusFocus={!isEditing}
            name="last_name"
            type="text"
            // handler={inputHandler}
          ></CustomInput>
        </ListGroup.Item>

        <ListGroup.Item>
          <strong>Email: </strong>
          <CustomInput
            placeholder={profileData.email}
            statusDisabled={!isEditing}
            statusFocus={!isEditing}
            name="email"
            type="text"
            // handler={inputHandler}
          ></CustomInput>
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Fecha de Alta: </strong>
          <CustomInput
            placeholder={moment(profileData.created_at).format("DD-MM-YYYY")}
            statusDisabled={!isEditing}
            statusFocus={!isEditing}
            name="last_name"
            type="text"
            // handler={inputHandler}
          ></CustomInput>
        </ListGroup.Item>
      </ListGroup>
      <br />
      <div className="icons_container">
        <div className="icon">
          <img src={icono_mis_citas} alt="" />
        </div>
        <div className="icon">
          <img
            src={icono_cita}
            alt=""
            onClick={() => navigate("/appointments")}
          />
        </div>
        <div className="icon">
          <img src={icono_equipo} alt="" />
        </div>
        <div className="icon">
          <img src={icono_contacto} alt="" />
        </div>
      </div>
      <br />

      <div className="table_container">
        <Table striped bordered hover variant="light">
          <thead >
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {appointmentsData.map((id, index) => (
              <tr>
                <td>{index +1}</td>
                <td>{appointmentsData[index].user.first_name}</td>
                <td>{appointmentsData[index].user.last_name}</td>
                <td>{moment(appointmentsData[index].appointment_date).format("DD/MM/YYYY")}</td>
                <td>{appointmentsData[index].hour}</td>
                <td>{appointmentsData[index].user.phone}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
