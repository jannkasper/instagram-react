import React from 'react'
import Button from '../button'

export default function ButtonGroup ({
    buttons,
    icons,
    activeIcons,
    buttonStyle,
    groupStyle,
    lastStyle,
    selected,
    setSelected,
    ...props
}) {
    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                ...groupStyle
            }}
            {...props}
        >
            {buttons.map((button, index) => (
                <Button
                    key={button}
                    style={{...buttonStyle, ...(index === button.length - 1 && lastStyle)}}
                    onClick={() => setSelected(button)}
                >
                    { (button === selected && activeIcons && activeIcons[index]) || (icons && icons[index]) || button }
                </Button>
            ))}
        </div>
    )
}
