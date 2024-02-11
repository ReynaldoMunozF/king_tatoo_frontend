import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { getUserById } from "../../services/apiCalls";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";

export const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const userRdxData = useSelector(userData)

  const token = userRdxData.credentials.token
  const myId = userRdxData.credentials.userData.user_id

 
  console.log(myId);
  
  useEffect(() => {
    if (!token) {
      navigate("/register");
    } else {
      setTimeout(() => {
        getUserById(token, myId).then((res) => {
          console.log(res, "soy la respuesta del server")
          setProfileData(res);
      })
      }, 1000);
    }
  }, []);

  const inputHandler = (event) => {
    setProfileData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect (()=> {
    //console.log(profileData)
  }, [profileData])

  const buttonHandler = () => {
    setIsEditing(!isEditing);
    console.log(isEditing)

    // if (isEditing === false) {
    //     setIsEditing(true)
    // } else {
    //     setIsEditing(false)
    // }
  };

  

  console.log(profileData[0]);

  useEffect(() => {
    console.log(profileData);
  }, [profileData]);

  return (
    <div className="profileDesign">
      

      
        <h1>{profileData.first_name}</h1>
        <h1>{profileData.last_name}</h1>
        <h1>{profileData.email}</h1>
        <h1>{profileData.phone}</h1>
        <h1>{profileData.id}</h1>
      
      <button onClick={() => buttonHandler()}></button>
      {isEditing 
      ? (
        <CustomInput
          name="firstName"  
          type="text"
          handler={inputHandler}
        ></CustomInput>
      ) : null}
    </div>
  );
};