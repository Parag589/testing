import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
const FBIntegrate = () => {
  const [longTermAccessToken, setLongTermAccessToken] = useState("");
  const navigate = useNavigate();

  const responseFacebook = async (response) => {
    try {
      const name = response.name;
      const backendResponse = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/exchangeToken`,
        {
          accessToken: response.accessToken,
        }
      );
      const longTermToken = backendResponse.data.access_token;

      localStorage.setItem("access_token", longTermToken);
      localStorage.setItem("name", name);
      setLongTermAccessToken(longTermToken);
      navigate("/manage");
      console.log("access_token:", longTermToken);
    } catch (error) {
      console.error("Error exchanging tokens:", error.message);
    }
  };

  return (
    <React.Fragment>
      <div className="w-screen h-screen flex justify-center items-center bg-[#004c94]">
        <div className="bg-white p-12 rounded-3xl ">
          <div className="flex flex-col gap-4">
            <h6 className="text-xl text-center font-semibold mb-10">
              Facebook Page Integration
            </h6>
          </div>
          <div className="bg-[#004f97]  w-fit h-14 text-white text-center text-lg rounded-md">
            <div className="w-full opacity-0">
              <FacebookLogin
                appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                autoLoad={true}
                fields="name,email,picture"
                callback={responseFacebook}
              />
            </div>
            <p className="mt-[-3.5rem] text-white text-center">Connect Page</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FBIntegrate;
