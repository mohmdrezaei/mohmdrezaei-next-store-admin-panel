import { useRouter } from "next/router";
import styles from "./Pagination.module.css";

function Pagination({ pages   }) {
  const router = useRouter();
  const { query } = router;
  const currentPage = parseInt(query.page) || 1;

  const handlePageClick = (pageNumber) => {
    router.push({ pathname: "/products", query: { page: pageNumber } });
  };

  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.pagination}>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => handlePageClick(number)}
          style={{
            backgroundColor: currentPage === number ? "#55A3F0" : "inherit",
            color: currentPage === number ? "white" : "#8D8D8D80",
          }}
        >
          {number}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
