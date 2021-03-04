import React from "react";

export default function Image ({
    src,
}) {
    return (
        <img
            src={src || "../../static/images/vertical.jpg"}
            style={{
                maxWidth: "inherit",
                height: "inherit",
                left: 0,
                top: 0,
                objectFit: "cover"
            }}
        />
    );
}
