import React from 'react'
import Button from '../button'

export default function ButtonGroup ({
    buttons,
    icons,
    activeIcons,
    buttonStyle,
    selected,
    setSelected,
    ...props
}) {
    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-end",
            }}
            {...props}
        >
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
