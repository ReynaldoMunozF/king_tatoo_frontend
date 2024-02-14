import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import {
  getUserById,
  getAppointmentById,
  getAllArtist,
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


export const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [appointmentData, setAppointmentData] = useState([]);
  const [artistData, setArtistData] = useState([]);
  const userRdxData = useSelector(userData);
  const [startDate, setStartDate] = useState(new Date());

  const token = userRdxData.credentials.token;
  const myId = userRdxData.credentials.userData.user_id;
  console.log(artistData);
  //console.log(appointmentData[0].tattoo_artist_id);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/register");
    } else {
      setTimeout(() => {
        getUserById(token, myId).then((res) => {
          console.log(res, "soy la respuesta del server");
          setProfileData(res);
        });
        getAllArtist().then((res) => {
          console.log(res, "soy la respuesta de los artist");
          setArtistData(res);
        });
      }, 1000);
    }
  }, []);
  //console.log(artistData[0].nickname);

  const inputHandler = (event) => {
    setProfileData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    //console.log(profileData)
  }, [profileData]);

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
    if (!token) {
      navigate("/register");
    } else {
      getAppointmentById(token, myId).then((res) => {
        console.log(res, "soy la respuesta de appointments");
        setAppointmentData(res);
      });
    }

    //console.log(appointmentData[0]?.appointment_date);
  };

  const visible = (id_appointment) => {
    setShow(true);
    const idAppointment = id_appointment;
    console.log(idAppointment + "soy el id de la cita");
  };

  return (
    <div className="profileDesign">
      <h1>{profileData.first_name}</h1>
      <h1>{profileData.last_name}</h1>
      <h1>{profileData.email}</h1>
      <h1>{profileData.phone}</h1>

      <button onClick={() => buttonHandler()}></button>

      <Button
        className="modificar"
        variant="warning"
        size="sm"
        onClick={() => userAppointment()}
      >
        MIS CITAS
      </Button>
      {isEditing ? (
        <CustomInput
          name="firstName"
          type="text"
          handler={inputHandler}
        ></CustomInput>
      ) : null}

      {/* <---------------------------------------------------------------- */}

      <div className="appointmentsUserContainer">
        {appointmentData.map((id, index) => (
          <AppointmentCard
            key={index}
            artist={artistData[index].nickname}
            //date={appointmentData[index].appointment_date}
            date={moment(appointmentData[index].appointment_date).format(
              "DD-MM-YYYY"
            )}
            hour={appointmentData[index].hour}
            handlerButton={() => visible(appointmentData[index].id)}
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
