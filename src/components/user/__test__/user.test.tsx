import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { IUserDataError } from '../../../services/user.api';
import { IUserData } from '../../../services/user.api';

import User from '../user';
import { act } from 'react-dom/test-utils';

afterEach(() => {
    jest.resetAllMocks();
});

export function buildUser(overrides: IUserData) {
    return {
        username: 'FAKE_USER_NAME',
        name: 'FAKE_NAME',
        lastName: 'FAKE_LAST_NAME',
        ...overrides,
    };
}

test('Search user data and fill the component', async () => {
    const username = 'Fake username';
    const name = 'Fake name';
    const lastName = 'Fake last name';
    const userId = '1';

    const loginService = jest.fn(
        (): Promise<IUserData> => {
            const resolveData: IUserData = {
                username: username,
                name: name,
                lastName: lastName,
                userId: userId,
            };
            return Promise.resolve(resolveData);
        },
    );

    const getUserByUserNameService = jest.fn(
        (): Promise<IUserData> => {
            const resolveData: IUserData = {
                username: username,
                name: name,
                lastName: lastName,
                userId: userId,
            };
            return Promise.resolve(resolveData);
        },
    );

    const { getByTestId } = render(
        <User
            redirect={() => undefined}
            loginService={loginService}
            getUserDataByUserIdService={getUserByUserNameService}
        />,
    );

    const usernameInputSearch = getByTestId('input.input');

    fireEvent.change(usernameInputSearch, { target: { value: username } });
    await act(async () => {
        await fireEvent.keyDown(usernameInputSearch, { key: 'Enter', code: 'Enter' });
    });

    expect(getUserByUserNameService).toHaveBeenCalledWith(username);
    expect(getUserByUserNameService).toHaveBeenCalledTimes(1);

    const usernameCardTitle = getByTestId('card.title');
    const nameCardBody = getByTestId('user.card.body.name');
    const lastNameCardBody = getByTestId('user.card.body.lastName');

    expect(usernameCardTitle).toHaveTextContent(username);
    expect(nameCardBody).toHaveTextContent(new RegExp(name, 'g'));
    expect(lastNameCardBody).toHaveTextContent(new RegExp(lastName, 'g'));
});

test('Search user data fail', async () => {
    const username = 'Fake username';
    const name = 'Fake name';
    const lastName = 'Fake last name';
    const userId = '1';

    const loginService = jest.fn(
        (): Promise<IUserData> => {
            const resolveData: IUserData = {
                username: username,
                name: name,
                lastName: lastName,
                userId: userId,
            };
            return Promise.resolve(resolveData);
        },
    );

    const getUserByUserNameService = jest.fn(
        (): Promise<IUserDataError> => {
            return Promise.reject({ msg: 'Error endpoint' });
        },
    );

    const { getByTestId } = render(
        <User
            redirect={() => undefined}
            loginService={loginService}
            getUserDataByUserIdService={getUserByUserNameService}
        />,
    );

    const usernameInputSearch = getByTestId('input.input');

    fireEvent.change(usernameInputSearch, { target: { value: username } });
    await act(async () => {
        await fireEvent.keyDown(usernameInputSearch, { key: 'Enter', code: 'Enter' });
    });

    expect(getUserByUserNameService).toHaveBeenCalledWith(username);
    expect(getUserByUserNameService).toHaveBeenCalledTimes(1);

    const usernameCardTitle = getByTestId('card.title');
    const nameCardBody = getByTestId('user.card.body.name');
    const lastNameCardBody = getByTestId('user.card.body.lastName');

    expect(usernameCardTitle).toBeEmpty();
    expect(nameCardBody).toHaveTextContent('Name:');
    expect(lastNameCardBody).toHaveTextContent('Last Name:');
});
