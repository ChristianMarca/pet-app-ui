import { render } from '@testing-library/react';
import UserItem from "../user.item";
import React from 'react';

afterEach(() => {
    jest.resetAllMocks();
});

test('Show user card', async () => {
    const userData = {
        username: 'Fake',
        name: 'Fake name',
        lastName: 'Fake Last name',
    }
    const { getByTestId } = render(<UserItem user={userData} />);
    const usernameDiv = getByTestId('user.view.username');
    const nameDiv = getByTestId('user.view.name');
    const lastNameDiv = getByTestId('user.view.lastName');

    expect(usernameDiv).toHaveTextContent(userData.username);
    expect(nameDiv).toHaveTextContent(userData.name);
    expect(lastNameDiv).toHaveTextContent(userData.lastName);
});
