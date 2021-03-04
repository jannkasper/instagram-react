import React, { useState } from "react";
import { Verified } from "../icons";

export function Label ({
    size = 14,
    height = 18,
    weight = 600,
    verified = false,
    color,
    display = "inherit",
    useHover,
    textTransform = "none",
    additionalStyle,
    children
}) {
    const [isHover, setHover] = useState(false);
    const toggleHover = () => setHover(!isHover);

    const hoverStyle = useHover && isHover ? { textDecoration: "underline" } : { textDecoration: "none" };
    return (
        <div
            style={{
                display: display,
                fontSize: size,
                lineHeight: `${height}px`,
                fontWeight: weight,
                color: color,
                textDecoration: "none",
                textTransform: textTransform,
                ...additionalStyle
            }}
        >
            <span
                style={hoverStyle}
                onMouseEnter={toggleHover}
                onMouseLeave={toggleHover}
            >
                {children}
            </span>
            &nbsp;
            {verified ? <Verified width={size} height={size} /> : null}
        </div>
    );
}

export function Info ({
   size = 12,
   height = 18,
   weight = 400,
   color,
   children
}) {
    return children ? (
        <span
            style={{
                // display: "inline",
                fontSize: size,
                lineHeight: `${height}px`,
                fontWeight: weight,
                color: color,
                maxWidth: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
            }}
        >
            {children}
        </span>
    ) : null
}
