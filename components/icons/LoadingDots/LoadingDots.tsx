import styles from "./LoadingDots.module.css";

const LoadingDots: React.FC<{ color?: string }> = ({ color = "#000" }) => {
  return (
    <span className={styles.loading}>
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
    </span>
  );
};

export default LoadingDots;
