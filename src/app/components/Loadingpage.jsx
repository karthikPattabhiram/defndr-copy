import React from "react";
import styles from "../styles/Loadingpage.module.css";
import { RaceBy } from "@uiball/loaders";

function Loadingpage({ loadingText }) {
  const loadingTextP = loadingText || "Loading, Please wait...";
  return (
    <main className={styles.main}>
      <span className={styles.loader}>
        <RaceBy size={200} lineWeight={5} speed={1.4} color="white" />
        <p className={styles.p}>{loadingTextP}</p>
      </span>
    </main>
  );
}

export default Loadingpage;
