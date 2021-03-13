import React, { useState, useEffect } from "react";
import Wrapper from "../wrapper";
import ScrollWrapper from "../scroll-wrapper";
import StoryIcon from "../story-icon";
import {fetchState} from "../../util/context";


const InstagramStories = ({ username, userId }) => {
    const [dataState, setDataState] = useState(null);

    useEffect(() => {
        fetchState(setDataState,`/users/${username}/stories`, { userId: userId })
    }, [username])

    return (
        <Wrapper height="130px" width="100%" margin="0 0 44px 0">
            <ScrollWrapper
                flexDirection="row"
                height="100%"
                width="100%"
                contentPadding="0 20px"
                overflowX="scroll"
                overflowY="hidden"
                hideScrollbar={true}
            >
                { dataState && dataState.map((el, index) => <StoryIcon key={index} content={el} />)}
            </ScrollWrapper>
        </Wrapper>
    );
}

export default InstagramStories