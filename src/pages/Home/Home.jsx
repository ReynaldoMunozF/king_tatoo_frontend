import logo_home from "../../assets/img/logo_principal.png";
import { AppointmentCard} from "../../components/appointmentFormat/AppointmentFormat";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { useEffect, useState } from "react";


import "./Home.css";

export const Home = () => {

  const [startDate, setStartDate] = useState(new Date());
let tatuador = "cardem"
let dia = "22 - 07 - 11"


  return (
    <div className="portada_principal">
      <img className="img" src={logo_home} alt="soy yo" />
      <AppointmentCard artist={tatuador} date={dia}>
        
      </AppointmentCard>
      <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
    
    </div>

  );
};
