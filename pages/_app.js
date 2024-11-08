import TanstackQueryProvider from "../provider/TanstackQueryProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import "../styles/fonts.css";

function MyApp({ Component, pageProps }) {
  return (
    <TanstackQueryProvider>
      <Component {...pageProps} />

      <ToastContainer
        position="top-center"
        autoClose={3000}
        rtl={true}
        draggable
        pauseOnHover
        theme="light"
      />
    </TanstackQueryProvider>
  );
}

export default MyApp;
