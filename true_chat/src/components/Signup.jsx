import { Button } from "@chakra-ui/react";
import React, { useState } from "react";

import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import "./authStyle.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [regData, setRegData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegData({
      ...regData,
      [name]: value,
    });
  };

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
      const { data } = await axios.post(
        "https://peaceful-sierra-38069.herokuapp.com/user/signup",
        {
          ...regData,
        }
      );
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
          type="text"
          placeholder="Enter Name"
          name="name"
          value={regData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="email here"
          name="email"
          value={regData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="password here"
          name="password"
          value={regData.password}
          onChange={handleChange}
          required
        />
        <Button colorScheme={"red"} onClick={handleSubmit}>
          Sign up
        </Button>
      </div>
    </div>
  );
};

export default Signup;
