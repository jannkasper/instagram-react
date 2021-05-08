import React from 'react'
import { render } from '@testing-library/react';
import InstagramProfile from "../../components/instagram-profile";

describe('<InstagramProfile /> component', () => {

    test('Shown profile', () => {
        const userData = {
            userImageUrl: 'https://fakeimg.pl/300/',
            username: 'USERNAME',
            postCount: 1000,
            followersCount: 2000,
            followingsCount: 3000,
            name: 'NAME',
            bio: 'BIO',
        }
        const screen = render(<InstagramProfile userData={userData}/>);

        const usernameText = screen.getByText(userData.username);
        expect(usernameText).toBeInTheDocument();

        const postText = screen.getByText("1,000");
        expect(postText).toBeInTheDocument();

        const followersText = screen.getByText("2.0k");
        expect(followersText).toBeInTheDocument();

        const followingsText = screen.getByText("3.0k");
        expect(followingsText).toBeInTheDocument();

        const nameText = screen.getByText(userData.name);
        expect(nameText).toBeInTheDocument();

        const bioText = screen.getByText(userData.bio);
        expect(bioText).toBeInTheDocument();

    });
})
