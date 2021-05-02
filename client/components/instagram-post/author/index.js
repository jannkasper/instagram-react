import React from "react";
import { FlexWrapper } from "../../flex-wrapper";
import Button from "../../button";
import Avatar from "../../avatar";
import { Info, Label } from "../../text";
import { More } from "../../icons";

const Author = ({ owner, location }) => {

    return (
        <FlexWrapper
            height="60px"
            padding="16px"
            alignItems="center"
            other={{ borderBottom: "1px solid #efefef" }}
        >
            <Avatar src={owner.userImageUrl} size={32} />
            <FlexWrapper
                flexDirection="column"
                margin="0 0 0 16px"
            >
                <Button href={`/${owner.username}`}>
                    <Label display="inline" verified={owner.isVerified} useHover>
                        {owner.username}
                    </Label>
                </Button>
                { location &&
                <Button href={`/explore/locations/${location.id}/${location.slug}`}>
                    <Info>
                        {location.name}
                    </Info>
                </Button>
                }
            </FlexWrapper>
            <div style={{ marginLeft: "auto "}}>
                <More />
            </div>
        </FlexWrapper>
    );
}

export default Author
