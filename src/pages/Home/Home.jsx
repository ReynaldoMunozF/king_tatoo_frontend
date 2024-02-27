import logo_home from "../../assets/img/logo_principal.png";
import { AppointmentCard} from "../../components/appointmentFormat/AppointmentFormat";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { useEffect, useState } from "react";
import promo_1 from "../../assets/img/promo_1.jpg";
import promo_2 from "../../assets/img/promo_2.jpg";
import promo_3 from "../../assets/img/promo_3.jpg";
import Carousel from "react-bootstrap/Carousel";
import Button from 'react-bootstrap/Button';
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, userData } from "../userSlice";
import { userLogin,userRegister } from "../../services/apiCalls";
import { emailValidator, objectValidator } from "../../validator";
import "./Home.css";

export const Home = () => {
  
    const [credentials, setCredentials] = useState({
      email: "",
      password: "",
    });
    const [userDataRegister, setUserDataRegister] = useState({
    
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
    });
    const [isLogin,setIsLogin] = useState(true);
    const [isRegister,setIsRegister] = useState(false);
    const [isAlert,setIsAlert] = useState(true);

    const inputHandler = (event) => {
      setCredentials((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    };
    const inputHandlerRegister = (event) => {
      setUserDataRegister((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    };
    const navigate = useNavigate();
  // instancio redux en modo escritura
  const dispatch = useDispatch();

  // instancio redux en modo lectura
  const userRdxData = useSelector(userData);

  const buttonHandler = () => {
    if (credentials.email == "" || credentials.password == "") {
      //return setShow(true);
    }
    //console.log(credentials);
    userLogin(credentials)
      .then((token) => {
        if (!token) {
          navigate("/register");
          return null;
        }
        const decodedToken = jwtDecode(token);

        const data = {
          token: token,
          userData: decodedToken,
        };
        dispatch(login({ credentials: data }));
        setTimeout(() => {
          navigate("/profile");
        });
      })
      .catch((err) => console.error("Ha ocurrido un error", err),
      // setShow(false), setShow2(true)
      );
  };
  const buttonHandlerRegister = () => {
    if (!objectValidator(userDataRegister)){
      return console.log("faltan datos");

    } 
    if (!emailValidator(userDataRegister.email)){
      return console.log("email invalido");

    } 

    userRegister(userDataRegister)
    

    console.log(userDataRegister);
    
    userRegister(userDataRegister)
      .then(() => {
        navigate("/profile");
      })
      .catch(
        (err) => console.error("Ha ocurrido un error", err)
        //   setShow(false), setShow2(true)
      );

      credentials.email = userDataRegister.email;
      credentials.password = userDataRegister.password;

      userLogin(credentials)
      .then((token) => {
        if (!token) {
          navigate("/register");
          return null;
        }
        const decodedToken = jwtDecode(token);

        const data = {
          token: token,
          userData: decodedToken,
        };
        dispatch(login({ credentials: data }));
        setTimeout(() => {
          navigate("/profile");
        });
      })
      .catch((err) => console.error("Ha ocurrido un error", err),
      // setShow(false), setShow2(true)
      );



  };
 
  return (
    <div className="portada_principal">
      <div className="carousel_container">
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
      <div className="register_conatiner">
      <img className="img_logo" src={logo_home} alt="soy yo" />
        <div className="btn_container">
        <Button variant="dark" onClick={()=> (setIsLogin(true),setIsRegister(false)) }>Iniciar Sesión</Button>
        <Button variant="light" onClick={()=> (setIsLogin(false),setIsRegister(true)) }>Regístrarse</Button>
        </div>

        {isLogin ?(
        <div className="login_container">
        <CustomInput
          
          placeholder={"Ingresa tu email"}
          type={"email"}
          name={"email"}
          handler={inputHandler}
        ></CustomInput>
        <CustomInput
       
          placeholder={"Ingresa tu contraseña"}
          type={"password"}
          name={"password"}
          handler={inputHandler}
        ></CustomInput>
        <Button variant="dark" onClick={buttonHandler}>Enviar</Button>

        </div>
        ) : null}
         {isRegister ?(
        <div className="register">
         <CustomInput
            placeholder={"Nombre"}
            type={"text"}
            name={"first_name"}
            handler={inputHandlerRegister}
          ></CustomInput>
          <CustomInput
            placeholder={"Apellido"}
            type={"text"}
            name={"last_name"}
            handler={inputHandlerRegister}
          ></CustomInput>
          <CustomInput
          placeholder={"Telefono"}
          type={"text"}
          name={"phone"}
          handler={inputHandlerRegister}
        ></CustomInput>
          <CustomInput
            placeholder={"Correo Electrónico"}
            type={"email"}
            name={"email"}
            handler={inputHandlerRegister}
          ></CustomInput>
          <CustomInput
            placeholder={"contraseña"}
            type={"password"}
            name={"password"}
            handler={inputHandlerRegister}
          ></CustomInput>
          {isAlert ?(
            <h3>Todos los campos son obligatorios</h3>
          ):null}
        <Button variant="dark" onClick={buttonHandlerRegister}>Enviar</Button>

        </div>
        ) : null}

      </div>

     
      
    
    </div>

  );
};
