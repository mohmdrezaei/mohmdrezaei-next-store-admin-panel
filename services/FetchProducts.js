import api from "../configs/api";

export const fetchProducts = async () => {
    const response = await api.get(`products?page=${initPage}&limit=10`);
    const newData = await response.data;
    return {newData}
  };