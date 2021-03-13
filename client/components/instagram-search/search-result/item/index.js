import React from "react";
import Avatar from "../../../avatar";
import Button from "../../../button";
import { FlexWrapper } from "../../../flex-wrapper";
import { DynamicIcon } from "../../../icons";
import { Label, Info } from "../../../Text";
import { numCommaFormatter } from "../../../../util/formatter";

import styles from "./item.module.css";

const Item = ({ item }) => {
    let determinedHref, determinedImage;

    if (item.user) {
        determinedHref = `/${item.username}`;
        determinedImage = <Avatar src={item.imageUrl} size={44} border={50} />;
    } else if (item.hashtag) {
        determinedHref = `/explore/tags/${item.name}`;
        item.description = numCommaFormatter(item.postCount) + " posts";
        item.name = "#" + item.name;
        determinedImage = <Avatar src={item.imageUrl} size={44} border={50} />;
    } else if (item.place) {
        determinedHref = `/explore/locations/${item.id}/${item.slug}`;
        determinedImage = <DynamicIcon type="location" size={44} border />;
    }

    return (
        <FlexWrapper
            className={styles.container}
            flexDirection="column"
            other={{ cursor: "pointer" }}
        >
            <Button href={ determinedHref }>
                <FlexWrapper padding="8px 16px">
                    { determinedImage }
                    <FlexWrapper
                        flexDirection="column"
                        justifyContent="center"
                        flex="1 1 auto"
                        margin="0 0 0 12px"
                    >
                        <Label verified={item.isVerified}>
                            { item.name }
                        </Label>
                        <Info size={14} color="#8e8e8e">
                            { item.description }
                        </Info>
                    </FlexWrapper>
                </FlexWrapper>
            </Button>
        </FlexWrapper>
    )
}

export default Item