import { useEffect, useState } from "react";
import "./login.css";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { userLogin } from "../../services/apiCalls";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, userData } from "../userSlice";
import { Alert } from "react-bootstrap";

export const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  // instancio redux en modo escritura
  const dispatch = useDispatch();

  // instancio redux en modo lectura
  const userRdxData = useSelector(userData);

  const navigate = useNavigate();

  const inputHandler = (event) => {
    setCredentials((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const buttonHandler = () => {
    if (credentials.email == "" || credentials.password == "") {
      return setShow(true);
    }
    console.log(credentials);
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
      setShow(false), setShow2(true));
  };

  return (
    
     
      <div className="login">
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
        {show ? (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            Todos los campos son Obligatorios.
          </Alert>
        ) : (
          <div />
        )}
        {show2 ? (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            Email o contraseña incorrecto.
          </Alert>
        ) : (
          <div />
        )}
        <h1>{credentials.name}</h1>
        <div className="apiCallButton" onClick={buttonHandler}>
          LOGIN
        </div>
      </div>
    
  );
};
