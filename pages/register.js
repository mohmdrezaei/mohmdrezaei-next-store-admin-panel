import { useState } from "react";
import RegisterPage from "../components/template/RegisterPage";
import PublicRoutes from "../router/PublicRoutes";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <PublicRoutes>
      <RegisterPage formData={formData} setFormData={setFormData} />
    </PublicRoutes>
  );
}

export default Register;
