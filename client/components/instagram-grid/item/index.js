import React from "react";
import Wrapper from "../../wrapper";
import { FlexWrapper } from "../../flex-wrapper";
import Image from "../../image";
import Button from "../../button";
import {ActivityActive, CommentActive, DynamicIcon} from "../../icons";
import {Info} from "../../text";
import { numFormatter } from "../../../util/formatter";

const ItemGallery = ({ mediaData }) => {

    const AdditionalIcon = () => {
        if (mediaData.isVideo || mediaData.isSidecar) {
            const mediaType = mediaData.isVideo ? "video" : (mediaData.isSidecar ? "sidecar" : "");
            return (
                <FlexWrapper
                    position="absolute"
                    justifyContent="flex-end"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                >
                    <DynamicIcon type={mediaType} size="32px" justifyContent="none" alignItems="none" />
                </FlexWrapper>
            )
        }
    }

    return (
        <Button href={`/p/${mediaData.postId}`}>
            <Wrapper>
                <Image size="293px" display="inline" src={mediaData.thumbnailSrc || mediaData.thumbnailArray[1].src} />
                { AdditionalIcon() }

                <FlexWrapper
                    hover={true}
                    background="rgba(0,0,0,0.3)"
                    position="absolute"
                    justifyContent="center"
                    alignItems="center"
                    height="293px"
                    width="293px"
                    top="0"
                    left="0"
                >
                    <FlexWrapper display="inline-flex" padding="15px">
                        <ActivityActive fill={"white"} style={{marginRight: "10px"}} />
                        <Info size="16px" weight="600" color="#fff">{numFormatter(mediaData.likeCount)}</Info>
                    </FlexWrapper>
                    <FlexWrapper display="inline-flex" padding="15px">
                        <CommentActive fill={"white"} style={{marginRight: "10px"}} />
                        <Info size="16px" weight="600" color="#fff">{numFormatter(mediaData.commentCount)}</Info>
                    </FlexWrapper>
                </FlexWrapper>
            </Wrapper>
        </Button>
    )
}

export default ItemGallery