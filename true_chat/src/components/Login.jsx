import { Button } from '@chakra-ui/react';
import React from 'react'
import { useState } from 'react';
import "./authStyle.css";
import { useToast } from "@chakra-ui/toast";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
   const [logData,setLogData] = useState({
     email:"",
     password:""
   })
 
    const handleChange =(e)=>{
        const { name, value } = e.target;
        setLogData({
          ...logData,
          [name]: value,
        });
    }
      const toast = useToast();
      const navigate = useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post("http://localhost:8080/user/login", {
          ...logData,
        });
        console.log(data);
        toast({
          title: "Registration Successful",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate("/chats");
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: error.response.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
      }
    };
  return (
    <div className="users">
      <div>
        <input
          type="email"
          placeholder="email here"
          name="email"
          value={logData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="password here"
          name="password"
          value={logData.password}
          onChange={handleChange}
          required
        />
        <Button colorScheme={"red"} onClick={handleSubmit}>
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login