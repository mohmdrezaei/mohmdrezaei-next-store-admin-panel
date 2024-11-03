import { Navigate, Outlet } from 'react-router-dom'
import { getCookie } from 'utils/cookie';
const ProtectedRoutes = () => {
  const token =getCookie('token');

  return !token ? <Navigate to="/login" /> : <Outlet/>;


}

export default ProtectedRoutes;
