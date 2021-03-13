export { default as Activity } from "./ActivityIcon";
export { default as ActivityActive } from "./ActivityIconActive";
export { default as Comment } from "./CommentIcon";
export { default as CommentActive } from "./CommentIconActive";
export { default as Explore } from "./ExploreIcon";
export { default as ExploreActive } from "./ExploreIconActive";
export { default as Home } from "./HomeIcon";
export { default as HomeActive } from "./HomeIconActive";
export { default as Message } from "./MessageIcon";
export { default as MessageActive } from "./MessageIconActive";
export { default as More } from "./MoreIcon";
export { default as Save } from "./SaveIcon";
export { default as Search } from "./SearchIcon";
export { default as Emoji } from "./EmojiIcon";
export { default as Like } from "./LikeIcon";
export { default as Instagram } from "./InstagramIcon";
export { default as Verified } from "./VerifiedIcon";
export { default as Camera } from "./CameraIcon";
export { default as Posts } from "./PostsIcon";
export { default as Tagged } from "./TaggedIcon";
export { default as Location } from "./LocationIcon";
export { default as Muted } from "./MutedIcon";
export { default as Sound } from "./SoundIcon";
export { default as Tv } from "./TvIcon";
export { default as Reels } from "./ReelsIcon";
export { default as Triangle } from "./TriangleIcon";

const dynamicIcons = {
    location: { backgroundImage: "url('../../static/images/icons3.png')", backgroundPosition: "-465px -180px"},
    plus: { backgroundImage: "url('../../static/images/icons3.png')", backgroundPosition: "-440px -234px"},
    previous: { backgroundImage: "url('../../static/images/icons2.png')", backgroundPosition: "-130px -98px"},
    next: { backgroundImage: "url('../../static/images/icons2.png')", backgroundPosition: "-162px -98px"},
    sidecar: { backgroundImage: "url('../../static/images/icons.png')" },
    video: { backgroundImage: "url('../../static/images/icons.png')", backgroundPosition: "0 -34px"},

}
export function DynamicIcon ({
    type,
    size,
    iconSize,
    border,
    justifyContent,
    alignItems
}) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: justifyContent || "center",
                alignItems: alignItems || "center",
                height: size || 44,
                width: size || 44,
                borderRadius: border && 50,
                border: border && "1px solid rgba(0,0,0,.0975)"
            }}
        >
            <span
                style={{
                    ...dynamicIcons[type],
                    display: "block",
                    height: iconSize || 26,
                    width: iconSize || 26
                }}
            />
        </div>
    );
}