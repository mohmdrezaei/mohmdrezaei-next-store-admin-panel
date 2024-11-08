import { useRouter } from "next/router";
import { getCookie } from "../utils/cookie";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
    const router = useRouter();
    const token = getCookie('token');
    useEffect(() => {
     
      if (!token) {
        router.push('/login');
      }
    }, [ token, router]);
  
    return <>{children}</>;
}

export default ProtectedRoute;