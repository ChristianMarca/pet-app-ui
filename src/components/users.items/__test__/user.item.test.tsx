import {fireEvent, render, waitForElement, waitForElementToBeRemoved} from '@testing-library/react';
import UserItem from '../user.item';
import React from 'react';
import { IUserRelationship } from '../../../services/user.api';

afterEach(() => {
    jest.resetAllMocks();
});

test('Show user card', async () => {
    const userData = {
        username: 'Fake',
        name: 'Fake name',
        lastName: 'Fake Last name',
    };

    const createUserRelationshipService = jest.fn(
        (): Promise<IUserRelationship> => {
            const resolveData: IUserRelationship = {
                linkId: 1,
                userId: 1,
                followedUserId: 2,
            };
            return Promise.resolve(resolveData);
        },
    );

    const removeUserRelationshipService = jest.fn(
        (): Promise<{ [key: string]: any }> => {
            return Promise.resolve({ msg: 'deleted' });
        },
    );

    const onUpdate = jest.fn();

    const { getByTestId } = render(
        <UserItem
            user={userData}
            createUserRelationshipService={createUserRelationshipService}
            removeUserRelationshipService={removeUserRelationshipService}
            currentUserLogged={1}
         onUpdate={onUpdate}/>,
    );
    const usernameDiv = getByTestId('user.view.username');
    const nameDiv = getByTestId('user.view.name');
    const lastNameDiv = getByTestId('user.view.lastName');

    expect(usernameDiv).toHaveTextContent(userData.username);
    expect(nameDiv).toHaveTextContent(userData.name);
    expect(lastNameDiv).toHaveTextContent(userData.lastName);

    await waitForElement(() => getByTestId('button.follow.user'));
    fireEvent.click(getByTestId('button.follow.user'));
    await waitForElementToBeRemoved(() => getByTestId('button.follow.user'));
    await waitForElement(() => getByTestId('button.unfollow.user'));
});
