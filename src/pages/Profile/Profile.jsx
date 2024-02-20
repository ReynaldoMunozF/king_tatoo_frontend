import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import {
  getUserById,
  getAppointmentById,
  getAllArtist,
  // updateAppointmentById,
  updateUserById,
} from "../../services/apiCalls";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";

import { AppointmentCard } from "../../components/appointmentFormat/AppointmentFormat";
import moment from "moment";
import "moment/locale/pt-br";
import { Alert } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Tables } from "../../components/Tables/Tables";
import Table from "react-bootstrap/Table";
import edit_button from "../../assets/img/edit_button.png";
import promo_1 from "../../assets/img/promo_1.jpg";
import promo_2 from "../../assets/img/promo_2.jpg";
import promo_3 from "../../assets/img/promo_3.jpg";
import icono_cita from "../../assets/img/icono_cita.png";
import icono_equipo from "../../assets/img/icono_equipo.png";
import icono_contacto from "../../assets/img/icono_contacto.png";
import icono_mis_citas from "../../assets/img/icono_miscitas.png";

export const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  const [profileDataUpdate, setProfileDataUpdate] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    birthday: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [appointmentData, setAppointmentData] = useState([]);
  const [artistData, setArtistData] = useState([]);
  const userRdxData = useSelector(userData);
  const [startDate, setStartDate] = useState(new Date());

  const token = userRdxData.credentials.token;
  const myId = userRdxData.credentials.userData?.user_id;

  //console.log(artistData);
  //console.log(appointmentData[0].tattoo_artist_id);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/register");
    } else {
      setTimeout(() => {
        getUserById(token, myId).then((res) => {
          //console.log(res, "soy la respuesta del server");
          setProfileData(res);
        });
        getAllArtist().then((res) => {
          //console.log(res, "soy la respuesta de los artist");
          setArtistData(res);
        });
      }, 1000);
    }
  }, []);
  //console.log(artistData[0].nickname);

  const inputHandler = (event) => {
    setProfileDataUpdate((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    console.log(profileDataUpdate);
  };

  useEffect(() => {
    //   //console.log(profileData)
  }, [profileDataUpdate]);

  const buttonHandler = () => {
    setIsEditing(!isEditing);
    console.log(isEditing);

    // if (isEditing === false) {
    //     setIsEditing(true)
    // } else {
    //     setIsEditing(false)
    // }
  };
  const userAppointment = () => {
    getAppointmentById(token, myId).then((res) => {
      console.log(res, "soy la respuesta de appointments");
      setAppointmentData(res);
    });

    //console.log(appointmentData[0]?.appointment_date);
  };

  const visible = (id_appointment) => {
    setShow(true);
    const idAppointment = id_appointment;
    console.log(idAppointment + "soy el id de la cita");
  };

  const updateUser = () => {
    console.log(profileDataUpdate.first_name);
    if (profileDataUpdate.first_name == "") {
      profileDataUpdate.first_name = profileData.first_name;
    }
    if (profileDataUpdate.last_name == "") {
      profileDataUpdate.last_name = profileData.last_name;
    }
    if (profileDataUpdate.birthday == "") {
      profileDataUpdate.birthday = profileData.birthday;
    }
    if (profileDataUpdate.email == "") {
      profileDataUpdate.email = profileData.email;
    }

    updateUserById(token, myId, profileDataUpdate);
    setIsEditing(false);
    //window.location.replace("");
  };

  return (
    <div className="profileDesign">
      <div className="profileData_container">
        <Card style={{ width: "26rem" }}>
          <ListGroup variant="flush">
            <ListGroup.Item variant="secondary" active>
              <strong>PERFIL</strong>{" "}
              {!isEditing ? (
                <img
                  src={edit_button}
                  alt="edit"
                  onClick={() => buttonHandler()}
                />
              ) : null}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Nonbre: </strong>{" "}
              <CustomInput
                placeholder={profileData.first_name}
                value={profileData.first_name}
                statusDisabled={!isEditing}
                statusFocus={!isEditing}
                name="first_name"
                type="text"
                handler={inputHandler}
              ></CustomInput>
              {/* <img src= {edit_button} alt="edit" onClick={()=> buttonHandler()} /> */}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Apellidos:</strong>
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
              <strong>Teléfono:</strong>{" "}
              <CustomInput
                placeholder={profileData.phone}
                statusDisabled={!isEditing}
                statusFocus={!isEditing}
                name="phone"
                type="text"
                handler={inputHandler}
              ></CustomInput>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Fecha Nacimiento:</strong>
              <CustomInput
                placeholder={
                  !profileData.birthday == ""
                    ? moment(profileData.birthday).format("DD-MM-YYYY")
                    : ""
                }
                statusDisabled={!isEditing}
                statusFocus={!isEditing}
                name="birthday"
                type={isEditing ? "date" : "text"}
                handler={inputHandler}
              ></CustomInput>
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <strong>Email: </strong>{" "}
              <CustomInput
                placeholder={profileData.email}
                statusDisabled={!isEditing}
                statusFocus={!isEditing}
                name="email"
                type="email"
                handler={inputHandler}
              ></CustomInput>
            </ListGroup.Item>
            {isEditing ? (
              <ListGroup.Item className="d-flex justify-content-end align-items-start">
                <Button variant="outline-success" onClick={() => updateUser()}>
                  Guardar
                </Button>
                <Button variant="outline-danger" onClick={() => buttonHandler()} >Anular</Button>
              </ListGroup.Item>
            ) : null}
          </ListGroup>
        </Card>
        <div className="icons_container">
              <div className="icon"><img src={icono_mis_citas} alt="" onClick={() => userAppointment()} /></div>
              <div className="icon"><img src={icono_cita} alt="" onClick={() => navigate("/appointments")}/></div>
              <div className="icon"><img src={icono_equipo} alt="" /></div>
              <div className="icon"><img src={icono_contacto} alt="" /></div>
              

        </div> 
        <div className="btn_conatiner">
        
          <div className="table_container">
        {appointmentData.map((id, index) => (
          <Tables
            key={index}
            artist={artistData[index]?.nickname}
            date={moment(appointmentData[index].appointment_date).format(
              "DD-MM-YYYY"
            )}
            hour={appointmentData[index].hour}
          />
        ))}
      </div>
          <div className="imgBtn">
            {/* <Image src={img_register} rounded /> */}
            <Carousel >
              <Carousel.Item>
                <img src={promo_1} alt="" />
              </Carousel.Item>
              <Carousel.Item>
                <img src={promo_2} alt="" />
              </Carousel.Item>
              <Carousel.Item>
                <img src={promo_3} alt="" />
              </Carousel.Item>
            </Carousel>
          </div>
          
        </div>
      </div>

      {/* <---------------------------------------------------------------- */}

   

      {show ? (
        <Alert
          className="mb-2"
          variant="danger"
          onClose={() => setShow(false)}
          dismissible
        >
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="red-border"
          />
          Todos los campos son Obligatorios.
        </Alert>
      ) : (
        <div />
      )}
    </div>
  );
};
