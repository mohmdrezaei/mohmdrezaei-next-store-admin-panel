import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../configs/api";
import { toast } from "react-toastify";

const useRegister = () => {
  const mutationFn = (data) => api.post("auth/register", data);
  return useMutation({ mutationFn });
};

const useLogin = () => {
  const mutationFn = (data) => api.post("auth/login", data);
  return useMutation({ mutationFn });
};

const useAddProduct = (setAddModal) => {
  const queryClient = useQueryClient();
  const mutationFn = (data) => api.post("products", data);

  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["products"] });
    setAddModal({ show: false, product: null });
    toast.success("محصول با موفقیت افزوده شد!");
  };
  const onError =() => {
    toast.error("مشکلی پیش آمده است")
   }
  return useMutation({ mutationFn, onSuccess , onError });
};

const useUpdateProduct = (setAddModal) => {
  const queryClient = useQueryClient();
  const mutationFn = ({ id, ...data }) => api.put(`products/${id}`, data);

  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["products"] });
    setAddModal({ show: false, product: null });
    toast.success("محصول با موفقیت ویرایش شد!");
  };
  const onError =() => {
    toast.error("مشکلی پیش آمده است")
   }
  return useMutation({ mutationFn, onSuccess ,onError });
};

const useDeleteProduct = (setDeleteModal) => {
  const queryClient = useQueryClient();
  const mutationFn = (id) => api.delete(`products/${id}`);

  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["products"] });

    setDeleteModal({ show: false, message: "", ids: [] });
    toast.success("محصول مورد نظر با موفقیت حذف شد");
  };
  const onError =() => {
    toast.error("مشکلی پیش آمده است")
   }
  return useMutation({ mutationFn, onSuccess ,onError });
};

const useDeleteProducts = (setDeleteModal) => {
  const queryClient = useQueryClient();
  const mutationFn = (ids) => api.delete("/products", { data: { ids } });

  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["products"] });

    setDeleteModal({ show: false, message: "", ids: [] });
    toast.success("محصولات مورد نظر با موفقیت حذف شدند");
  };
  const onError =() => {
    toast.error("مشکلی پیش آمده است")
   }
  return useMutation({ mutationFn, onSuccess, onError });
};

export {
  useRegister,
  useLogin,
  useAddProduct,
  useUpdateProduct,
  useDeleteProduct,
  useDeleteProducts,
};
