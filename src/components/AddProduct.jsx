import React, { useContext, useState } from "react";
import { AuthenticationContext, FirebaseContext } from "../context/Context";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const { firestore, storage } = useContext(FirebaseContext);
  const { user } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const handleSubmit = () => {
    const storageRef = ref(storage, `product_images/${image.name}`);

    uploadBytes(storageRef, image)
      .then(() => {
        getDownloadURL(storageRef)
          .then((url) => {
            addDoc(collection(firestore, "products"), {
              name: name,
              price: price,
              category: category,
              description: description,
              image: url,
              user_id: user.uid,
            })
              .then(() => {
                navigate("/")
              })
          })
          .catch((error) => {
            console.error("Error getting image URL:", error);
          });
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  return (
    <div className="p-4 w-full sm:max-w-[70%] text-left max-h-full">
      <div className="bg-white rounded-lg shadow">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
          <h3 className="text-lg font-semibold text-gray-900 ">
            Enter Product Details
          </h3>
          <button
            onClick={handleSubmit}
            className="text-white inline-flex items-center bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            <svg
              className="me-1 -ms-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            Add
          </button>
        </div>
        <div className="p-4 md:p-5">
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2 sm:col-span-1 flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 ">
                    <span className="font-semibold">Click to upload</span>
                  </p>
                  <p className="text-xs text-center text-gray-500 ">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  accept="image/*"
                  onChange={(event) => setImage(event.target.files[0])}
                  type="file"
                  className="hidden"
                />
              </label>
            </div>

            <img
              className="col-span-2 sm:col-span-1 w-full max-h-[250px] object-contain rounded-lg shadow-xl "
              src={
                image
                  ? URL.createObjectURL(image)
                  : "https://www.creativefabrica.com/wp-content/uploads/2021/04/05/Photo-Image-Icon-Graphics-10388619-1-1-580x386.jpg"
              }
              alt="image description"
            />

            <div className="col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="product name"
                required
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="$999"
                required
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Category
              </label>
              <select
                id="category"
                value={category} // Controlled component
                onChange={(event) => setCategory(event.target.value)} // Set state on change
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
              >
                <option value="" disabled>
                  Select category
                </option>
                <option value="Vehicle">Vehicle</option>
                <option value="Home Appliances">Home Appliances</option>
                <option value="Phone">Phone</option>
                <option value="Laptop and pc">Laptop and pc</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Description
              </label>
              <textarea
                id="description"
                rows="4"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Write product description..."
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
