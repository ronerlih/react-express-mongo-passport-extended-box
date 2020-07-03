import React from "react";
import style from "./style.module.css";

const LoadingSpinner = props => {
   return (
      props.isLoading
         ?  <div  className={`${style.spinner} spin` } >
               <span role="img" aria-label="loading">
                  🥔
               </span>
            </div>
         :  <></>)
}
export default LoadingSpinner