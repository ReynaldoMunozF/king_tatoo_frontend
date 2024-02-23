import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import "./Artist_Profile.css";
import {
  getArtistById,
  getAppointmentByArtistId,
  updateArtistById
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
import Image from 'react-bootstrap/Image';
import Table from "react-bootstrap/Table";
import artist_1 from "../../assets/img/artista_1.jpg";
import edit_button from "../../assets/img/edit_button.png";

import { button } from "@nextui-org/react";
import Accordion from "react-bootstrap/Accordion";

export const Artist_profile = () => {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({});
  const [profileDataUpdate, setProfileDataUpdate] = useState({
    first_name: "",
    last_name: "",
    email: "",
    // nickname: "",
  });
  const [appointmentsData, setAppointmentData] = useState([]);
  const userRdxData = useSelector(userData);
  const [isEditing, setIsEditing] = useState(false);
  const [isAppointment, setisAppointment] = useState(false);
  const [isNotification, setIsNotification] = useState(true);

  const [show, setShow] = useState(true);

  const token = userRdxData.credentials.token;
  const myId = userRdxData.credentials.userData?.tattoo_artist_id;

  console.log(profileData);
  console.log(appointmentsData);
  console.log(token);

  console.log(token);

  const appointmentPending = appointmentsData.length;
  console.log(appointmentPending);

  const isAppointmnetStatus = () =>{

    isAppointment ? setisAppointment(false) : setisAppointment(true);



  }

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


  const inputHandler = (event) => {
    setProfileDataUpdate((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    console.log(profileDataUpdate);
  };

  const buttonHandler = () => {
    setIsEditing(!isEditing);
    console.log(isEditing);

  };

  const updateArtist = () => {
    console.log(profileDataUpdate.first_name);
    if (profileDataUpdate.first_name == "") {
      profileDataUpdate.first_name = profileData.first_name;
    }
    if (profileDataUpdate.last_name == "") {
      profileDataUpdate.last_name = profileData.last_name;
    }
    // if (profileDataUpdate.nickname == "") {
    //   profileDataUpdate.nickname = profileData.nickname;
    // }
    if (profileDataUpdate.email == "") {
      profileDataUpdate.email = profileData.email;
    }

    updateArtistById(token, myId, profileDataUpdate);
    setIsEditing(false);
    //window.location.replace("");
  };

  return (
    <div className="profile_container">
      <div className="alert_container">
        {/* <Alert variant="warning" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>
            Tienes {appointmentPending} citas nuevas
          </Alert.Heading>
        </Alert> */}
      </div>
      <Card>
        <ListGroup variant="flush">
          <ListGroup.Item className="head_container_list" variant="secondary">{!isEditing ? (
                <img
                className="img_edit"
                  src={edit_button}
                  alt="edit"
                  onClick={() => buttonHandler()}
                />
              ) : null} MI PERFIL   <Image className="img_profile" src={artist_1} roundedCircle /></ListGroup.Item>
          
          <ListGroup.Item>
            <strong>Nickname: </strong>
            <CustomInput
              placeholder={profileData.nickname}
              statusDisabled={true}
              statusFocus={true}
              name="nickname"
              type="text"
               handler={inputHandler}
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
               handler={inputHandler}
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
               handler={inputHandler}
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
              handler={inputHandler}
            ></CustomInput>
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Fecha de Alta: </strong>
            <CustomInput
              placeholder={moment(profileData.created_at).format("DD-MM-YYYY")}
              statusDisabled={true}
              statusFocus={true}
              name="last_name"
              type="text"
              // handler={inputHandler}
            ></CustomInput>
          </ListGroup.Item>
          {isEditing ? (
              <ListGroup.Item className="d-flex justify-content-end align-items-start">
                <Button variant="outline-success" onClick={() => updateArtist()}>
                  Guardar
                </Button>
                <Button variant="outline-danger" onClick={() => buttonHandler()} >Anular</Button>
              </ListGroup.Item>
            ) : null}
        </ListGroup>
      </Card>
      <br />
      <div className="icons_container">
        <div className="icon">
          <img
            src={icono_mis_citas}
            alt=""
            onClick={() => (isAppointmnetStatus(), setIsNotification(false))}
          />
          {isNotification ? (
            <button className="btnNotification">{appointmentPending}</button>
          ) : null}
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
      <div className="table_container_artist">
        {isAppointment ? (
          <Table striped bordered hover variant="dark">
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
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{appointmentsData[index].user.first_name}</td>
                  <td>{appointmentsData[index].user.last_name}</td>
                  <td>
                    {moment(appointmentsData[index].appointment_date).format(
                      "DD/MM/YYYY"
                    )}
                  </td>
                  <td>{appointmentsData[index].hour}</td>
                  <td>{appointmentsData[index].user.phone}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : null}
      </div>
    </div>
  );
};
