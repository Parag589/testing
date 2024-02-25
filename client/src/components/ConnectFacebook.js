import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FacebookLogin from "react-facebook-login";

const ConnectFacebook = () => {
  const navigate = useNavigate();

  const [Name, setName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  const deleteIntegration = () => {
    localStorage.clear(navigate);
    navigate("/pageintegrate");

    console.log("Integration deleted.");
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#004c94]">
      <div className="bg-white p-12 rounded-3xl ">
        <div className="flex flex-col gap-4">
          <h6 className="text-xl text-center font-semibold">
            Facebook Page Integration
          </h6>

          <h6 className="text-xl text-center">Integrated Page : {Name}</h6>
          <div className="flex flex-col gap-6 pt-8">
            <button
              onClick={deleteIntegration}
              className="bg-red-600 p-4 w-96 text-white text-lg rounded-md"
            >
              Delete Integration
            </button>
            <button
              onClick={handleGoToDashboard}
              className="bg-[#004f97] p-4 w-96 text-center text-white text-lg rounded-md"
            >
              Reply to Messages
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectFacebook;
