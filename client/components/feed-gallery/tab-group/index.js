import React, { useState } from "react";
import Tab from "../tab";
import {Posts, Reels, Tagged, Tv} from "../../icons";

import styles from "./tab-group.module.css";

const TabGroup = ({ setCurrentFeed }) => {
    const [selected, setSelected] = useState("timelineMedia");

    const handleSelect = (keyName) => {
        setCurrentFeed(keyName);
        setSelected(keyName);
    }

    return (
        <div className={styles.container}>
            <Tab keyName='timelineMedia' title='Posts' icon={<Posts/>} handleSelect={handleSelect} isSelected={'timelineMedia' === selected} />
            {/*<Tab keyName='reels' title='Reels' icon={<Reels/>} handleSelect={handleSelect} isSelected={'reels' === selected} />*/}
            {/*<Tab title='IgTv' icon={<Tv/>} handleSelect={handleSelect} isSelected={'IgTv' === selected}/>*/}
            <Tab keyName='tagged' title='Tagged' icon={<Tagged/>} handleSelect={handleSelect} isSelected={'tagged' === selected}/>
        </div>
    )
}

export default TabGroup