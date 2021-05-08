import React from 'react'
import { render } from '@testing-library/react';
import InstagramExplore from "../../components/instagram-explore";

describe('<InstagramExplore /> component', () => {

    test('Shown hashtag', () => {
        const screen = render(<InstagramExplore isTag={true} postCount={1000} name="TEST" imageUrl="https://fakeimg.pl/300/" />);

        const postText = screen.getByText("#TEST");
        expect(postText).toBeInTheDocument();

        const followersText = screen.getByText("1,000");
        expect(followersText).toBeInTheDocument();
    });
})
