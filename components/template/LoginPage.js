
import { setCookie } from "../../utils/cookie";
import { useForm } from "react-hook-form";

import styles from "./AuthPage.module.css";

import { useLogin } from "../../services/mutations";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";
function LoginPage({formData ,setFormData}) {
 
  const router = useRouter();
  const { mutate } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const submitHandler = async () => {
    const { username, password } = formData;

    mutate(
      { username, password },
      {
        onSuccess: (data) => {
          toast.success("ورود با موفقیت انجام شد! خوش آمدید");
          setCookie("token", data?.token);
          router.push("/products");
        },
        onError: () => {
          toast.error("ورود با مشکل روبرو شد");
        },
      }
    );
  };

  return (
    <div className={styles.auth}>
      <img src="/images/Union.png" alt="" />
      <h1>فرم ورود</h1>
      <form onSubmit={handleSubmit(submitHandler)} onChange={changeHandler}>
        <input
          name="username"
          type="text"
          placeholder="نام کاربری"
          className={styles.input}
          {...register("username", { required: true })}
        />
        {errors.username && errors.username.type === "required" && (
          <span>نام الزامی است!</span>
        )}
        <input
          name="password"
          type="password"
          placeholder="رمز عبور"
          className={styles.input}
          {...register("password", { required: true })}
        />
        {errors.password && errors.password.type === "required" && (
          <span>پسورد الزامی است</span>
        )}
        <button type="submit"> ورود</button>
        <Link href="/register">ایجاد حساب کاربری!</Link>
      </form>
    </div>
  );
}

export default LoginPage;
