import React, {useEffect, useState} from "react";
import {fetchImage} from "../../util/context";

export default function Avatar ({
   src,
   username,
   size,
   border,
}) {
    const [imageBase64, setImageBase64] = useState(null);

    useEffect( () => {
        fetchImage(setImageBase64, src);
    }, [src])

    return (
        <img
            alt={`${username}'s profile pic`}
            data-testid="avatar"
            draggable="false"
            src={imageBase64 || "../../../static/images/avatar.jpg"}
            style={{
                width: size || 22,
                height: size || 22,
                border: border && "1px solid rgba(0,0,0,.0975)",
                borderRadius: border || 50,
            }}
        />
    );
}
