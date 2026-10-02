import styles from './Toast.module.css';

const Toast = ({ show }) => {
  if (!show) return null;

  return (
    <div className={styles.toast}>
      Added to cart
    </div>
  );
};

export default Toast;