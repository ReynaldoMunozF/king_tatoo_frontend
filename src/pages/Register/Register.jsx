import { useEffect, useState } from "react";
import "./register.css";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { userRegister } from "../../services/apiCalls";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser, userCreateData } from "../userCreateSlice";
import { Alert } from "react-bootstrap";

export const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    // phone: 123456789,
    password: "",
  });

//   const [show, setShow] = useState(false);
//   const [show2, setShow2] = useState(false);

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
    // if (credentials.email == "" || credentials.password == "") {
    //   return setShow(true);
    // }
    console.log(userData);
    userRegister(userData)
    .then(() => {
          navigate("/login")
      })
      .catch((err) => console.error("Ha ocurrido un error", err),
    //   setShow(false), setShow2(true)
    );
  };

  return (
    
     
      <div className="login">
        <CustomInput
          placeholder={"Ingresa tu Username"}
          type={"text"}
          name={"username"}
          handler={inputHandler}
        ></CustomInput>
        <CustomInput
          placeholder={"Ingresa tu Nombre"}
          type={"text"}
          name={"first_name"}
          handler={inputHandler}
        ></CustomInput>
        <CustomInput
          placeholder={"Ingresa tu Apellido"}
          type={"text"}
          name={"last_name"}
          handler={inputHandler}
        ></CustomInput>
        {/* <CustomInput
          placeholder={"Ingresa tu Numero de Telefono"}
          type={"number"}
          name={"phone"}
          handler={inputHandler}
        ></CustomInput> */}
        <CustomInput
          placeholder={"Ingresa tu Correo Electrónico"}
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
   
        
        <div className="apiCallButton" onClick={buttonHandler}>
          ENVIAR
        </div>
      </div>
    
  );
};
