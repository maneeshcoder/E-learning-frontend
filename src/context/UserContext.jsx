import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../main";
import toast, { Toaster } from "react-hot-toast";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  async function loginUser(email, password, navigate, fetchMyCourse) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/login`, {
        email,
        password,
      });

      toast.success(data.message);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setIsAuth(true);
      setBtnLoading(false);
      navigate("/");
      fetchMyCourse();
    } catch (error) {
      setBtnLoading(false);
      setIsAuth(false);
      toast.error(error.response.data.message);
    }
  }

  async function registerUser(name, email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/register`, {
        name,
        email,
        password,
      });

      toast.success(data.message);
      localStorage.setItem("activationToken", data.activationToken);
      setBtnLoading(false);
      navigate("/verify");
    } catch (error) {
      setBtnLoading(false);
      toast.error(error.response.data.message);
    }
  }

  async function verifyOtp(otp, navigate) {
    setBtnLoading(true);
    const activationToken = localStorage.getItem("activationToken");
    try {
      const { data } = await axios.post(`${server}/api/user/verify`, {
        otp,
        activationToken,
      });

      toast.success(data.message);
      navigate("/login");
      localStorage.clear();
      setBtnLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  }

  // async function fetchUser() {
  //   try {
  //     const { data } = await axios.get(`${server}/api/user/me`, {
  //       headers: {
  //         token: localStorage.getItem("token"),
  //       },
  //     });

  //     setIsAuth(true);
  //     setUser(data.user);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // }
  
  
  async function fetchUser() {
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.error('No token found in localStorage');
      setIsAuth(false);
      setLoading(false);
      return;
    }
  
    try {
      const { data } = await axios.get(`${server}/api/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`, // Standard practice to use Bearer token
        },
      });
  
      setIsAuth(true);
      setUser(data.user);
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error(`Error: ${error.response.status} - ${error.response.data.message}`);
        if (error.response.status === 403) {
          console.error('Access denied. Invalid or expired token.');
        }
      } else if (error.request) {
        // Request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request
        console.error('Error in setting up the request:', error.message);
      }
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        setIsAuth,
        isAuth,
        loginUser,
        btnLoading,
        loading,
        registerUser,
        verifyOtp,
        fetchUser,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
