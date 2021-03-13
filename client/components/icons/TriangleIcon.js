import * as React from "react";

function TriangleIcon() {
    const style = {
        display: "inherit",
        width: 0,
        height: 0,
        borderLeft: "4px solid transparent",
        borderRight: "4px solid transparent",
        borderTop: "6px solid #fff",
    }
    return React.createElement("div", {style})

}

export default TriangleIcon