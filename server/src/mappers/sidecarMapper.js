export function sidecarCollectionToSidecarCollectionDTO(instagramSidecarCollection) {
    if (!instagramSidecarCollection) {
        return  null;
    }

    const sidecarCollectionDTO = [];

    for (let edge of instagramSidecarCollection.edges) {
        const sidecarDTO = sidecarToSidecarDTO(edge.node);
        sidecarCollectionDTO.push(sidecarDTO);
    }

    return sidecarCollectionDTO;
}

function sidecarToSidecarDTO(sidecar) {
    const sidecarDTO = {
        id: sidecar.id,
        shortcode: sidecar.shortcode,
        isVideo: sidecar.is_video,
        resourceArray: sidecar.display_resources,
    }

    return sidecarDTO;
}
