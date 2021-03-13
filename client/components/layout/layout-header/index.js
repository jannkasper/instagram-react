import React,  { useState } from "react";
import InstagramSearch from "../../instagram-search";
import Avatar from "../../avatar";
import Button from "../../button";
import ButtonGroup from "../../button-group";
import { FlexWrapper, FlexItem } from "../../flex-wrapper";
import {Activity, ActivityActive, Explore, ExploreActive, Home, HomeActive, Message, MessageActive} from "../../icons";

import styles from "./layout-header.module.css";

const Header = () => {
    const [mode, setMode] = useState("Home")

    return (
        <FlexWrapper
            alignItems="center"
            maxWidth="975px"
            width="100%"
            height="100%"
            padding="0 20px 0 20px"
        >
            <FlexItem flex="1 9999 0">
                <Button href="/">
                    <img className={styles.logo} src="../../../static/images/logo.png" />
                </Button>
            </FlexItem>

            <FlexItem>
                <InstagramSearch />
            </FlexItem>

            <FlexItem flex="1 0 0">
                <FlexWrapper justifyContent="flex-end">
                    <ButtonGroup
                        buttons={["Home", "Message", "Explore", "Activity", "Profile"]}
                        icons={[<Home/>, <Message/>, <Explore/>, <Activity/>, <Avatar/>]}
                        activeIcons={[<HomeActive/>, <MessageActive/>, <ExploreActive/>, <ActivityActive/>, <Avatar/>]}
                        buttonStyle={{ marginLeft: "10px" }}
                        selected={mode}
                        setSelected={setMode}
                    />
                </FlexWrapper>
            </FlexItem>

        </FlexWrapper>
    )
}

export default Header