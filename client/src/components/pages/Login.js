import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config"; // Import the auth instance from firebase

import { Link } from "react-router-dom";
// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [login, setLogin] = useState(false);
    const history = useNavigate();
  
    const handleSubmit = (e, type) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      const name = login ? null : e.target.name.value; // Only capture name if signing up
  
      if (type === "signup") {
        createUserWithEmailAndPassword(auth, email, password)
          .then((data) => {
            console.log(data, "authData");
            if (name) {
              console.log("User Name:", name);
              // Here you can update the user's additional information, like the name
            }
            history("/pageintegrate");
          })
          .catch((err) => {
            alert(err.code);
            setLogin(true);
          });
      } else {
        signInWithEmailAndPassword(auth, email, password)
          .then((data) => {
            console.log(data, "authData");
            history("/pageintegrate");
          })
          .catch((err) => {
            alert(err.code);
          });
      }
    };


    return (
        <React.Fragment>
            <div className="w-screen h-screen flex justify-center items-center bg-[#004c94]">
                <div className="bg-white p-12 rounded-3xl ">
                    <h6 className="text-2xl text-center font-semibold">{login ? "Login to your account" : "Create Account"}</h6>
                    <form onSubmit={(e) => handleSubmit(e, login ? "signin" : "signup")} className="flex flex-col gap-6 pt-8">
                        <div>
                            {!login && (
                                <>
                                    <label htmlFor="name" className="font-semibold text-base">
                                        Name
                                    </label>
                                    <input className="w-96 border-2 border-gray-300 p-2 block rounded-md mt-1 tracking-wide text-base"
                                        name="name" type="text" />
                                    <br />
                                </>
                            )}
                            <label htmlFor="email" className="font-semibold text-base">
                                Email
                            </label>
                            <input name="email"  type="email"
                                className="w-96 border-2 border-gray-300 p-2 block rounded-md mt-1 tracking-wide text-base"

                                // onChange={updateUserData}
                                autoComplete="off"
                            />
                        </div>
                        <div className="pb-8">
                            <label htmlFor="password" className="font-semibold text-base">
                                Password
                            </label>
                            <input
                                name="password" type="password"
                                className="w-96 border-2 border-gray-300 p-2 block rounded-md mt-1 tracking-wide text-base"
                                
                                // onChange={updateUserData}
                                autoComplete="off"
                            />
                        </div>
                        <button className="bg-[#004f97] p-4 w-full text-white text-xl rounded-md" type="submit">
                        {login ? "SignIn" : "SignUp"}
                        </button>


                        
                        {login && (
                            <>
                                <p className="text-center font-medium pt-4"> New to MyApp? <Link className={login === false ? "activeColor text-blue-700" : "pointer text-blue-700"} onClick={() => setLogin(false)}>Sign up</Link></p>
                            </>
                        )}

                        {!login && (
                            // Conditionally render name input only when signing up
                            <>
                                <p className="text-center font-medium pt-4"> New to MyApp? <Link className={login === true ? "activeColor text-blue-700" : "pointer text-blue-700"} onClick={() => setLogin(true)}>Sign in</Link></p>
                             </>
                        )}
        

                    </form>
                </div>
            </div>





            {/* <div className="App">
      <div className="row">
        <div className={login === false ? "activeColor" : "pointer"} onClick={() => setLogin(false)}>
          SignUp
        </div>
        <div
          className={login === true ? "activeColor" : "pointer"} onClick={() => setLogin(true)} >
          SignIn
        </div>
      </div>

      <h1>{login ? "SignIn" : "SignUp"}</h1>
      <form onSubmit={(e) => handleSubmit(e, login ? "signin" : "signup")}>
       
        {!login && (
          <>
            <input name="name" placeholder="Name" type="text" />
            <br />
          </>
        )}
       
        <input name="email" placeholder="Email" />
        <br />
        <input name="password" type="password" placeholder="Password" />
        <br />
        <p onClick={handleReset}>Forgot Password?</p>
        <br />
        <button>{login ? "SignIn" : "SignUp"}</button>
      </form>
    </div> */}
        </React.Fragment>
    )
}

export default Login;