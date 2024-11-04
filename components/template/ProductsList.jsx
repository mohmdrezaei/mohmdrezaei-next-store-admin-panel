import { BsPencilSquare, BsTrash } from "react-icons/bs";
import styles from "./ProductsPage.module.css";
function ProductsList({
  product,
  productSelectHandler,
  selectedProducts,
  showCheckbox,
  deleteHandler,
  showEditModal
}) {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.quantity}</td>
      <td>{product.price}</td>
      <td className={styles.id}>{product.id}</td>
      <td className={styles.oprations}>
        <a onClick={(e) => showEditModal(e, product)}>
          <BsPencilSquare color="#4ADE80" />
        </a>
        <a onClick={(e) => deleteHandler(e, product.id)}>
          <BsTrash color="#F43F5E" />
        </a>
        {showCheckbox && (
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={selectedProducts.includes(product.id)}
            onChange={() => productSelectHandler(product.id)}
          />
        )}
      </td>
    </tr>
  );
}

export default ProductsList;
