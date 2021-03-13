import React from "react";
import { FlexWrapper } from "../flex-wrapper";
import Wrapper from "../wrapper";
import {Info, Label} from "../text";

const ContentPrivate = () => {

    return (
        <FlexWrapper
            justifyContent="center"
            padding="40px"
            border="1px solid #efefef"
            borderRadius="3px"
            background="#fff"
            other={{ borderTop: "1px solid #dbdbdb", textAlign: "center" }}
        >
            <Wrapper maxWidth="230px">
                <Wrapper margin="0 0 13px 0">
                    <Label size="14px" color="#262626">This Account is Private</Label>
                </Wrapper>
                <Info size="14px" color="#262626">Follow to see their photos and videos.</Info>
            </Wrapper>
        </FlexWrapper>
    );
}

export default ContentPrivate