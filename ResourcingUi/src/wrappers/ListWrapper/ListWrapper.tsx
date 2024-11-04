import { FC, ReactNode } from "react";
import styles from "./ListWrapper.module.scss";

interface ListWrapperProps {
  children: ReactNode;
}

const ListWrapper: FC<ListWrapperProps> = ({ children }) => {
  return (
    <div className={styles.ListWrapper}>
      {children}
    </div>
  )
}

export default ListWrapper;