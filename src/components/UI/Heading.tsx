import styles from "./ui.styles.module.css";

const Heading: React.FC<{ heading: string }> = ({ heading }) => {
  return (
    <div
      className={`font-san font-bold py-4 rounded-sm text-center shadow-md text-2xl ${styles["heading_container"]}`}
    >
      <p className={`${styles["heading__text"]}`}> {heading}</p>
    </div>
  );
};

export default Heading;
