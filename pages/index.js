import api from "../configs/api";
import HomePage from "../components/template/HomePage";

function index({ data }) {
  return (
    <HomePage data={data} />
  );
}

export default index;


export async function getStaticProps() {
  const data = await api.get("products");
  console.log(data)
    if(!data.data){
        return{
            notFound:true
        }
    }
  return {
    props: { data },
  };
}
