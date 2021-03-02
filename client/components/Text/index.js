import React from "react";
import { Verified } from "../icons";

export function Label ({
    size = 14,
    height = 18,
    weight = 700,
    verified = false,
    display = "inherit",
    children
}) {
    return (
        <div
            style={{
                display: display,
                fontSize: size,
                lineHeight: `${height}px`,
                fontWeight: weight,
            }}
        >
            {children}
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
        <div
            style={{
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
        </div>
    ) : null
}
