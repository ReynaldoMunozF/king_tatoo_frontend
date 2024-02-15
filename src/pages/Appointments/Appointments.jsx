import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import "./Appointments.css";
import {
  getUserById,
  getAppointmentById,
  getAllArtist,
  getScheduleByIdArtist,
} from "../../services/apiCalls";
import { ArtistCard } from "../../components/ArtistCard/ArtistCard";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import Button from "react-bootstrap/Button";
import { BtnAppointments } from "../../components/ButtonAppointment/ButtonAppointment";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import moment from "moment";
import "moment/locale/pt-br";

export const Appointments = () => {
  registerLocale("es", es);
  //const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  const [artistData, setArtistData] = useState([]);
  const [artistSelectId, setArtistSelectId] = useState(0);
  const [artistSelectNickname, setArtistSelectNickname] = useState("");
  const [artistSchedules, setArtistSchedule] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  const userRdxData = useSelector(userData);

  const token = userRdxData.credentials.token;
  const myId = userRdxData.credentials.userData.user_id;
  //console.log(artistData);
  //console.log(appointmentData[0].tattoo_artist_id);
  const [show, setShow] = useState(true);
  const [show2, setShow2] = useState(false);

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
      }, 100);
    }
  }, []);

  const artistSelect = (artistSelectId, artistSelectNickname) => {
    console.log(artistSelectId + artistSelectNickname);
    setArtistSelectId(artistSelectId);
    setArtistSelectNickname(artistSelectNickname);
    getScheduleByIdArtist(artistSelectId).then((res) => {
      console.log(res, "soy la respuesta de las citas de artist");
      setArtistSchedule(res);
    });
    setShow(false);
    setShow2(true);
  };

  const selectSchedulesDate = () => {
    console.log("entro aqui");
    const dateSchedule2 = [];
    
    for (let index = 0; index < artistSchedules.length; index++) {
      const dateShedule = moment(
        artistSchedules[index].appointment_date
      ).format("DD-MM-YYYY");

      const dateSelection = moment(startDate).format("DD-MM-YYYY");

      if (dateShedule == dateSelection) {
        const dateSchedule = {
          hour : artistSchedules[index].hour,
          active : artistSchedules[index].active
        }
        dateSchedule2.push(dateSchedule);
        console.log(dateSchedule);
        
      }

    }
    return dateSchedule2 ;
    //console.log(dateShedule);

  };

 const datefinal = (selectSchedulesDate());
 //console.log(datefinal[1].active);

  // console.log(artistSelectId + artistSelectNickname);
  // console.log(artistSchedules);
  //const artistSelectId = artistData[artistSelect()].nickname

  console.log(startDate);

  return (
    <div className="container_major">
      <div className="titulo">
        <h1>SELECCIONA AL ARTISTA</h1>
      </div>
      <div className="artists_container">
        {show ? (
          artistData.map((id, index) => (
            <ArtistCard
              key={index}
              artist={artistData[index].nickname}
              selectArtist={() =>
                artistSelect(artistData[index].id, artistData[index].nickname)
              }
              nombre={"Seleccionar"}
              BtnColor={"outline-dark"}
            ></ArtistCard>
            //date={appointmentData[index].appointment_date}
          ))
        ) : (
          <div />
        )}
      </div>

      <div className="appointment_artist_container">
        {show2 ? (
          <>
            <DatePicker
              locale="es"
              let
              
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            ></DatePicker>
            <ArtistCard
              artist={artistSelectNickname}
              nombre={"Citas Disponibles"}
              BtnColor={"outline-dark"}
              selectArtist={() => selectSchedulesDate()}
            />

            <div className="datePicke_container"></div>

            <div className="shedule_conatiner">
              {datefinal.map((id, index) => (
                <BtnAppointments
                  key={index}
                  active={datefinal[index].active}
                  hour={datefinal[index].hour}
                  disable={false}
                ></BtnAppointments>
              ))}
            </div>
          </>
        ) : (
          // <Button variant="outline-success" disabled={idprueba === 0}>
          //   Success
          // </Button>{" "}
          // <Button variant="outline-danger" disabled={idprueba === 1}>
          //   Danger
          // </Button>{" "}
          <div />
        )}
      </div>
    </div>
  );
};
