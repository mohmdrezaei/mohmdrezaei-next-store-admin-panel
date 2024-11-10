import ProductsPage from "../components/template/ProductsPage";
import api from "../configs/api";

function Products({page , initialData}) {
  return <ProductsPage page={page} initialData={initialData} />;
}

export default Products;

export async function getServerSideProps(context) {
  const { token } = context.req.cookies;
  const {page} = context.query
  const data = await api.get(`products?page=${page}&limit=10`)
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {page : page ||1 ,  initialData:data },
  };
}
