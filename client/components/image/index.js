import React, {  useEffect, useState } from "react";
import {fetchImage} from "../../util/context";

export default function Image ({
    src,
    display,
    size,
    position,
    border,
    borderRadius,
    left, top,
}) {
    const [imageBase64, setImageBase64] = useState(null);

    useEffect( () => {
        fetchImage(setImageBase64, src);
    }, [src])

    if (!imageBase64) {
        return <></>
    }

    return (
        <img
            src={imageBase64}
            style={{
                position: position || "relative",
                display: display || "block",
                maxWidth: "inherit",
                height: size || "inherit",
                width: size || "inherit",
                left: left || 0,
                top: top || 0,
                objectFit: "cover",
                border: border || "none",
                borderRadius: border && borderRadius || "0"
            }}
        />
    );
}
