import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthLayout from "./pages/Authlayout";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn"; // Assuming you have a SignIn component
// TODO: CONFIGURE REACT QUERY
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ProtectedRoute from "./pages/ProtectedRoute";
import DashboardLayout from "./pages/DashboardLayout";
import Profile from "./pages/Profile";

import { Toaster } from "react-hot-toast";
import AdminDashboardLayout from "./pages/AdminDashboardLayout";
import ClassPage from "./pages/ClassPage";
import TeacherPage from "./pages/TeacherPage";
import StudentPage from "./pages/StudentPage";
import FinancePage from "./pages/FinancePage";

// *Create a client
const queryClient = new QueryClient();
function App() {
  return (
    <>
      {" "}
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              {/* Render AuthLayout at the root path */}
              <Route index element={<Navigate replace to="signup" />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="signin" element={<SignIn />} />
            </Route>
            {/* PROTECTED ROUTES */}
            <Route
              path="/dashboard/:userID/*"
              element={<ProtectedRoute element={DashboardLayout} />}
            >
              <Route index element={<Profile />} />
            </Route>

            {/* Admin dashboard */}
            <Route path="/admin" element={<AdminDashboardLayout />}>
              <Route index element={<Navigate to="class" replace />} />
              <Route path="class" element={<ClassPage />} />
              <Route path="teacher" element={<TeacherPage />} />
              <Route path="student" element={<StudentPage />} />
              <Route path="finance" element={<FinancePage />} />
            </Route>
          </Routes>
        </Router>
        <Toaster position="top-right" reverseOrder={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
