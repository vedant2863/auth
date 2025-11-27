import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Lazy load pages for code splitting
const Home = lazy(() =>
  import("./pages/Home").then((module) => ({ default: module.Home }))
);
const Register = lazy(() =>
  import("./pages/Register").then((module) => ({ default: module.Register }))
);
const Login = lazy(() =>
  import("./pages/Login").then((module) => ({ default: module.Login }))
);
const Users = lazy(() =>
  import("./pages/Users").then((module) => ({ default: module.Users }))
);

// Loading component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-xl text-gray-600">Loading...</div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div>
          <Navbar />
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/users"
                element={
                  <ProtectedRoute>
                    <Users />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
