import styles from "./Modal.module.css";

export const Modal: React.FC<{ children }> = ({ children }) => {
	return <div className={styles.modal}>{children}</div>;
};
