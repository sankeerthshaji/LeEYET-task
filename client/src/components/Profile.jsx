import { useSelector } from "react-redux";
import axios from "../axios/axios";
import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useLogout from "../hooks/useLogout";

function Profile() {
  const [loader, setLoader] = useState(true);
  const [userDetails, setUserDetails] = useState({});
  const user = useSelector((state) => state.user);
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
    toast.success("Logout successfully");
    navigate("/login");
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`/profile`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log(response);
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

  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
        <div className="lg:flex flex-col lg:justify-center items-center h-screen">
          <div>
            <div className="flex justify-center py-5 lg:py-3">
              <div className="rounded-md shadow-lg border-4 px-6 sm:px-12 md:px-24 lg:px-16 py-5 sm:py-8 lg:py-6">
                <div>
                  <img
                    className="w-36 sm:w-full"
                    src={userDetails?.image?.url}
                  />
                </div>
                <div>
                  <h1 className="py-4 sm:text-2xl text-center font-bold">
                    {userDetails?.userName}
                  </h1>
                </div>
                <div className="flex flex-col justify-center gap-3">
                  <Link to="/editProfile">
                    <button className="text-blue-500 sm:text-xl font-semibold px-5 py-2 md:px-8 border-2 border-blue-500 bg-white hover:bg-blue-500 hover:text-white rounded-md transition-all duration-300">
                      Edit Profile
                    </button>
                  </Link>
                  <button onClick={handleLogout} className="text-red-500 sm:text-xl font-semibold px-5 py-2 md:px-8 border-2 border-red-500 bg-white hover:bg-red-500 hover:text-white rounded-md transition-all duration-300">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center py-5 lg:py-3">
            <div className="flex flex-col gap-2 lg:gap-1 rounded-md shadow-lg border-4 px-3 sm:px-6 md:px-16 lg:px-8 py-4">
              <div className="font-bold text-lg sm:text-2xl">Address</div>
              <p className="text-[#2C3C4A] sm:text-2xl lg:text-xl font-semibold">
                {userDetails?.address?.houseName}
              </p>
              <p className="text-[#2C3C4A] sm:text-2xl lg:text-xl font-semibold">
                {userDetails?.address?.area}
              </p>
              <p className="text-[#2C3C4A] sm:text-2xl lg:text-xl font-semibold">
                {userDetails?.address?.landmark}
              </p>
              <p className="text-[#2C3C4A] sm:text-2xl lg:text-xl font-semibold">
                {userDetails?.address?.city}
              </p>
              <p className="text-[#2C3C4A] sm:text-2xl lg:text-xl font-semibold">
                {userDetails?.address?.state}
              </p>
              <p className="text-[#2C3C4A] sm:text-2xl lg:text-xl font-semibold">
                {userDetails?.address?.country}
              </p>
              <p className="text-[#2C3C4A] sm:text-2xl lg:text-xl font-semibold">
                {userDetails?.address?.pincode}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
