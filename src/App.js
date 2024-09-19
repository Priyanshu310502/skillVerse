import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Error } from "./pages/Error";
import './App.css'
import { Navbar } from "./components/common/Navbar";
import { About } from "./pages/About";
import { Signup } from "./pages/Signup";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { ForgotPassword } from "./pages/ForgotPassword";
import { VerifyEmail } from "./pages/VerifyEmail";
import { Dashboard } from "./pages/Dashboard";
import { UpdatePassword } from "./pages/updatePassword";
import { PriveateRoute } from "./components/core/Auth/PriveateRoute";
import { OpenRoute } from "./components/core/Auth/OpenRoute";
import { MyProfile } from "./components/DashboardPage/MyProfile";
import { Settings } from "./components/DashboardPage/Settings/Settings";
import { EnrolledCourses } from "./components/DashboardPage/EnrolledCourses";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import AddCourse from "./components/DashboardPage/addCourse";
// import {  SignupForm } from "./pages/Signup";
function App() {

  const { user } = useSelector(state => state.auth)
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />


        <Route
          path="/signup"
          element=
          {<OpenRoute>
            <Signup />
          </OpenRoute>} />


        <Route
          path="/login"
          element=
          {<OpenRoute>
            <Login />
          </OpenRoute>} />

        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/update-password/:id" element={<UpdatePassword />} />
        <Route path="/verify-emails" element={<VerifyEmail />} />
        <Route path="*" element={<Error />} />


        <Route
          element={
            <PriveateRoute>
              <Dashboard />
            </PriveateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/settings" element={<Settings/>} />
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              {/* <Route path="dashboard/cart" element={<Cart />} /> */}
              <Route
                path="dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              />
              <Route
                path="dashboard/purchase-history"
                // element={<PurchaseHistory />}
              />
            </>
          )}
          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR || (
            <>
              <Route path="dashboard/add-course" element={<AddCourse />} />
              {/* <Route path="dashboard/my-courses" element={<MyCourses />} /> */}
              <Route
                path="dashboard/edit-course/:courseId"
                // element={<EditCourse />}
              />
              <Route
                path="dashboard/instructor"
                // element={<InstructorDashboard />}
              />
            </>
          )}
          {user?.accountType === ACCOUNT_TYPE.ADMIN && (
            <>
              {/* <Route path="dashboard/admin-panel" element={<AdminPannel />} /> */}
            </>
          )}
        </Route>



      </Routes>
    </div>
  );
}

export default App;
