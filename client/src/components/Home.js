// Home.js
import { signOut, onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from '../firebase-config';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (!user) {
  //       history('/');
  //     }
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [history]);

  // const handleClick = () => {
  //   signOut(auth).then(() => {
  //     history('/');
  //   });
  // };

  const handleGoToDashboard = () => {
    navigate("/login");
    // Navigate to the /dashboard page
  };

  return (
   <>
   <div className="w-screen h-screen flex justify-center items-center bg-[#004c94]">
                <div className="bg-white p-12 rounded-3xl ">
                    <div className="flex flex-col gap-4 mb-5">
                        <h6 className="text-xl text-center font-semibold">
                            Welcome To Facebook Helpdesk
                        </h6>
                    </div>
                    <div>
                        <button onClick={handleGoToDashboard} className="bg-[#004f97]  p-4 w-96 text-lg rounded-md text-white text-center">
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
   </>
  );
};

export default Home;
