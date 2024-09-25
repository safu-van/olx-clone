import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseContext } from "../context/Context";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

function SignIn() {
  const { auth } = useContext(FirebaseContext);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid Email")
        .matches(
          /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
          "Invalid Email"
        )
        .required("Enter your Email"),

      password: Yup.string()
        .matches(
          /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
          "Invalid Password"
        )
        .required("Enter a Password"),
    }),
    onSubmit: (values) => {
      setIsSubmitting(true)

      signInWithEmailAndPassword(auth, values.email, values.password)
        .then(() => {
          toast.success("Logged In Successfully", {
            duration: 2500,
          });
          navigate("/");
        })
        .catch((error) => {
          setIsSubmitting(false)
          if (error.code === "auth/invalid-credential") {
            toast.error("Invalid email or password.", {
              duration: 3000,
            });
          } else {
            console.log("error while login in :", error);
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
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
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
                <label className="block mb-2 text-sm font-medium text-gray-900">
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
                onClick={formik.handleSubmit}
                type="button"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                disabled={isSubmitting}
              >
                {isSubmitting ? "Please Wait..." : "Login"}
              </button>
              <div className="flex justify-center">
                <p className="text-sm font-light text-gray-500 ">
                  New in OLX? &nbsp;
                  <Link
                    to="/signup"
                    className="font-medium text-primary-600 hover:underline cursor-pointer"
                  >
                    SignUp here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
