export function locationToLocationDTO(instagramLocation) {
    const locationDTO =  {
        id: instagramLocation.id,
        locationName: instagramLocation.name,
        lat: instagramLocation.lat,
        lng: instagramLocation.lng,
        addressJson: instagramLocation.address_json,
        locationImageUrl: instagramLocation.profile_pic_url,
        postCount: instagramLocation.edge_location_to_media.count,
    };

    return locationDTO;
}
