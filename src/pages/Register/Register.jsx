import { useEffect, useState } from "react";
import "./register.css";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { userRegister } from "../../services/apiCalls";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser, userCreateData } from "../userCreateSlice";
import { Alert } from "react-bootstrap";
import logo_leon from "../../assets/img/logo_leon.png";
import Button from 'react-bootstrap/Button';
import { emailValidator, objectValidator } from "../../validator";


export const Register = () => {
  const [userData, setUserData] = useState({
    
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
  });

    const [show, setShow] = useState(false);
   const [show2, setShow2] = useState(false);

  // instancio redux en modo escritura
  const dispatch = useDispatch();

  // instancio redux en modo lectura
  const userRdxData = useSelector(userCreateData);

  const navigate = useNavigate();

  const inputHandler = (event) => {
    setUserData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const buttonHandler = () => {
    if (!objectValidator(userData)){
      return setShow(true)

    } 
    if (!emailValidator(userData.email)){
      return setShow2(true)

    } 

    

    console.log(userData);
    
    userRegister(userData)
      .then(() => {
        navigate("/login");
      })
      .catch(
        (err) => console.error("Ha ocurrido un error", err)
        //   setShow(false), setShow2(true)
      );
  };

  return (
    <div className="register_container">
      <div className="form_container">
        <div className="form">
        <div className="img"><img src={logo_leon} alt="" /></div>
        
          {/* <CustomInput
            placeholder={"Ingresa tu Username"}
            type={"text"}
            name={"username"}
            handler={inputHandler}
          ></CustomInput> */}
          <CustomInput
            placeholder={"Nombre"}
            type={"text"}
            name={"first_name"}
            handler={inputHandler}
          ></CustomInput>
          <CustomInput
            placeholder={"Apellido"}
            type={"text"}
            name={"last_name"}
            handler={inputHandler}
          ></CustomInput>
          <CustomInput
          placeholder={"Telefono"}
          type={"text"}
          name={"phone"}
          handler={inputHandler}
        ></CustomInput>
          <CustomInput
            placeholder={"Correo Electrónico"}
            type={"email"}
            name={"email"}
            handler={inputHandler}
          ></CustomInput>
          <CustomInput
            placeholder={"contraseña"}
            type={"password"}
            name={"password"}
            handler={inputHandler}
          ></CustomInput>
          <br />
          {show ? (
          <Alert
            className="mb-1"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            Todos los campos son obligatorios.
          </Alert>
        ) : (
          <div />
        )}
          {show2 ? (
          <Alert
            className="mb-1"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            email invalido
          </Alert>
        ) : (
          <div />
        )}

          <div  >
          <Button onClick={buttonHandler} variant="outline-light">Enviar</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
