import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import PrivateRoute from "./routes/PrivateRoute";
import CreateProject from "./pages/CreateProject";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import MyProjects from "./pages/MyProjects";
import Navbar from "./components/Navbar";
import PublicLayout from "./layouts/MainLayout"; // 👈 New layout
import ViewEditProject from "./pages/ViewEditProject";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes with shared layout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/projects/new"
            element={
              <PrivateRoute>
                <CreateProject />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/projects/:id/edit"
            element={
              <PrivateRoute>
                <ViewEditProject />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-projects"
            element={
              <PrivateRoute>
                <MyProjects />
              </PrivateRoute>
            }
          />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


