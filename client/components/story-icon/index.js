import React from "react";
import Wrapper from "../wrapper";
import Image from "../image";
import { Label } from "../text";

const StoryIcon = ({ content }) => {

    return (
        <Wrapper
            display="inline-block"
            width="125px"
            padding="10px 15px"
        >
            <Wrapper
                margin="4px auto 8px auto"
                padding="1px"
                height="87px"
                width="87px"
                background="#e0e0e0"
            >
                <Image
                    src={content.thumbnailSrc}
                    size="100%"
                    border="3px solid white"
                    borderRadius="50%"
                />
            </Wrapper>
            <Wrapper width="100%">
                <Label
                    size="14px"
                    height="14px"
                    textAlign="center"
                    additionalStyle={{
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden"
                    }}
                >
                    {content.title}
                </Label>
            </Wrapper>

        </Wrapper>
    )
}

export default StoryIcon