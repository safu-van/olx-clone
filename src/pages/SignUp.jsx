import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FirebaseContext } from "../context/Context";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function SignUp() {
  const { auth, firestore } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      number: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .trim("Enter your Name")
        .matches(/^[A-Za-z\s]+$/, "Enter a valid Name")
        .required("Enter your Name"),

      email: Yup.string()
        .email("Enter a valid Email")
        .matches(
          /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
          "Enter a valid Email"
        )
        .required("Enter your Email"),

      number: Yup.string()
        .matches(/^\d{10}$/, "Enter a valid Phone Number")
        .required("Enter your Phone Number"),

      password: Yup.string()
        .matches(
          /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
          "Password must be at least 8 characters, contain 1 uppercase letter, 1 number, and 1 special character"
        )
        .required("Enter a Password"),
    }),
    onSubmit: (values) => {
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((response) => {
          updateProfile(response.user, { displayName: values.name })
            .then(() => {
              setDoc(doc(firestore, "users", response.user.uid), {
                user_id: response.user.uid,
                name: values.name,
                phone_number: values.number,
                email: values.email,
              })
                .then(() => {
                  toast.success("Account created successfully", {
                    position: "top-right",
                    duration: 2000,
                  });
                  setTimeout(() => {
                    navigate("/signin");
                  }, 2000);
                })
                .catch((error) => {
                  console.log(
                    "Error while uploading data to Firestore:",
                    error
                  );
                });
            })
            .catch((error) => {
              console.log("Error while updating profile:", error);
            });
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            toast.error("Email already exists.", {
              position: "top-right",
              duration: 3000,
            });
          } else {
            console.log("Error while creating user:", error.message);
          }
        });
    },
  });

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
              onSubmit={formik.handleSubmit}
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                  placeholder="name"
                  style={{
                    borderColor:
                      formik.errors.name && formik.touched.name ? "red" : "",
                  }}
                />
                {formik.errors.name && formik.touched.name ? (
                  <p className="text-xs text-red-500 flex items-center mt-2">
                    {formik.errors.name}
                  </p>
                ) : null}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="example@example.com"
                  style={{
                    borderColor:
                      formik.errors.email && formik.touched.email ? "red" : "",
                  }}
                />
                {formik.errors.email && formik.touched.email ? (
                  <p className="text-xs text-red-500 flex items-center mt-2">
                    {formik.errors.email}
                  </p>
                ) : null}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Phone Number
                </label>
                <input
                  type="number"
                  name="number"
                  id="number"
                  value={formik.values.number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="000-000-000"
                  style={{
                    borderColor:
                      formik.errors.number && formik.touched.number
                        ? "red"
                        : "",
                  }}
                />
                {formik.errors.number && formik.touched.number ? (
                  <p className="text-xs text-red-500 flex items-center mt-2">
                    {formik.errors.number}
                  </p>
                ) : null}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="password"
                  style={{
                    borderColor:
                      formik.errors.password && formik.touched.password
                        ? "red"
                        : "",
                  }}
                />
                {formik.errors.password && formik.touched.password ? (
                  <p className="text-xs text-red-500 flex items-center mt-2">
                    {formik.errors.password}
                  </p>
                ) : null}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 flex justify-center">
                Already have an account? &nbsp;
                <Link
                  to="/signin"
                  className="font-medium text-primary-600 hover:underline cursor-pointer"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  );
}

export default SignUp;
