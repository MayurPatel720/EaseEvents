// src/App.tsx
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import not from "./assets/notfound.jpg";
import { PrivateRouteWrapper } from "./components/PrivateRoute";
import Login from "./components/Login";
import { loginFailure, setUser } from "./Store/Reducers/AuthReducer";
import Home from "./components/Home";
import RegisterForm from "./components/Register";
import ProfilePage from "./components/Profile";
import AllEvents from "./components/AllEvents";
import EventForm from "./components/Test";
import EventParticipationForm from "./components/EventParticipationForm";
import EventDetails from "./components/EventDetails";
import Participants from "./components/Participants";
import Volunteers from "./components/Volunteers";
import Analytics from "./components/Analytics";
import Promotions from "./components/Promotions";
import QA from "./components/QA";

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
          path="/participate/:eventId"
          element={<EventParticipationForm />}
        />

        <Route
          path="*"
          element={
            <PrivateRouteWrapper>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<AllEvents />} />
                <Route path="/events/:eventId" element={<EventDetails />} />
                <Route path="/events/:eventId/participants" element={<Participants />} />
                <Route path="/events/:eventId/volunteers" element={<Volunteers />} />
                <Route path="/events/:eventId/analytics" element={<Analytics />} />
                <Route path="/events/:eventId/promotions" element={<Promotions />} />
                <Route path="/events/:eventId/qa" element={<QA />} />
                <Route
                  path="*"
                  element={
                    <>
                      <a className="p-5 underline text-blue-500" href="/">
                        Home
                      </a>
                      <center>
                        <img className="h-screen" src={not} alt="img" />
                      </center>
                    </>
                  }
                />
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
