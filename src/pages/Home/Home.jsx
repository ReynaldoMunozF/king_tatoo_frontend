import logo_home from "../../assets/img/logo_principal.png";
import { AppointmentCard } from "../../components/appointmentFormat/AppointmentFormat";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { useEffect, useState } from "react";
import promo_1 from "../../assets/img/promo_1.jpg";
import promo_2 from "../../assets/img/promo_2.jpg";
import promo_3 from "../../assets/img/promo_3.jpg";
import img1 from "../../assets/img/img1.jpg";
import img2 from "../../assets/img/img2.jpg";
import img3 from "../../assets/img/img3.jpg";
import img4 from "../../assets/img/img4.jpg";
import img5 from "../../assets/img/img5.jpg";
import img6 from "../../assets/img/img6.jpg";
import img7 from "../../assets/img/img7.jpg";
import img8 from "../../assets/img/img8.jpg";
import img9 from "../../assets/img/img9.jpg";
import img10 from "../../assets/img/img10.jpg";
import img11 from "../../assets/img/img11.jpg";
import img12 from "../../assets/img/img12.jpg";
import img13 from "../../assets/img/img13.jpg";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { CardComments } from "../../components/Card_Comments/Card_Comments";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, userData } from "../userSlice";
import { userLogin, userRegister } from "../../services/apiCalls";
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
  const [isLogin, setIsLogin] = useState(true);
  const [isRegister, setIsRegister] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [isAlertMail, setIsAlertMail] = useState(false);

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
      .catch(
        (err) => console.error("Ha ocurrido un error", err)
        // setShow(false), setShow2(true)
      );
  };
  const buttonHandlerRegister = () => {
    if (!objectValidator(userDataRegister)) {
      return setIsAlert(true);
    }
    if (!emailValidator(userDataRegister.email)) {
      return setIsAlertMail(true);
    }

    console.log(userDataRegister);

    userRegister(userDataRegister)
      .then(() => {
        credentials.email = userDataRegister.email;
        credentials.password = userDataRegister.password;

        debugger;

        userLogin(credentials).then((token) => {
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
        });
      })
      .catch(
        (err) => console.error("Ha ocurrido un error", err)
        //   setShow(false), setShow2(true)
      );

   
  };

  return (
    <div className="portada_principal">
      <div className="first_container">
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
          {/* <img className="img_logo" src={logo_home} alt="soy yo" /> */}
          <div className="btn_container">
            <Button
              variant="dark"
              onClick={() => (setIsLogin(true), setIsRegister(false))}
            >
              Iniciar Sesión
            </Button>
            <Button
              variant="light"
              onClick={() => (setIsLogin(false), setIsRegister(true))}
            >
              Regístrarse
            </Button>
          </div>

          {isLogin ? (
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
              <Button variant="dark" onClick={buttonHandler}>
                Enviar
              </Button>
            </div>
          ) : null}
          {isRegister ? (
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
              {isAlert ? (
                <p>
                  Todos los campos son obligatorios{" "}
                  <button
                    className="btn_alert"
                    onClick={() => setIsAlert(false)}
                  >
                    x
                  </button>
                </p>
              ) : null}
              {isAlertMail ? (
                <p>
                  Ingresa un correo electrónico valido{" "}
                  <button
                    className="btn_alert"
                    onClick={() => setIsAlertMail(false)}
                  >
                    x
                  </button>
                </p>
              ) : null}
              <Button variant="dark" onClick={buttonHandlerRegister}>
                Enviar
              </Button>
            </div>
          ) : null}
        </div>
      </div>
      <div className="commit_text">
        <p>
          "Aquí encontrarás una colección de arte en la piel, donde cada diseño
          es una expresión única de estilo y personalidad. Desde diseños
          geométricos hasta obras realistas, nuestro equipo de artistas trabaja
          para plasmar tus ideas en tinta. Explora nuestra galería para
          inspirarte y encontrar tu próxima obra maestra. En King Tattoo,
          transformamos ideas en arte. ¡Gracias por visitarnos en línea!"
        </p>
      </div>
      <div className="img_galery">
        <section>
          <img src={img9} alt="" />
          <img src={img10} alt="" />
          <img src={img11} alt="" />
          <img src={img12} alt="" />
          <img src={img13} alt="" />
        </section>
      </div>

      <div className="commit_container">
        <div className="commit_text">
          <p>
            En <strong>King Tattoo</strong>, nos enorgullece compartir las
            experiencias positivas y las calificaciones entusiastas de nuestros
            queridos clientes. Para nosotros, cada tatuaje es una obra de arte
            única, y la satisfacción de nuestros clientes es nuestra máxima
            prioridad.
          </p>
        </div>
        <div className="cardcommit_container">
          <CardComments
            Title={"Maria Fernanda"}
            commit={
              "¡Increíble experiencia en King Tattoo! El artista capturó exactamente lo que tenía en mente y el resultado final superó mis expectativas. El ambiente del estudio es acogedor y profesional. ¡Definitivamente volveré por más!"
            }
          />
          <CardComments
            Title={"Rafael"}
            commit={
              "He sido cliente de king Tattoo durante años, y nunca me han decepcionado. Cada artista aquí tiene un talento excepcional y un ojo para el detalle. No puedo recomendarlos lo suficiente a cualquiera que busque un tatuaje de calidad."
            }
          />
          <CardComments
            Title={"Paula Alexandra"}
            commit={
              "¡Me encanta mi nuevo tatuaje! El equipo fue increíblemente amable y servicial durante todo el proceso. Desde el diseño inicial hasta la sesión de tatuaje, me sentí en buenas manos. Definitivamente regresaré para mi próximo proyecto."
            }
          />
        </div>
      </div>
    </div>
  );
};
