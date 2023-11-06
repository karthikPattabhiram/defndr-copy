import React, { useState } from "react";
import styles from "../styles/connectwallet.module.css";
import progressbar from "../../../public/assets/images/Group33116.png";
import Image from "next/image";
import Confirmationpage from "./Confirmationpage";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";

function Connectwalletpage({ data }) {
  const [isConnected, setIsConnected] = useState(false);
  const { open } = useWeb3Modal();
  const { address, isConnecting, isDisconnected } = useAccount({
    onConnect({ address, connector, isReconnected }) {
      console.log("Connected", { address, connector, isReconnected });
      setIsConnected(true);
    },
    onDisconnect() {
      console.log("Disconnected");
      setIsConnected(false);
    },
  });
  console.log(data)

  if (isConnected === true) {
    return <Confirmationpage data={data} />;
  } else if (isConnected === false) {
    return (
      <div className={styles.main}>
        <div className={styles.top}>
          <p className={styles.top_title}> Link your web3 wallet</p>
          <p className={styles.top_desc}>link your web3 wallet by clicking the button below</p>
          <Image src={progressbar} />
        </div>
        <div className={styles.bottom}>
          <div className={styles.discord}>
            <p className={styles.discord_p}>discord</p>
            <button className={styles.discord_btn} disabled={true}>
              linked
            </button>
          </div>
          <div className={styles.web3}>
            <p className={styles.web3_p}>web3 wallet</p>

            <button className={styles.connect_btn} onClick={() => open()}>
              link
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Connectwalletpage;
