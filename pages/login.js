import { useState } from "react";
import LoginPage from "../components/template/LoginPage.js";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  return <LoginPage formData={formData} setFormData={setFormData} />;
}

export default Login;

export async function getServerSideProps(context) {
  const { token } = context.req.cookies;
  if (token) {
    return {
      redirect: {
        destination: "/products",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
