import { useAddProduct, useDeleteProduct, useDeleteProducts, useUpdateProduct } from "../services/mutations";

function useProductMutation(product, setAddModal) {
    return product ? useUpdateProduct(setAddModal) : useAddProduct(setAddModal);
  }

  function useProductDeletion(selectedProducts, setDeleteModal) {
    return selectedProducts.length > 1
      ? useDeleteProducts(setDeleteModal)
      : useDeleteProduct(setDeleteModal);
  }
  export {
    useProductMutation,
    useProductDeletion
  }