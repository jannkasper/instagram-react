export function storyCollectionToStoryCollectionDTO(instagramStoryCollection) {
    const storyCollectionDTO = [];

    for (let edge of instagramStoryCollection.edges) {
        const storyDTO = storyToStoryDTO(edge.node);
        storyCollectionDTO.push(storyDTO);
    }

    return storyCollectionDTO
}

function storyToStoryDTO(story) {
    const storyDTO = {
        id: story.id,
        title: story.title,
        thumbnailSrc:  story.cover_media_cropped_thumbnail.url,
        owner: {
            id: story.owner.id,
            username: story.owner.username,
            userImageUrl: story.owner.profile_pic_url,
            isVerified: story.owner.is_verified,
        },
    }

    return storyDTO;
}
