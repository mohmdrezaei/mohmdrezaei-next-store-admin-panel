import ProductsPage from "../components/template/ProductsPage";
import ProtectedRoute from "../router/ProtectedRoute";
import Auth from "../router/PublicRoutes";

function Products() {
  return(
  <ProtectedRoute>
    <ProductsPage />
  </ProtectedRoute>
  )
}

export default Products;
