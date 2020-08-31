import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Card from '../card';

test('Input component behavior', async () => {
    const title = 'Card Title';
    const body = 'Card Body';
    const footer = 'Card Footer';

    const { getByTestId } = render(<Card title={title} body={body} footer={footer} />);
    const cardTitle = getByTestId('card.title');
    const cardBody = getByTestId('card.body');
    const cardFooter = getByTestId('card.footer');

    expect(cardTitle).toHaveTextContent(title);
    expect(cardBody).toHaveTextContent(body);
    expect(cardFooter).toHaveTextContent(footer);
});
