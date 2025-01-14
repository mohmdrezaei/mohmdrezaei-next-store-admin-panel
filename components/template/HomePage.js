import Link from "next/link";
import styles from "./Home.module.css";
import { FaUser } from "react-icons/fa";
import { getCookie } from "../../utils/cookie";
import { useEffect, useState } from "react";
function HomePage({ data }) {
  const [token, setToken] = useState(null);
  useEffect(() => {
    setToken(getCookie("token"));
  }, []);

  return (
    <>
      <header className={styles.header}>
        <h1>محصولات ما</h1>
        {token ? (
          <Link href="/products">داشبورد</Link>
        ) : (
          <Link href="/login">
            <FaUser />
            ورود
          </Link>
        )}
      </header>
      <div className={styles.products}>
        {data.data.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <h2 className={styles.productName}>{product.name}</h2>
            <p className={styles.productPrice}>{product.price} تومان</p>
            <p className={styles.productQuantity}>موجودی: {product.quantity}</p>
          </div>
        ))}
      </div>
      <footer className={styles.footer}> created by mohammad rezaei</footer>
    </>
  );
}

export default HomePage;
