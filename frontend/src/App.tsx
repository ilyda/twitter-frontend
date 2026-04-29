import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));

  return (
    <Routes>
      <Route
        path="/*"
        element={isAuth ? <HomePage /> : <Navigate to="/auth" />}
      />
      <Route
        path="/auth"
        element={<LoginPage setIsAuth={setIsAuth} />}
      />
    </Routes>
  );
}

export default App;