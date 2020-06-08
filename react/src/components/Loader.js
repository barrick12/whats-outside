import React from 'react'
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";

const emotionCss = css`
display: block;
margin: 0 auto;  
display: flex;    
`;

export default function Loader(props){    

  console.log("Loader isMobile? ", props.isMobile);

  var loader = props.isLoading == true ? 
    (<span className="loading-container">
      <PulseLoader
        css={emotionCss}
        size={props.isMobile ? 50 : 20}            
        color={"#fbbc05"}
        loading={props.isLoading} />
    </span>) : (<span></span>);

  return(loader);

}




