import React from 'react'
import { render } from '@testing-library/react'
import InstagramSearch from "../components/instagram-search";

describe('<InstagramSearch /> component test', () => {
    let app;

    beforeEach(() => {
        app = (
            <InstagramSearch />
        );
    });

    test('renders search input', () => {
        const screen = render(app);
        const inputSearch = screen.getByPlaceholderText("Search");
        expect(inputSearch).toBeInTheDocument()
    })
})
