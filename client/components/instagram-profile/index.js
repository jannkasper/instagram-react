import React from "react";
import Wrapper from "../wrapper";
import {FlexItem, FlexWrapper} from "../flex-wrapper";
import Image from "../image";
import Button from "../button";
import {Info, Label} from "../text";
import { More, Triangle } from "../icons";
import { numFormatter, urlFormatter, bioFormatter, numCommaFormatter, mutualFollow } from "../../util/formatter";

const InstagramProfile = ({ userData }) => {

    return (
        <FlexWrapper margin="0 0 44px 0">
            <FlexItem flex="1 0 0" margin="0 30px 0 0">
                <Wrapper
                    height="170px"
                    width="170px"
                    padding="4px"
                    margin="auto"
                >
                    <Image
                        src={userData.userImageUrl}
                        size="170px"
                        border="5px solid white"
                        borderRadius="50%"
                    />
                </Wrapper>
            </FlexItem>
            <FlexWrapper flexDirection="column" flex="2 0 30px">
                <FlexWrapper margin="0 0 20px 0">
                    <Label size="28px" height="32px" weight="300" color="color: #262626" verified={userData.isVerified} iconSize="20px">
                        {userData.username}
                    </Label>
                    <Wrapper margin="0 0 0 20px">
                        <Button primary style={{padding: "0 24px"}}>Follow</Button>
                    </Wrapper>
                    <Wrapper margin="0 0 0 10px">
                        <Button primary style={{padding: "0 14px"}}><Triangle/></Button>
                    </Wrapper>
                    <Wrapper margin="auto 20px">
                        <More height={24} width={24} />
                    </Wrapper>
                </FlexWrapper>
                <FlexWrapper margin="0 0 20px 0">
                    <Wrapper margin="0 40px 0 0">
                        <Info size="16px" color="#262626"><b>{numCommaFormatter(userData.postCount)}</b> posts</Info>
                    </Wrapper>
                    <Wrapper margin="0 40px 0 0">
                        <Info size="16px" color="#262626"><b>{numFormatter(userData.followersCount)}</b> followers</Info>
                    </Wrapper>
                    <Wrapper margin="0 40px 0 0">
                        <Info size="16px" color="#262626"><b>{numFormatter(userData.followingsCount)}</b> following</Info>
                    </Wrapper>
                </FlexWrapper>
                <FlexWrapper flexDirection="column">
                    <Info size="16px" height="24" weight="600">{userData.name}</Info>
                    <Info size="16px" height="26">{bioFormatter(userData.bio)}</Info>
                    { userData.bioUrlName &&
                        <Button href={userData.bioUrl} target="_blank">
                            <Info size="16px" height="26" weight="600" color="#00376b">
                                {urlFormatter(userData.bioUrlName)}
                            </Info>
                        </Button>
                    }
                    { userData.mutualFollow && userData.mutualFollow.usernameArray && userData.mutualFollow.usernameArray.length &&
                        <Wrapper margin="14px 0 0 0" other={{ fontSize: "12px", lineHeight: "14px", color: "#8e8e8e"}}>
                            {mutualFollow(userData.mutualFollow)}
                        </Wrapper>
                    }
                </FlexWrapper>
            </FlexWrapper>
        </FlexWrapper>
    );
}

export default InstagramProfile