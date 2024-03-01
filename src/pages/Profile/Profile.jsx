import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import {
  getUserById,
  getAppointmentById,
  getAllArtist,
  updateUserById,
  deleteAppointmentById,
  updateScheduleById,
} from "../../services/apiCalls";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import moment from "moment";
import "moment/locale/pt-br";
import { Alert } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";
import edit_button from "../../assets/img/edit_button.png";
import promo_1 from "../../assets/img/promo_1.jpg";
import promo_2 from "../../assets/img/promo_2.jpg";
import promo_3 from "../../assets/img/promo_3.jpg";
import icono_cita from "../../assets/img/icono_cita.png";
import icono_equipo from "../../assets/img/icono_equipo.png";
import icono_contacto from "../../assets/img/icono_contacto.png";
import icono_mis_citas from "../../assets/img/icono_miscitas.png";
import icono_borrar from "../../assets/img/icono_borrar.png";

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
  const [isAppointment, setisAppointment] = useState(false);
  const [show, setShow] = useState(false);

  const token = userRdxData.credentials.token;
  const myId = userRdxData.credentials.userData?.user_id;

  useEffect(() => {
    if (!token) {
      navigate("/register");
    } else {
      setTimeout(() => {
        getUserById(token, myId).then((res) => {
          setProfileData(res);
        });
        getAllArtist().then((res) => {
          setArtistData(res);
        });
      }, 100);
    }
  }, []);

  const inputHandler = (event) => {
    setProfileDataUpdate((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {}, [profileDataUpdate]);

  const buttonHandler = () => {
    setIsEditing(!isEditing);
  };
  const userAppointment = () => {
    getAppointmentById(token, myId).then((res) => {
      setAppointmentData(res);
    });
  };

  const isAppointmnetStatus = () => {
    isAppointment ? setisAppointment(false) : setisAppointment(true);
  };

  const deleteAppointment = (id, schedulesId) => {
    deleteAppointmentById(token, id);
    const updateActive = {
      active: 1,
    };

    updateScheduleById(schedulesId, updateActive);
    setisAppointment(false);
  };

  const updateUser = () => {
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
                <Button
                  variant="outline-danger"
                  onClick={() => buttonHandler()}
                >
                  Anular
                </Button>
              </ListGroup.Item>
            ) : null}
          </ListGroup>
        </Card>
        <div className="icons_container">
          <div className="icon">
            <img
              src={icono_mis_citas}
              alt=""
              onClick={() => (userAppointment(), isAppointmnetStatus())}
            />
          </div>
          <div className="icon">
            <img
              src={icono_cita}
              alt=""
              onClick={() => navigate("/appointments")}
            />
          </div>
          <div className="icon">
            <img
              src={icono_equipo}
              onClick={() => navigate("/appointments")}
              alt=""
            />
          </div>
          <div className="icon">
            <img src={icono_contacto} alt="" />
          </div>
        </div>

        <div className="table_container">
          {isAppointment ? (
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Artista</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Anular</th>
                </tr>
              </thead>
              <tbody>
                {appointmentData.map((id, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{artistData[index + 1]?.nickname}</td>
                    <td>
                      {moment(appointmentData[index].appointment_date).format(
                        "DD/MM/YYYY"
                      )}
                    </td>
                    <td>{appointmentData[index].hour}</td>
                    <td>
                      <img
                        src={icono_borrar}
                        alt=""
                        onClick={() =>
                          deleteAppointment(
                            appointmentData[index].id,
                            appointmentData[index].schedules_id
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : null}
        </div>
        <div className="btn_conatiner">
          <div className="imgBtn">
            {/* <Image src={img_register} rounded /> */}
            <Carousel>
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
