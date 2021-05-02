import React from "react";
import Wrapper from "../../wrapper";
import ButtonGroup from "../../button-group";
import { Info, Label } from "../../text";
import { Activity, ActivityActive, Comment, CommentActive, Message, MessageActive, Save } from "../../icons";
import { dateFormatter, numCommaFormatter } from "../../../util/formatter";

import styles from "./feed-item-actions.module.css"

const FeedItemActions = ({ likes, createdAt, viewerHasLiked, viewerHasSaved }) => {

    return (
        <Wrapper
            padding="6px 0"
            other={{borderTop: "1px solid #efefef"}}
        >
            <ButtonGroup
                buttons={["Activity", "Comment", "Message", "Save" ]}
                icons={[<Activity width={24} height={24}/>, <Comment width={24} height={24}/>, <Message width={24} height={24}/>, <Save width={24} height={24} />]}
                activeIcons={[<ActivityActive width={24} height={24}/>, <CommentActive width={24} height={24}/>, <MessageActive width={24} height={24}/>, <Save width={24} height={24} />]}
                buttonStyle={{ margin: "0.1rem", size: 24 }}
                groupStyle={{ padding: "0 0.5rem 0 0.5rem" }}
                lastStyle={{marginLeft: "auto"}}
                />
            <div className={styles.infoGroup}>
                <Label>{numCommaFormatter(likes.count)} likes</Label>
                { createdAt && <Info size={10} color="#8e8e8e">{dateFormatter(createdAt)}</Info> }
            </div>
        </Wrapper>
    );
}

export default FeedItemActions
