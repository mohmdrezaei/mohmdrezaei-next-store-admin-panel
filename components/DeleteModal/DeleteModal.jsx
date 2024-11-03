import styles from "./DeleteModal.module.css";

function DeleteModal({setDeleteModal,confirmDelete , message}) {


  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <img src="/images/close.png" alt="" />
          <p>{message}</p>
          <div className={styles.buttons}>
          <button className={styles.delete} onClick={confirmDelete}>حذف</button>
          <button
            className={styles.cancel}
            onClick={() => setDeleteModal({ show: false, id: "" })}
          >
            لغو
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
