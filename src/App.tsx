// src/App.tsx
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { PrivateRouteWrapper } from "./components/PrivateRoute";
import Login from "./components/Login";
import { loginFailure, setUser } from "./Store/Reducers/AuthReducer";
import Home from "./components/Home";
import RegisterForm from "./components/Register";
import ProfilePage from "./components/Profile";
import AllEvents from "./components/AllEvents";
import EventForm from "./components/Test";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        dispatch(loginFailure("No token found"));
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/user/verify", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Verification failed");
        }

        dispatch(setUser(data.user));
      } catch (error) {
        console.error("Verification error:", error);
        localStorage.removeItem("token");
        dispatch(
          loginFailure(
            error instanceof Error ? error.message : "Verification failed"
          )
        );
      }
    };

    verifyToken();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="*"
          element={
            <PrivateRouteWrapper>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<AllEvents />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/test" element={<EventForm />} />
              </Routes>
            </PrivateRouteWrapper>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
