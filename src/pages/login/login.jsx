import { useEffect, useState } from "react";
import "./login.css";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { userLogin } from "../../services/apiCalls";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, userData } from "../userSlice";

export const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

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
      .catch((err) => console.error("Ha ocurrido un error", err));
  };

  return (
    <div className="login_container">
      <div ><img src="../src/img/img1.jpg" alt="img1" /></div>
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
        <h1>{credentials.name}</h1>
        <div className="apiCallButton" onClick={buttonHandler}>
          LOGIN
        </div>
      </div>
    </div>
  );
};
