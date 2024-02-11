import axios from "axios";

// const API_URL = "https://rickandmortyapi.com/api"
const API_URL = "http://localhost:3000/api/";
//const API_URL = "https://clinicamia.vercel.app"
// const API_URL = "https://dummyjson.com"

export const bringAllCharacters = async () => {
  const res = await axios.get(`${API_URL}/character`);
  return res.data.user;
};

export const bringAllUsers = async () => {
  const res = await axios.get(`${API_URL}/user/find`);
  return res.data;
};

export const deleteUser = async (token, id) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const res = await axios.delete(`${API_URL}/user/delete/${id}`, config);
};

export const bringUserById = async (id) => {
  const res = await axios.get(`${API_URL}/users/${id}`);
  return res.data;
};

export const userLogin = async (credentials) => {
  try {
    const res = await axios.post(`${API_URL}authUser/login`, credentials, {});
    const token = res.data.token;
    return token;
  } catch (error) {
    console.error("Error en el login:", error);
    throw error;
  }
};

export const getUserById = async (token, id) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const res = await axios.get(`${API_URL}users/${id}`, config);
    return res.data;
  } catch (error) {
    console.error("Error en el login:", error);
    throw error;
  }
};
