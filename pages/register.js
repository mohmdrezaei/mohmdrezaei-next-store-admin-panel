import { useState } from "react";
import RegisterPage from "../components/template/RegisterPage";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  return <RegisterPage formData={formData} setFormData={setFormData} />;
}

export default Register;

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
