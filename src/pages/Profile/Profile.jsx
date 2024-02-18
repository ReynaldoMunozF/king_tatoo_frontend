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

export const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  const [profileDataUpdate, setProfileDataUpdate] = useState({
    first_name: "",
    last_name: "",
    email: "",
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

  // useEffect(() => {
  //   //console.log(profileData)
  // }, [profileData]);

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

    updateUserById(token, myId, profileDataUpdate);
  };

  return (
    <div className="profileDesign">
      <div className="profileData_container">
        <Card style={{ width: "20rem" }}>
          <ListGroup variant="flush">
            <ListGroup.Item variant="secondary" active>
              <strong>PERFIL</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Nonbre: </strong>  <CustomInput
                  placeholder={profileData.first_name}
                  value={profileData.first_name}
                  statusDisabled={!isEditing}
                  name="first_name"
                  type="text"
                  handler={inputHandler}
                  ></CustomInput>
                  <button onClick={()=> buttonHandler()}>a</button>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Apellidos:</strong> {profileData.last_name}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Teléfono:</strong> {profileData.phone}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Fecha Nacimiento:</strong>{" "}
              {moment(profileData.birthday).format("DD-MM-YYYY")}
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <strong>Email: </strong> {profileData.email}
            </ListGroup.Item>
          </ListGroup>
        </Card>

        <button onClick={() => buttonHandler()}>EDITAR PERFIL</button>

        <Button
          className="modificar"
          variant="warning"
          size="sm"
          onClick={() => userAppointment()}
        >
          MIS CITAS
        </Button>
        {isEditing ? (
          <Card style={{ width: "20rem" }}>
            <ListGroup variant="flush">
              <ListGroup.Item variant="secondary" active>
                <strong>PERFIL</strong>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Nonbre: </strong>
                <CustomInput
                  placeholder={profileData.first_name}
                  name="first_name"
                  type="text"
                  handler={inputHandler}
                ></CustomInput>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Apellidos:</strong>{" "}
                <CustomInput
                  placeholder={profileData.last_name}
                  name="last_name"
                  type="text"
                  handler={inputHandler}
                ></CustomInput>
              </ListGroup.Item>
              {/* <ListGroup.Item>
                <strong>Teléfono:</strong>{" "}
                <CustomInput
                  placeholder={profileData.last_name}
                  name="phone"
                  type="text"
                  handler={inputHandler}
                ></CustomInput>
              </ListGroup.Item> */}
              <ListGroup.Item>
                <strong>Fecha Nacimiento:</strong>{" "}
                <CustomInput
                  placeholder={profileData.last_name}
                  name="birthday"
                  type="date"
                  handler={inputHandler}
                ></CustomInput>
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                <strong>Email: </strong>{" "}
                <CustomInput
                  placeholder={profileData.last_name}
                  name="email"
                  type="email"
                  handler={inputHandler}
                ></CustomInput>
              </ListGroup.Item>
              <button onClick={() => updateUser()}>ENVIAR</button>
            </ListGroup>
          </Card>
        ) : // <ListGroup.Item variant="secondary" active>
        //   <CustomInput
        //     name="firstName"
        //     type="text"
        //     handler={inputHandler}
        //   ></CustomInput>
        //   <CustomInput
        //     name="firstName"
        //     type="text"
        //     handler={inputHandler}
        //   ></CustomInput>
        // </ListGroup.Item>
        null}
      </div>

      {/* <---------------------------------------------------------------- */}

      <div className="table_container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Artista</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Opciones</th>
            </tr>
          </thead>
        </Table>
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
