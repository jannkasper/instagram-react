import React from "react";
import Image from "../../image";
import Video from "../../video";
import Sidecar from "../../sidecar";

import styles from "./feed-item-content.module.css"
import Wrapper from "../../wrapper";

const Picture = ({ resourceArray, isVideo, videoUrl, isSidecar, sidecarArray }) => {

    let component;
    if (isVideo) {
        component = <Video src={videoUrl}/>
    } else if (isSidecar) {
        component = <Sidecar imageArray={sidecarArray}/>
    } else {
        component = <Image src={resourceArray[1].src}/>
    }

    return (
        <Wrapper height="inherit" maxWidth="inherit">
            { component }
        </Wrapper>
    );
}

export default Picture