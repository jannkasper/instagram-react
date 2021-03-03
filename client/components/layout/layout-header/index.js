import React,  { useState } from "react";
import Search from "../../search";
import ButtonGroup from "../../button-group";
import {Activity, ActivityActive, Explore, ExploreActive, Home, HomeActive, Message, MessageActive} from "../../icons";
import Avatar from "../../avatar";

import styles from "./layout-header.module.css";
import Button from "../../button";

const Header = () => {
    const [mode, setMode] = useState("Home")

    return (
        <header className={styles.container}>
            <div className={styles.centered}>
                <Button href="/" style={{ flex: "1 9999 0" }}>
                    <img className={styles.logo} src="../../../static/images/logo.png" />
                </Button>
                <Search />
                <div style={{ flex: "1 0 0" }}>
                    <ButtonGroup
                        buttons={["Home", "Message", "Explore", "Activity", "Profile"]}
                        icons={[<Home/>, <Message/>, <Explore/>, <Activity/>, <Avatar/>]}
                        activeIcons={[<HomeActive/>, <MessageActive/>, <ExploreActive/>, <ActivityActive/>, <Avatar/>]}
                        buttonStyle={{ marginLeft: "10px" }}
                        groupStyle={{ justifyContent: "flex-end" }}
                        selected={mode}
                        setSelected={setMode}
                    />
                </div>
            </div>
        </header>
    )
}

export default Header