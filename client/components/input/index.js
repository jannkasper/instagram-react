import React from "react";

const Input = (props) => (
    <>
    <input
        className={props.className}
        placeholder={props.placeholder || 'Search'}
        value={props.value}
        onChange={props.handleChange}
        onFocus={props.handleFocus}
        style={{
            position: props.position || "relative",
            display: props.display || "block",
            border: props.border || 'none',
            borderRadius: props.border && props.borderRadius,
            margin: props.margin || '0',
            padding: props.padding || '0',
            width: props.width || 'auto',
            height: props.height || 'auto',
            color: props.color || '#262626',
            backgroundColor: props.backgroundColor || "transparent",
            outline: 0,
            ...props.other
        }}
    />
        {props.children}
    </>
)

export default Input