import axios from "axios";
import { API_BASE } from "./constants";

const signinuser = async (values) => {
  try {
    const { data } = await axios.post(`${API_BASE}/api/user/signin`, values);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

const signupuser = async (values) => {
  try {
    const { data } = await axios.post(`${API_BASE}/api/user/signup`, values);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

const signoutuser = async () => {
  try {
    const { data } = await axios.post(`${API_BASE}/api/user/signout`);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export { signinuser, signoutuser, signupuser };

