import React from "react";
import styles from "./flex-wrapper.module.css";

export const FlexWrapper = (props) => (
    <div
        key={props.keyIndex}
        className={props.hover && styles.hoverOpacity}
        style={{
            position: props.position || "relative",
            display: 'flex',
            justifyContent: props.justifyContent || 'flex-start',
            flexDirection: props.flexDirection || 'row',
            flexWrap: props.flexWrap || 'nowrap',
            flex: props.flex || '0 1 auto',
            alignItems: props.alignItems || 'stretch',
            margin: props.margin || '0',
            padding: props.padding || '0',
            width: props.width || 'auto',
            height: props.height || 'auto',
            top: props.top || 'auto',
            left: props.left || 'auto',
            right: props.right || 'auto',
            bottom: props.bottom || 'auto',
            maxWidth: props.maxWidth || 'none',
            minWidth: props.minWidth || 'none',
            border: props.border || 'none',
            borderRadius: props.border && props.borderRadius || '0',
            background: props.background || 'none',
            ...props.other
        }}
    >
        {props.children}
    </div>
)


export const FlexItem = (props) => (
    <div
        className={props.className}
        style={{
            flex: props.flex || '0 1 auto',
            margin: props.margin || '0',
            ...props.other

        }}
    >
        {props.children}
    </div>
)