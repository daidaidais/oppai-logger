import React from "react";
import Styles from "./Spinner.module.css";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Spinner = () => {
  return (
    <div className={Styles.wrapper}>
      <Loader
        type="ThreeDots"
        color="#8ad0da"
        height={50}
        width={50}
        timeout={3000} //3 secs
      />
    </div>
  );
};

export default Spinner;
