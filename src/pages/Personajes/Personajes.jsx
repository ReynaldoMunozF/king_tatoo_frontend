import { useEffect, useState } from "react";
import "./Personajes.css";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { bringAllCharacters, bringAllUsers, userLogin } from "../../services/apiCalls";
import { CharacterCard } from "../../components/CharacterCard/CharacterCard";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"

export const Personajes = () => {
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const navigate = useNavigate()

//   const inputHandler = (event) => {
//     setUserData((prevState) => ({
//       ...prevState,
//       [event.target.name]: event.target.value,
//     }));
//   };

    const inputHandler = (e) => {
        setInputValue(e.target.value)
    }

  const buttonHandler = () => {
    bringAllUsers()
    .then((res) => {
      console.log(res)
      setUsers(res)
    })
  };

  const viewUserDetail = (id) => {
    localStorage.setItem('userId', id)
    console.log(id, "soy id en viewUserDetail")
  }

  // useEffect(() => {
  //   if (characters.length === 0) {
  //     bringAllCharacters().then((chars) => {
  //       setCharacters(chars);
  //     });
  //   }
  // }, [characters]);

  useEffect (() => {
    console.log(users)
  }, [users])


  return (
    <div className="miDiv">
      <CustomInput
        type={"text"}
        name={"name"}
        handler={inputHandler}
      ></CustomInput>

      <div className="apiCallButton" onClick={buttonHandler}>Users</div>
      <div className="apiCallButton" onClick={viewUserDetail}>Login</div>
      <div className="characterContainer">
        {users.length > 0 ? (
          <>
            {users.map((user) => {
              return (
                <div onClick={() => viewUserDetail(user.id)}>
                  <CharacterCard
                    key={user.id}
                    image={user.image}
                    name={user.username}
                  >
                  </CharacterCard>
                  
                </div>
              );
            })}
          </>
        ) : null}
      </div>
    </div>
  );
};
