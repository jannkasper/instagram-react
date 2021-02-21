import React, { createContext, useState, useEffect } from "react";

const ScrollContext = createContext(null);
const { Provider } = ScrollContext;

const ScrollProvider = ({ children }) => {
    const [triggerLoad, setTriggerLoad] = useState(false);

    const handleScroll = (event) => {
        event.preventDefault();
        const currentHeight = window.pageYOffset + document.documentElement.clientHeight;
        const maxHeight = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight );
        if (currentHeight > maxHeight - 800) {
            setTriggerLoad(true);
        } else {
            setTriggerLoad(false);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, false);

        return () => {
            window.removeEventListener("scroll", handleScroll);

        }
    })

    return <Provider value={{ triggerLoad, setTriggerLoad }}>{children}</Provider>
}

export { ScrollContext, ScrollProvider }