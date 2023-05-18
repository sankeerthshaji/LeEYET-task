import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import CustomInput from "./CustomInput";
import Avatar from "react-avatar-edit";
import { userSchema } from "../schemas/userSchema";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../axios/axios";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useLogout from "../hooks/useLogout";
import Loader from "./Loader";
import { updateProfileSchema } from "../schemas/updateProfileSchema";

function EditProfile() {
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const [loader, setLoader] = useState(true);
  const user = useSelector((state) => state.user);
  const { logout } = useLogout();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`/profile`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        setUserDetails(response.data.userDetails);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          // Handle 401 errors
          logout();
          console.error(err); // log the error message
        } else if (err.response && err.response.status === 403) {
          // Handle 403 errors
          logout();
          console.error(err); // log the error message
        } else {
          // Handle other errors
          console.error(err); // log the error message
        }
      } finally {
        setLoader(false);
      }
    };
    fetchUserDetails();
  }, []);

  const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const handleFileLoad = (initialImage, croppedImage) => {
    const finalImage = croppedImage || initialImage;

    const imageFile =
      typeof finalImage === "string"
        ? dataURLtoFile(finalImage, "profile.jpg")
        : finalImage;

    if (imageFile) {
      setImage(imageFile);
    } else {
      toast.error("Please select an image.");
    }
  };

  // handle on close event
  const handleClose = () => {
    // Clear the image state if the modal is closed
    setImage(null);
  };

  // handle form submission
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      console.log(image)
      const formData = new FormData();
      formData.append("image", image);
      formData.append("values", JSON.stringify(values));
      const response = await axios.patch("/updateProfile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle 401 errors
        logout();
        console.error(error); // log the error message
      } else if (error.response && error.response.status === 403) {
        // Handle 403 errors
        logout();
        console.error(error); // log the error message
      } else if (error?.response && error?.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        toast.error(error?.response?.data?.error);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
          <div className="space-y-12 shadow-lg px-12 py-6 bg-white">
            <h1 className="font-bold text-3xl text-gray-900 text-center underline">
              Edit Profile
            </h1>
            <Formik
              initialValues={{
                userName: userDetails.userName,
                houseName: userDetails.address.houseName,
                area: userDetails.address.area,
                landmark: userDetails.address.landmark,
                city: userDetails.address.city,
                state: userDetails.address.state,
                country: userDetails.address.country,
                pincode: userDetails.address.pincode,
              }}
              validationSchema={updateProfileSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="grid grid-cols-3 gap-8">
                  <CustomInput
                    label="User Name"
                    name="userName"
                    id="User Name"
                    placeholder="Enter your User Name"
                    type="text"
                    errorMessage={errors?.userName}
                  />
                  <CustomInput
                    label="House Name"
                    name="houseName"
                    id="House Name"
                    placeholder="Enter your house name"
                    type="text"
                    errorMessage={errors?.houseName}
                  />

                  <CustomInput
                    label="Area"
                    name="area"
                    id="Area"
                    placeholder="Enter your area"
                    type="text"
                    errorMessage={errors?.area}
                  />

                  <CustomInput
                    label="Landmark"
                    name="landmark"
                    id="Landmark"
                    placeholder="Enter your landmark"
                    type="text"
                    errorMessage={errors?.landmark}
                  />

                  <CustomInput
                    label="City"
                    name="city"
                    id="City"
                    placeholder="Enter your city"
                    type="text"
                    errorMessage={errors?.city}
                  />

                  <CustomInput
                    label="State"
                    name="state"
                    id="State"
                    placeholder="Enter your state"
                    type="text"
                    errorMessage={errors?.state}
                  />

                  <CustomInput
                    label="Country"
                    name="country"
                    id="Country"
                    placeholder="Enter your country"
                    type="text"
                    errorMessage={errors?.country}
                  />

                  <CustomInput
                    label="Pincode"
                    name="pincode"
                    id="Pincode"
                    placeholder="Enter your pincode"
                    type="text"
                    errorMessage={errors?.pincode}
                  />
                </div>
                <div className="flex justify-center mt-8">
                  <Avatar
                    width={180}
                    height={180}
                    label="Upload a File"
                    onFileLoad={handleFileLoad}
                    onCrop={handleFileLoad}
                    onClose={handleClose}
                  />
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-700 hover:bg-blue-900 text-white font-bold w-full py-3 md:w-1/4 lg:w-1/6 rounded
                    transform hover:scale-110 transition duration-300"
                  >
                    {loading ? (
                      <ClipLoader size={28} color={"#fff"} />
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditProfile;
