import React, { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FirebaseContext } from "../context/FirebaseContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");

  const { auth, firestore } = useContext(FirebaseContext)
  const navigate = useNavigate()

  const validateForm = () => {
    if (name.trim() == "") {
      toast.error("Enter a valid Name");
      return false;
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
      toast.error("Enter a valid Name");
      return false;
    }

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      toast.error("Enter a valid Email");
      return false;
    }

    if (!/^\d{10}$/.test(number)) {
      toast.error("Enter a valid Phone Number");
      return false;
    }

    if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(
        password
      )
    ) {
      toast.error(
        "Password must be at least 8 characters, contain 1 uppercase letter, 1 number, and 1 special character"
      );
      return false;
    }

    return true;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((response) => {
          setDoc(doc(firestore, "users", response.user.uid), {
            user_id:response.user.uid,
            name:name,
            phone_number:number
          })
            .then(() => {
              navigate("/signin")
            })
            .catch((error) => {
              console.log("error while uploading data to firestore :", error)
            })
        })
        .catch((error) => {
          console.log("error while creating user :", error)
        })
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <img src="assets/images/logo.png" className="h-10 mb-6" alt="Logo" />
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl flex justify-center">
              Sign Up
            </h1>
            <form
              className="space-y-4 md:space-y-6 text-left"
              onSubmit={handleFormSubmit}
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="name"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="example@example.com"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Phone Number
                </label>
                <input
                  type="number"
                  name="number"
                  id="number"
                  value={number}
                  onChange={(event) => setNumber(event.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="000-000-000"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
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
              <div className="flex items-start pl-0.5">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label className="font-light text-gray-500 ">
                    I accept the&nbsp;
                    <a className="font-medium text-primary-600 hover:underline cursor-pointer">
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 flex justify-center">
                Already have an account? &nbsp;
                <Link to="/signin" className="font-medium text-primary-600 hover:underline cursor-pointer">
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}

export default SignUp;
