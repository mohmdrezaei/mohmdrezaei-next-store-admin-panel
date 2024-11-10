import { useRouter } from "next/router";
import { deleteCookie, getCookie } from "../../utils/cookie";
import getUserInfoFromToken from "../../services/userInfo";
import { useCallback, useEffect, useState } from "react";
import { useGetProducts } from "../../services/queries";
import DeleteModal from "../modules/DeleteModal/DeleteModal";
import { useProductDeletion } from "../../hooks/useProduct";
import AddModal from "../modules/AddModal/AddModal";

import { BsTrash } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { GiSettingsKnobs } from "react-icons/gi";
import { FiMoreHorizontal } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import styles from "./ProductsPage.module.css";
import Pagination from "../modules/pagination/Pagination";
import ProductsList from "./ProductsList";
import Loader from "../modules/Loader";
import { toast } from "react-toastify";
import api from "../../configs/api";

function ProductsPage({initialData}) {
  const token = getCookie("token");
  const userInfo = getUserInfoFromToken(token);

  const router = useRouter();
  const {page}= router.query
  
  const [initPage, setInitPage] = useState(page || 1);
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    message: "",
    ids: [],
  });

  const [addModal, setAddModal] = useState({ show: false, product: null });
  const [showCheckbox, setShowCheckbox] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  

  const { isLoading, error  } = useGetProducts(initPage  );
  const [products, setProducts] = useState(initialData )
  console.log(products)

  const { mutate } = useProductDeletion(selectedProducts, setDeleteModal);

  const productSelectHandler = (id) => {
    setSelectedProducts((selected) =>
      selected.includes(id)
        ? selected.filter((productId) => productId !== id)
        : [...selected, id]
    );
  };

  const deleteHandler = (e, id) => {
    e.preventDefault();
    if (showCheckbox && selectedProducts.length === 0) {
      toast.error("هیچ محصولی انتخاب نشده است!");
      return;
    }
    if (showCheckbox && selectedProducts.length > 1) {
      setDeleteModal({
        show: true,
        message: "آیا از حذف  این محصولات اطمینان دارید؟",
        ids: selectedProducts,
      });
    } else {
      setDeleteModal({
        show: true,
        message: "آیا از حذف این محصول مطمئنید؟",
        ids: [id],
      });
    }
  };

  const confirmDelete = () => {
    if (selectedProducts.length > 1) {
      mutate(selectedProducts);
    } else {
      mutate(deleteModal.ids);
    }
  };
  const logoutHandler = () => {
    deleteCookie("token");
    router.push("/login");
  };

  const showAddModal = (e) => {
    e.preventDefault();
    setAddModal({ show: true, product: null });
  };
  const showEditModal = (e, product) => {
    e.preventDefault();
    setAddModal({ show: true, product: product });
  };

  const closeHandler = () => {
    setShowCheckbox(false);
    setSelectedProducts([]);
  };
  const fetchProducts = useCallback(async () => {
    try {
      const newData = await api.get(`products?page=${initPage}&limit=10`);
      
      setProducts(newData);
    } catch (error) {
     console.log(error.message)
     if (error.response && error.response.status === 400) {
        setInitPage(initPage - 1);
        router.push({ pathname: "/products", query: { page: initPage - 1 } });
      }
    }
  }, [initPage , error]);

  useEffect(() => {
    setInitPage(page || 1);
  }, [page]);

  

  useEffect(() => {
    fetchProducts()
  }, [selectedProducts, addModal, initPage ,deleteModal]);

  if (isLoading) return <Loader />;

  

  return (
    <div className={styles.container}>
      {deleteModal.show && (
        <DeleteModal
          setDeleteModal={setDeleteModal}
          confirmDelete={confirmDelete}
          message={deleteModal.message}
        />
      )}
      {addModal.show && (
        <AddModal setAddModal={setAddModal} product={addModal.product} />
      )}

      <header>
        <div className={styles.search}>
          <BsSearch />
          <input type="text" placeholder="جستحو کالا" />
        </div>

        <div className={styles.user}>
          <img src="/images/profile.png" alt="" />
          <div>
            <p>{userInfo?.username}</p>
            <span>مدیر</span>
          </div>
          <CiLogout size="27px" title="خروج" onClick={logoutHandler} />
        </div>
      </header>

      <div className={styles.add}>
        <div className={styles.title}>
          <GiSettingsKnobs />
          <span>مدیریت کالا</span>
        </div>

        <div>
          <button onClick={showAddModal}>افزودن محصول</button>
        </div>
      </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>نام کالا</th>
              <th> موجودی</th>
              <th> قیمت</th>
              <th> شناسه کالا</th>
              <th>
                {!showCheckbox ? (
                  <FiMoreHorizontal
                    size="25px"
                    onClick={() => setShowCheckbox(true)}
                  />
                ) : (
                  <div className={styles.groupDelete}>
                    <BsTrash
                      size="20px"
                      color="#F43F5E"
                      onClick={(e) => deleteHandler(e, null)}
                    />
                    <IoCloseSharp
                      size="20px"
                      onClick={closeHandler}
                      color="#862b3a"
                    />
                  </div>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {products.data.length > 0 ? (
              products?.data.map((product) => (
                <ProductsList
                  key={product.id}
                  product={product}
                  selectedProducts={selectedProducts}
                  productSelectHandler={productSelectHandler}
                  showCheckbox={showCheckbox}
                  deleteHandler={deleteHandler}
                  showEditModal={showEditModal}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", color: "red" }}>
                  هیچ محصولی وجود ندارد.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      {products?.totalPages > 1 && (
        <Pagination page={initPage} setPage={setInitPage} pages={products?.totalPages} />
      )}
    </div>
  );
}

export default ProductsPage;
