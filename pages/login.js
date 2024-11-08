import { useState } from "react";
import LoginPage from "../components/template/LoginPage.js";
import PublicRoutes from "../router/PublicRoutes.jsx";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  return (
    <PublicRoutes>
      <LoginPage formData={formData} setFormData={setFormData} />
    </PublicRoutes>
  );
}

export default Login;
