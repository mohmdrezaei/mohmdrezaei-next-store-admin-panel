import ProductsPage from "../components/template/ProductsPage";
import api from "../configs/api";

function Products({ initialData }) {
  return <ProductsPage initialData={initialData} />;
}

export default Products;

export async function getServerSideProps(context) {
  const { token } = context.req.cookies;
  const { page } = context.query;
  const data = await api.get(`products?page=${page}&limit=10`);
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: { initialData: data },
  };
}
