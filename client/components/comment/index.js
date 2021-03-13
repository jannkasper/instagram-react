import React, { useState } from "react";
import { FlexItem, FlexWrapper } from "../flex-wrapper";
import Button from "../button";
import { Like } from "../icons";
import { Info, Label } from "../text";
import { hashtagFormatter } from "../../util/formatter";

const Comment = ({ feedDescription, owner, text }) => {
    const [showMore, setShowMore] = useState(false);

    const commentText = (!showMore && text.length > 120) ? text.slice(0, text.lastIndexOf(" ",120)) : text;

    return (
        <FlexWrapper margin="4px 1rem 4px 1rem">
            <FlexItem
                flex="1 1 auto"
                other={{ paddingRight: "5px", wordBreak: "break-word", fontSize: "14px", lineHeight: "18px"}}
            >
                <Button href={`/${owner.username}`}>
                    <Label useHover>
                        {owner.username}
                    </Label>
                </Button>
                { hashtagFormatter(commentText) }
                { (!showMore && text.length > 120) ?
                    <>...
                        <Button onClick={() => setShowMore(true)}>
                            <Info size="14px" color="#9a9a9a">
                                more
                            </Info>
                        </Button>
                    </> : null
                }
            </FlexItem>
            { feedDescription ? null :
                <div>
                    <Like/>
                </div>
            }
        </FlexWrapper>
    );
}

export default Comment