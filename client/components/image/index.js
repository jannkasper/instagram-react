import React from "react";

export default function Image ({
    src,
    display,
    size,
    position,
    border,
    borderRadius,
    left, top,
}) {
    return (
        <img
            src={src || "../../static/images/vertical.jpg"}
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
