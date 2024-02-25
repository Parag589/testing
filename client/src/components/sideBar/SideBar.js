import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BsInboxFill, BsGraphUpArrow } from "react-icons/bs";
import { IoMdContacts } from "react-icons/io";
import { VscAzure } from "react-icons/vsc";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-config";

const SideBar = ({ picUrl }) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const history = useNavigate();
  const navigate = useNavigate();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        history("/");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [history]);

  const handleClick = () => {
    signOut(auth).then(() => {
      history("/");
    });
  };

  const closeSubMenu = () => {
    setIsSubMenuOpen(false);
  };

  const contentHandler = (value) => {
    setActiveIndex(value);
  };

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".submenu-container")) {
        setIsSubMenuOpen(false);
      }
    };

    if (isSubMenuOpen) {
      window.addEventListener("click", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [isSubMenuOpen]);

  return (
    <div className="flex flex-col justify-between h-full bg-[#004c94] w-24 pb-10">
      <div className="flex flex-col gap-2">
        <button
          onClick={(e) => contentHandler(0)}
          className={`text-center p-6 ${
            activeIndex === 0 ? "text-[#004c94] bg-white" : "text-white"
          }`}
        >
          <VscAzure className={`h-8 w-8`} />
        </button>
        <button
          onClick={(e) => contentHandler(1)}
          className={`text-center p-6 ${
            activeIndex === 1 ? "text-[#004c94] bg-white" : "text-white"
          }`}
        >
          <BsInboxFill className={`h-8 w-8`} />
        </button>
        <button
          onClick={(e) => contentHandler(3)}
          className={`text-center p-6 ${
            activeIndex === 3 ? "text-[#004c94] bg-white" : "text-white"
          }`}
        >
          <IoMdContacts className={`h-8 w-8`} />
        </button>
        <button
          onClick={(e) => contentHandler(2)}
          className={`text-center p-6 ${
            activeIndex === 2 ? "text-[#004c94] bg-white" : "text-white"
          }`}
        >
          <BsGraphUpArrow className={`h-8 w-8`} />
        </button>
      </div>
      <div className="relative submenu-container">
        <img
          className="w-10 h-10 rounded-full mx-auto object-cover cursor-pointer"
          src={
            !!picUrl
              ? picUrl
              : "https://cdn-icons-png.freepik.com/512/219/219988.png"
          }
          alt="user-profile-pic"
          onClick={toggleSubMenu}
        />
        <div className="absolute bottom-0 right-1/3 bg-green-500 w-3 h-3 rounded-full"></div>
        {isSubMenuOpen && (
          <div
            className="absolute -top-24 left-0 w-28 bg-white border border-gray-300 rounded-lg shadow-lg"
            onClick={closeSubMenu}
          >
            <ul className="py-2">
              <li
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={handleClick}
              >
                Logout
              </li>
              <li
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => navigate("/fbIntegrate")}
              >
                FBIntegrate
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
