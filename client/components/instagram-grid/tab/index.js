import React from "react";
import { Label } from "../../text";

import styles from "./tab.module.css";
import Button from "../../button";

const Tab = ({ title, keyName, icon, isSelected, handleSelect }) => {
    return (
            <Button
                className={styles.container}
                active={isSelected}
                onClick={() => handleSelect(keyName)}
            >
                {icon}
                <Label
                    color="#262626"
                    textTransform="uppercase"
                    additionalStyle={{letterSpacing: 1, marginLeft: 6}}
                >
                    {title}
                </Label>
            </Button>
    )
}

export default Tab
