import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FirebaseContext } from "../context/FirebaseContext";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { auth } = useContext(FirebaseContext)
  const navigate = useNavigate()

  const validateForm = () => {
    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      toast.error("Invalid email or password.");
      return false;
    }

    if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(
        password
      )
    ) {
      toast.error("Invalid email or password.");
      return false;
    }

    return true;
  };

  const handleFormSubmit = () => {
    if (validateForm()) {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/")
        })
        .catch((error) => {
          toast.error("Invalid email or password.");
          console.log("error while login in :", error)
        })
    }
  }

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <img src="assets/images/logo.png" className="h-10 mb-6" alt="Logo" />
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl flex justify-center mb-7">
              Login
            </h1>
            <div className="space-y-4 md:space-y-6 text-left">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="example@example.com"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="password"
                  required
                />
              </div>
              <button onClick={handleFormSubmit} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                Login
              </button>
              <div className="flex justify-center">
                <p className="text-sm font-light text-gray-500 ">
                  New in OLX? &nbsp;
                  <Link to="/signup" className="font-medium text-primary-600 hover:underline cursor-pointer">
                    SignUp here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}

export default SignIn;
