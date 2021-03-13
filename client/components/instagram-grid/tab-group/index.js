import React, { useState } from "react";
import Tab from "../tab";
import {Posts, Reels, Tagged, Tv} from "../../icons";
import {FlexWrapper} from "../../flex-wrapper";

const TabGroup = ({ setCurrentFeed }) => {
    const [selected, setSelected] = useState("timelineMedia");

    const handleSelect = (keyName) => {
        setCurrentFeed(keyName);
        setSelected(keyName);
    }

    return (
        <FlexWrapper
            justifyContent="center"
            alignItems="center"
            other={{borderTop: "1px solid #dbdbdb"}}
        >
            <Tab keyName='timelineMedia' title='Posts' icon={<Posts/>} handleSelect={handleSelect}
                 isSelected={'timelineMedia' === selected}/>
            {/*<Tab keyName='reels' title='Reels' icon={<Reels/>} handleSelect={handleSelect} isSelected={'reels' === selected} />*/}
            {/*<Tab title='IgTv' icon={<Tv/>} handleSelect={handleSelect} isSelected={'IgTv' === selected}/>*/}
            <Tab keyName='tagged' title='Tagged' icon={<Tagged/>} handleSelect={handleSelect}
                 isSelected={'tagged' === selected}/>
        </FlexWrapper>
    )
}

export default TabGroup