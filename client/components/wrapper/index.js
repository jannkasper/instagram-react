import React from "react";

const Wrapper = (props) => (
    <div
        ref={props.reference}
        className={props.className}
        style={{
            position: props.position || "relative",
            display: props.display || "block",
            margin: props.margin || '0',
            padding: props.padding || '0',
            width: props.width || 'auto',
            height: props.height || 'auto',
            maxWidth: props.maxWidth || 'none',
            minWidth: props.minWidth || 'none',
            border: props.border || "none",
            borderRadius: props.borderRadius || "0",
            ...props.other
        }}
    >
        {props.children}
    </div>
)

export default Wrapper