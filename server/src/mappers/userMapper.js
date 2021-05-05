export function userToUserDTO(user) {
    if (!user) {
        return null;
    }

    return {
        id: user.id,
        username: user.username,
        name: user.full_name,
        userImageUrl: user.profile_pic_url,

        bio: user.biography,
        bioUrl: user.external_url_linkshimmed,
        bioUrlName: user.external_url,

        postCount: user.edge_owner_to_timeline_media?.count,
        followersCount: user.edge_followed_by?.count,
        followingsCount: user.edge_follow?.count,

        isVerified: Boolean(user.is_verified),
        isPrivate: Boolean(user.is_private),
        hasClips: Boolean(user.has_clips),
        hasStories: Boolean(user.highlight_reel_count),

        mutualFollow: user.edge_mutual_followed_by && {
            count: user.edge_mutual_followed_by.count,
            usernameArray: user.edge_mutual_followed_by.edges.map(element => element.node.username)
        }
    };
}

export function loggedToLoggedDTO(instagramLogged) {
    if (!instagramLogged) {
        return null;
    }

    const loggedDTO = {
        id: instagramLogged.id,
        username: instagramLogged.username,
        userImageUrl: instagramLogged.profile_pic_url,
    };

    return loggedDTO;
}
