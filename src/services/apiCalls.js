import axios from "axios";

const API_URL = "http://localhost:3000/api/";



export const userLogin = async (credentials) => {
  console.log(credentials );
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
export const userRegister = async (userData) => {

  try {
    const res = await axios.post(`${API_URL}authUser/register`, userData, {});
    const data = res;
    return data;
  } catch (error) {
    console.error("Error en la creación:", error);
    throw error;
  }
};
export const updateUserById = async (token, id, userData) => {
  console.log(token + "soy el token en update");
  console.log(userData);

  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    console.log(config);
    const res = await axios.patch(`${API_URL}users/${id}`, userData, config);
    return res;
  } catch (error) {
    console.error("Error en update_User:", userData);
    throw error;
  }
};
export const deleteUserById = async (id,token) => {
  
console.log(id + "soy el id en delete");
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    console.log(config);
    const res = await axios.delete(`${API_URL}users/${id}`,config);
    return res;
  } catch (error) {
    console.error("Error en update_User:", userData);
    throw error;
  }
};

export const getAppointmentById = async (token, id) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const res = await axios.get(`${API_URL}users/${id}/appointments`, config);
    return res.data;
  } catch (error) {
    console.error("Error en el login:", error);
    throw error;
  }
};

export const updateAppointmentById = async (token, id) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const res = await axios.patch(`${API_URL}appointments/${id}`, config);
    return res.data;
  } catch (error) {
    console.error("Error en update_Appointment:", error);
    throw error;
  }
};
export const deleteAppointmentById = async (token, id) => {

  
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const res = await axios.delete(`${API_URL}appointments/${id}`, config);
    return res.data;
  } catch (error) {
    console.error("Error en delete_Appointment:", error);
    throw error;
  }
};

export const createAppointmentById = async (token, appointmentData) => {
  try {
    // const config = {
    //   headers: {
    //     Authorization: "Bearer " + token,
    //   },
    // };
    console.log("entro aqui en crear cita");
    console.log(appointmentData);

    const res = await axios.post(`${API_URL}appointments`, appointmentData);
    return res;
  } catch (error) {
    console.error("Error en update_Appointment:", error);
    throw error;
  }
};

export const getAllArtist = async () => {
  const res = await axios.get(`${API_URL}artist`);
  return res.data;
};

export const getScheduleByIdArtist = async (id) => {
  const res = await axios.get(`${API_URL}schedules/${id}`);
  return res.data;
};

export const updateScheduleById = async (id, updateActive) => {
  try {
    // const config = {
    //   headers: {
    //     Authorization: "Bearer " + token,
    //   },
    // };
    console.log(updateActive);
    console.log(id);

    const res = await axios.patch(`${API_URL}schedules/${id}`, updateActive);
    return res;
  } catch (error) {
    console.error("Error en update_Appointment:", error);
    throw error;
  }
};



// <--------------------------------------------------------------------------------------------

export const artistLogin = async (credentials) => {
  try {
    const res = await axios.post(`${API_URL}authArtist/login`, credentials, {});
    const token = res.data.token;
    return token;
  } catch (error) {
    console.error("Error en el login:", error);
    throw error;
  }
};
export const getArtistById = async (token, id) => {
  console.log(token);
  console.log(id);
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const res = await axios.get(`${API_URL}artist/${id}`, config);
    return res.data;
  } catch (error) {
    console.error("Error en el login:", error);
    throw error;
  }
};

export const getAppointmentByArtistId = async (token, id) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const res = await axios.get(`${API_URL}artist/${id}/appointments`, config);
    return res.data;
  } catch (error) {
    console.error("Error en el login:", error);
    throw error;
  }
};

export const updateArtistById = async (token, id, artistData) => {
  console.log(artistData);

  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    console.log(config);
    const res = await axios.patch(`${API_URL}artist/${id}`, artistData, config);
    return res;
  } catch (error) {
    console.error("Error en update_Artist:");
    throw error;
  }
};

export const artistRegister = async (token, artistData) => {
  console.log(artistData);
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const res = await axios.post(
      `${API_URL}authArtist/register`,
      artistData,
      config
    );
    const data = res;
    return data;
  } catch (error) {
    console.error("Error en la creación:", error);
    throw error;
  }
};

export const getAllUsers = async ( page, skip) => {
  try {
    // const config = {
    //   headers: {
    //     Authorization: "Bearer " + token,
    //   },
    // };

    const res = await axios.get(
      `${API_URL}users?page=${page}&skip=${skip}`
    );
    return res.data;
  } catch (error) {
    console.error("Error en usuarios", error);
    throw error;
  }
};
