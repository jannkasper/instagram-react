import React from "react";

export default function Avatar ({
   src,
   username,
   size,
   border,
}) {
    return (
        <img
            alt={`${username}'s profile pic`}
            data-testid="avatar"
            draggable="false"
            src={src || "../../static/images/avatar.jpg"}
            style={{
                width: size || 22,
                height: size || 22,
                borderRadius: border || 50,
                border: border && "2px solid white",
            }}
        />
    );
}
