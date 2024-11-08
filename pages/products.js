import ProductsPage from "../components/template/ProductsPage";

function Products() {
  return <ProductsPage />;
}

export default Products;

export async function getServerSideProps(context) {
  const { token } = context.req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
