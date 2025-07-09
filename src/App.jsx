import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./pages/Header";
import Dashboard from "./pages/Dashboard";
import Setting from "./pages/Setting";
import AddTask from "./pages/AddTask";
import User from "./pages/User";
import { AlertProvider } from "./contexts/alertProvider"; 
import { AuthProvider } from "./contexts/AuthProvider";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AlertProvider>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/user" element={<User />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/setting"
              element={
                <ProtectedRoute>
                  <Setting />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-task"
              element={
                <ProtectedRoute>
                  <AddTask />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </AlertProvider>
    </BrowserRouter>
  );
}

export default App;
