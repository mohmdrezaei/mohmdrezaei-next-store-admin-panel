import api from "../configs/api";
import HomePage from "../components/template/HomePage";

function index({ data }) {
  return (
    <HomePage data={data} />
  );
}

export default index;

export async function getStaticProps() {
  const data = await api.get("http://localhost:3001/products");
  console.log(data)
    if(!data.data){
        return{
            notFound:tr
        }
    }
  return {
    props: { data },
  };
}
