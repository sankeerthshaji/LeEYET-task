import { BrowserRouter, Routes, Route , Navigate } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/LoginPage";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./components/Loader";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";

function App() {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER_LOGIN", payload: user });
    }
    setLoading(false);
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <ProfilePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={!user ? <SignupPage /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
          path="/editProfile"
          element={user ? <EditProfilePage /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
