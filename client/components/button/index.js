import React from "react";
import Link from "next/link";
import cn from "classnames";

import styles from "./button.module.css";

const LinkButton = ({ href, children, ...props }) => {
    return (
        <a href={href} {...props}>{children}</a>
    )
}

const BaseButton = ({ children, ...props }) => {
    return (
        <button type="button" {...props}>
            {children}
        </button>
    )
}

export default function Button ({
    primary,
    secondary,
    active = true,
    full = false,
    isLoading = false,
    children,
    className,
    ...props
}) {
    const Comp = props.href ? LinkButton : BaseButton
    return (
        <Comp
            className={cn(
                styles.button,
                primary && styles.primary,
                secondary && styles.secondary,
                !active && styles.transparent,
                full && styles.full,
                isLoading && styles.isLoading,
                className
            )}
            {...props}
        >
            {children}
        </Comp>
    )
}
