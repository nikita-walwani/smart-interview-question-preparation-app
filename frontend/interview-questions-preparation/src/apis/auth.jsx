import { data } from "react-router-dom"
import axios from "./axios"

const getAuthHeader = () => {
  const token = localStorage.getItem('access_token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const loginApi = async (data) => {
  return await axios.post('/login', data);
};

export const signUp = async(data)=>{
 return await axios.post('/signup', data)
}