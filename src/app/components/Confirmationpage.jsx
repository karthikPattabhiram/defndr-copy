"use client";
import React, { useEffect, useState } from "react";
import styles from "../styles/confirmationpage.module.css";
import progressbar from "../../../public/assets/images/Group 33117.png";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import gradient from "../../../public/assets/images/gradient.png";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";
import Loadingpage from "./Loadingpage";
import Successpage from "./Successpage";
import Errorpage from "./Errorpage";

function Confirmationpage({}) {
  const [success, setSuccess] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);
  const [errorCode, setErrorCode] = useState(0);
  const { address } = useAccount();
  const user = JSON.parse(sessionStorage.getItem('data'))
  const userAvatarCode = user.avatar
  const userAvatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${userAvatarCode}`;
  const session = user.sessionToken
  
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: `defndr.in wants you to sign in with your crypto account: ${address}, By signing this request this will prove your identity and you will be connected with your discord account. \n\n ${session} `,
    async onSuccess() {
      setDone(true);
    },
  });


  useEffect(() => {
    const requestfunc = async () => {
      try {
        if (done === false) return;
        if (done === true) {
          
          console.log("done");
          const walletAddress = address;
          const signatureAddress = data;
          console.log(walletAddress, signatureAddress, session);
          const data2 = {
            walletAddress: walletAddress,
            signatureAddress: signatureAddress,
            session: session,
          };
          const request = await fetch("https://api.defndr.xyz/success", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data2),
          });

          if (request.status === 200) {
            disconnect();
            signOut();
            setSuccess(true);
          } else if (request.status === 401) {
            setError(true);
            disconnect();
            signOut();

            setErrorCode(401);
            //session is invalid
          } else if (request.status === 402) {
            setError(true);
            signOut();
            disconnect();
            setErrorCode(402);
            //walletaddress is invalid
          } else if (request.status === 403) {
            setError(true);
            signOut();
            disconnect();
            setErrorCode(403);
            //signature is invalid
          } else if (request.status === 404) {
            setError(true);
            signOut();
            disconnect();
            setErrorCode(404);
            //walletaddress is duplicated
          } else if (request.status === 405) {
            setError(true);
            disconnect();
            signOut();
            setErrorCode(405);
            //an error occurred
          } else if (request.status === 406) {
            setError(true);
            signOut();
            setErrorCode(406);
            disconnect();
            console.log("An error occurred", request.status);
            //session is not found
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    requestfunc();
  }, [done]);

  function formatEthereumAddress(address) {
    if (address === undefined) return;
    else {
      if (address.length < 12) return address;

      const prefix = address.slice(0, 4);
      const suffix = address.slice(-4);

      return `${prefix}...${suffix}`;
    }
  }

  const formattedAddress = formatEthereumAddress(address);

 
  const { disconnect } = useDisconnect();
  if (success === false) {
    if (error === true) {
      if (errorCode === 401) {
        return (
          <Errorpage errorText="Session invalid, please try the verification process again" />
        );
      } else if (errorCode === 402) {
        return (
          <Errorpage errorText="Wallet address invalid, please try the verification process again" />
        );
      } else if (errorCode === 403) {
        return (
          <Errorpage errorText="Signature invalid, please try the signature process again" />
        );
      } else if (errorCode === 404) {
        return (
          <Errorpage errorText="Wallet address is linked with an another discord account, please try the verification process again" />
        );
      } else if (errorCode === 405) {
        return (
          <Errorpage errorText="An error occurred, please try the verification process again" />
        );
      } else if (errorCode === 406) {
        return (
          <Errorpage errorText="Session not found, please try the verification process again" />
        );
      }
    } else if (error === false) {
      if (done === false) {
        return (
          <div className={styles.main}>
            <div className={styles.top}>
              <p className={styles.top_title}> Confirm your account</p>
              <p className={styles.top_desc}>
                confirm to link your wallet to discord account
              </p>
              <Image src={progressbar} />
            </div>
            <div className={styles.bottom}>
              <div className={styles.b_top}>
                <img
                  src={userAvatarUrl}
                  alt="discord-profile"
                  className={styles.discord_profile}
                  width="92"
                  height="92"
                />
                <Image
                  src={gradient}
                  alt="wallet-profile"
                  className={styles.web3_profile}
                  width="92"
                  height="92"
                />
              </div>

              <p className={styles.confirmation_text}>
                do you want connect your {formattedAddress} wallet to your
                discord account?{" "}
              </p>
              <div className={styles.b_mid}>
                <button
                  className={styles.link_btn}
                  onClick={() => signMessage()}
                >
                  link
                </button>
                <button
                  className={styles.cancel_btn}
                  onClick={() => disconnect()}
                >
                  cancel
                </button>
              </div>
              <div className={styles.b_bottom}>
                <svg
                  class="information-circle-contained"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.00005 8.9998L9.00005 12.5998M9.00005 6.33145V6.2998M1.80005 8.9998C1.80005 5.02335 5.0236 1.7998 9.00005 1.7998C12.9765 1.79981 16.2 5.02336 16.2 8.99981C16.2 12.9763 12.9765 16.1998 9.00005 16.1998C5.0236 16.1998 1.80005 12.9763 1.80005 8.9998Z"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p>by clicking “link”, you agree to accept our TOS</p>
              </div>
            </div>
          </div>
        );
      } else if (done === true) {
        return (
          <>
            <Loadingpage loadingText="Verifying your account, please wait..." />
          </>
        );
      }
    }
  } else if (success === true) {
    return <Successpage />;
  }
}

export default Confirmationpage;
