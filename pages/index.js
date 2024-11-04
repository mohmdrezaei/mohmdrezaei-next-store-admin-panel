
import { useState } from "react";
import LoginPage from "../components/template/LoginPage";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  return  <LoginPage formData={formData} setFormData={setFormData} />
}

export default Login;
