import { useQuery } from "@tanstack/react-query"
import api from "../configs/api"

const useGetProducts = (page)=>{
    const queryFn =()=>  api.get(`products?page=${page}&limit=10`)
    const queryKey = ["products" , page]
    const { data, error, isLoading, isPending, refetch  } = useQuery({
        queryKey,
        queryFn,
        
      });
    
      return { data, error, isLoading, isPending, refetch };
}

export { useGetProducts}