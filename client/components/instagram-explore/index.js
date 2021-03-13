import React from "react";
import Wrapper from "../wrapper";
import { FlexWrapper } from "../flex-wrapper";
import Image from "../image";
import { numCommaFormatter } from "../../util/formatter";
import { Info, Label } from "../text";

import styles from "./instagram-explore.module.css";

const InstagramExplore = ({ isTag, postCount, name, imageUrl }) => {

    return (
        <FlexWrapper
            alignItems="center"
            margin="0 0 44px 0"
        >
            <Wrapper width="170px" height="170px">
                <Image
                    src={imageUrl}
                    position="absolute"
                    size="152px"
                    top="9px"
                    left="9px"
                    border="1px solid rgba(0,0,0,.0975)"
                    borderRadius="50%"
                />
            </Wrapper>
            <Wrapper margin=" 0 0 0 50px">
                <Label size="28px" weight="300" height="32px" color="#262626">{isTag? '#' : ''}{name}</Label>
                { isTag &&
                    <>
                        <Wrapper margin="10px 0 28px 0">
                            <Info size="16px" color=" #262626"><b>{numCommaFormatter(postCount)}</b> posts</Info>
                        </Wrapper>
                        <button className={styles.buttonFollow}>Follow</button>
                    </>
                }
            </Wrapper>
        </FlexWrapper>
    )
}

export default InstagramExplore