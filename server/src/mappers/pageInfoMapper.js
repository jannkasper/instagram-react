export function pageInfoToPageIntoDTO(pageInfo) {
    if (!pageInfo) {
        return null;
    }

    const pageInfoDTO = {
        hasNextPage: pageInfo.has_next_page,
        endCursor: pageInfo.end_cursor,
    }

    return pageInfoDTO;
}
