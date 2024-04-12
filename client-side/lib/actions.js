import axios from "axios";
import { API_BASE, DEFAULT_HEADERS } from "./constants";
import Cookies from "js-cookie";

//user actions
const signinuser = async (values) => {
  try {
    const { data } = await axios.post(`${API_BASE}/api/user/signin`, values);
    Cookies.set('jwt', data.jwt, { secure: true });
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
//-----------

//post actions
const getallposts = async () => {
  try {
    const { data } = await axios({
      url: `${API_BASE}/api/posts/read-all`,
      method: "GET",
      secure: true,
      headers: DEFAULT_HEADERS
    });
    return data;
  } catch (error) {
    throw error
  }
};

export { signinuser, signoutuser, signupuser, getallposts };
