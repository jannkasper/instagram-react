import React from "react";
import Wrapper from "../wrapper";
import { FlexWrapper } from "../flex-wrapper";
import Picture from "./picture";
import Author from "./author";
import Comments from "./comments";
import Actions from "./actions";
import AddComment from "./add-comment";

const InstagramPost = ({ post }) => {

    return (
        <FlexWrapper
            justifyContent="center"
            margin="0 0 48px 0"
        >
            <Wrapper
                height="598px"
                maxWidth="598px"
            >
                <Picture
                    resourceArray={post.resourceArray}
                    isVideo={post.isVideo}
                    videoUrl={post.videoUrl}
                    isSidecar={post.isSidecar}
                    sidecarArray={post.sidecarArray}
                />
            </Wrapper>

            <FlexWrapper
                flexDirection="column"
                width="335px"
                height="598px"
                border="1px solid #efefef"
                background="white"
            >
                <Author
                    owner={post.owner}
                    location={post.location}
                />
                <Comments
                    shortcode={post.shortcode}
                    initialCommentsData={post.commentsData}
                    owner={post.owner}
                    text={post.description}
                    createdAt={post.createdAt}
                />
                <Actions
                    likes={post.likes}
                    createdAt={post.createdAt}
                    viewerHasLiked={post.viewerHasLiked}
                    viewerHasSaved={post.viewerHasSaved}
                />
                <AddComment />
            </FlexWrapper>
        </FlexWrapper>
    );
}

export default InstagramPost