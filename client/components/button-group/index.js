import React from 'react'
import Button from '../button'

import styles from './button-group.module.css'

export default function ButtonGroup ({
    buttons,
    icons,
    activeIcons,
    buttonStyle,
    selected,
    setSelected,
}) {
    return (
        <div className={styles.container}>
            {buttons.map((button, index) => (
                <Button
                    key={button}
                    style={buttonStyle}
                    onClick={() => setSelected(button)}
                >
                    { (button === selected && activeIcons && activeIcons[index]) || (icons && icons[index]) || button }
                </Button>
            ))}
        </div>
    )
}
