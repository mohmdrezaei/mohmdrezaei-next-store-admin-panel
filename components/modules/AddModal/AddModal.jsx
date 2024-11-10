import React, { useEffect, useState } from "react";
import styles from "./AddModal.module.css";
import { useForm } from "react-hook-form";
import { useProductMutation } from "../../../hooks/useProduct";

function AddModal({ setAddModal, product }) {
  const [form, setForm] = useState({ name: "", quantity: "", price: "" });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { mutate, isPending } = useProductMutation(product, setAddModal);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = () => {
    if (product) {
      mutate({ id: product.id, ...form });
    } else {
      mutate(form);
    }
  };

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        quantity: product.quantity,
        price: product.price,
      });
      setValue("name", product.name);
      setValue("quantity", product.quantity);
      setValue("price", product.price);
    }
  }, [product, setValue]);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h2>{product ? "ویرایش اطلاعات" : "ایجاد محصول جدید"}</h2>
          <form onSubmit={handleSubmit(submitHandler)} onChange={changeHandler}>
            <div className={styles.formControl}>
              <label htmlFor="name">نام کالا</label>
              <input
                type="text"
                name="name"
                placeholder="نام کالا"
                value={form.name}
                onChange={changeHandler}
                id="name"
                {...register("name", { required: true })}
              />
              {errors.name && errors.name.type === "required" && (
                <span className={styles.error}>نام کالا الزامی است!</span>
              )}
            </div>
            <div className={styles.formControl}>
              <label htmlFor="quantity">تعداد موجودی</label>
              <input
                type="number"
                name="quantity"
                placeholder="تعداد موجودی"
                value={form.quantity}
                onChange={changeHandler}
                id="quantity"
                {...register("quantity", { required: true })}
              />
              {errors.quantity && errors.quantity.type === "required" && (
                <span className={styles.error}>تعداد را وارد کنید!</span>
              )}
            </div>
            <div className={styles.formControl}>
              <label htmlFor="price">قیمت</label>
              <input
                type="text"
                name="price"
                placeholder="قیمت"
                id="price"
                value={form.price}
                onChange={changeHandler}
                {...register("price", { required: true })}
              />
              {errors.price && errors.price.type === "required" && (
                <span className={styles.error}>قیمت را وارد کنید!</span>
              )}
            </div>
            <div className={styles.buttons}>
              {product ? (
                <button
                  type="submit"
                  className={styles.add}
                  disabled={isPending}
                >
                  ثبت اطلاعات جدید
                </button>
              ) : (
                <button
                  type="submit"
                  className={styles.add}
                  disabled={isPending}
                >
                  ایجاد
                </button>
              )}

              <button
                className={styles.cancel}
                onClick={() => setAddModal(false)}
              >
                انصراف
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddModal;
