export function pageInfoToPageIntoDTO(pageInfo) {
    const pageInfoDTO = {
        hasNextPage: pageInfo.has_next_page,
        endCursor: pageInfo.end_cursor,
    }

    return pageInfoDTO;
}
