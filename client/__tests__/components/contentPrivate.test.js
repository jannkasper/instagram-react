import React from 'react'
import { render } from '@testing-library/react';
import ContentPrivate from "../../components/private";

describe('<ContentPrivate /> component', () => {

    test('Shown text', () => {
        const screen = render(<ContentPrivate/>);

        const titleText = screen.getByText("This Account is Private");
        expect(titleText).toBeInTheDocument()

        const descriptionText = screen.getByText("Follow to see their photos and videos.");
        expect(descriptionText).toBeInTheDocument()
    });
})
