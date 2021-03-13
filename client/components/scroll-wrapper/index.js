import React from "react";
import {FlexWrapper} from "../flex-wrapper";

import styles from "./scroll-wrapper.module.css";

const ScrollWrapper = (props) => (
    <FlexWrapper
        flexDirection={props.flexDirection || "column"}
        flex={props.flex || "0 1 auto"}
        alignItems={props.alignItems}
        height={props.height}
        width={props.width}
        other={{
            border: props.border,
            borderRadius: props.borderRadius,
            background: props.background,
            outline: 0,
            overflow: "hidden"
        }}
    >
        <div
            className={props.hideScrollbar && styles.hideScrollbar}
            style={{
                margin: props.contentMargin || '0',
                padding: props.contentPadding || '0',
                width: props.contentWidth || 'auto',
                height: props.contentHeight || 'auto',
                overflowX: props.overflowX || "hidden",
                overflowY: props.overflowY || "scroll",
                whiteSpace: props.whiteSpace || "nowrap",
                ...props.other
            }}
        >
            {props.children}

        </div>
    </FlexWrapper>
)

export default ScrollWrapper