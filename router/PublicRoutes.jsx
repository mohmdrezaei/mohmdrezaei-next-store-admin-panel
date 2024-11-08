import { useRouter } from 'next/router';
import { getCookie } from '../utils/cookie';
import { useEffect } from 'react';

const PublicRoutes = ({children}) => {
  const router = useRouter();
  const token = getCookie('token');
  useEffect(() => {
   
    if (token) {
      router.push('/products');
    }
  }, [ token, router]);

  return <>{children}</>;
};
export default PublicRoutes;