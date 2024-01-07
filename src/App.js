import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Spinner from "./components/Spinner";
import SafeRoute from "./components/SafeRoute";
import OpenRoute from "./components/OpenRoute";
import AddDoctor from "./pages/AddDoctor";
import Notification from "./pages/Notification";
import Employee from "./pages/admin/Employee";
import Doctors from "./pages/admin/Doctors";
import Profile from "./pages/doctor/Profile";
import { AppointmentList } from "./pages/AppointmentList";
import Visits from "./pages/Visits";
import DoctorVisits from "./pages/doctor/DoctorVisits";
import AddDocumentation from "./pages/AddDocumentation";
import Documentations from "./pages/admin/Documentations";
import DocProfile from "./pages/documentation/DocProfile";
import Verify from "./pages/Verify";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/add-doctor"
              element={
                <SafeRoute>
                  <AddDoctor />
                </SafeRoute>
              }
            />
            <Route
              path="/add-documentation"
              element={
                <SafeRoute>
                  <AddDocumentation />
                </SafeRoute>
              }
            />
            <Route
              path="/admin/doctors"
              element={
                <SafeRoute>
                  <Doctors />
                </SafeRoute>
              }
            />
            <Route
              path="/admin/documentation"
              element={
                <SafeRoute>
                  <Documentations />
                </SafeRoute>
              }
            />
            <Route
              path="/admin/employee"
              element={
                <SafeRoute>
                  <Employee />
                </SafeRoute>
              }
            />
            <Route
              path="/doctor/profile/:id"
              element={
                <SafeRoute>
                  <Profile />
                </SafeRoute>
              }
            />
            <Route
              path="/documentation/docprofile/:id"
              element={
                <SafeRoute>
                  <DocProfile />
                </SafeRoute>
              }
            />
            <Route
              path="/doctor/appointment-list/:doctorId"
              element={
                <SafeRoute>
                  <AppointmentList />
                </SafeRoute>
              }
            />
            <Route
              path="/notification"
              element={
                <SafeRoute>
                  <Notification />
                </SafeRoute>
              }
            />
            <Route
              path="/login"
              element={
                <OpenRoute>
                  <Login />
                </OpenRoute>
              }
            />
            <Route
              path="/register"
              element={
                <OpenRoute>
                  <Register />
                </OpenRoute>
              }
            />
            <Route
              path="/verify/:id"
              element={
                <OpenRoute>
                  <Verify />
                </OpenRoute>
              }
            />
            <Route
              path="/visits"
              element={
                <SafeRoute>
                  <Visits />
                </SafeRoute>
              }
            />
            <Route
              path="/doctor-visits"
              element={
                <SafeRoute>
                  <DoctorVisits />
                </SafeRoute>
              }
            />
            <Route
              path="/"
              element={
                <SafeRoute>
                  <Home />
                </SafeRoute>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
