import { FC, ReactNode } from "react";
import styles from "./PageWrapper.module.scss";

interface PageWrapperProps {
    children: ReactNode;
}

const PageWrapper: FC<PageWrapperProps> = ({ children }) => {
  return (
    <div className={styles.PageWrapper}>
        {children}
    </div>
  )
}

export default PageWrapper;