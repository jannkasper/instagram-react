import React from "react";
import Author from "../instagram-post/author";
import Picture from "../instagram-post/picture";
import Actions from "../instagram-post/actions";
import Comment from "../comment";
import AddComment from "../instagram-post/add-comment";
import Wrapper from "../wrapper";
import { FlexWrapper } from "../flex-wrapper";
import Button from "../button";
import {Info} from "../text";
import { dateFormatter, numCommaFormatter } from "../../util/formatter";

const Post = ({ post }) => {

    return (
        <Wrapper
            width="100%"
            maxWidth="614px"
            margin="0 0 60px 0"
            other={{ border: "1px solid #dbdbdb", borderRadius: "3px", backgroundColor: "#fff"}}
        >
            <Author owner={post.owner} location={post.location} />
            <Picture
                resourceArray={post.resourceArray}
                isVideo={post.isVideo} videoUrl={post.videoUrl}
                isSidecar={post.isSidecar}
                sidecarArray={post.sidecarArray}
            />
            <Actions
                likes={post.likes}
                viewerHasLiked={post.viewerHasLiked}
                viewerHasSaved={post.viewerHasSaved}
            />
            <Comment feedDescription owner={post.owner} text={post.description} />
            <FlexWrapper margin="0 0 0 1rem">
                <Button href={`/p/${post.shortcode}`}>
                    <Info size="14px" height="22px" color="#9a9a9a">
                        View all {numCommaFormatter(post.commentsData.count)} comments
                    </Info>
                </Button >
            </FlexWrapper>

            { post.commentsData.commentsArray.map((el, index) => <Comment key={index} {...el} />) }
            <Wrapper margin="0 0 0 1rem">
                <Info size="10px" height="22px" color="#9a9a9a">{dateFormatter(post.createdAt)}</Info>
            </Wrapper>
            <AddComment/>
        </Wrapper>
    );
}

export default Post