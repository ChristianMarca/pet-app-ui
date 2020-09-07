import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { IUserDataError } from '../../../services/user.api';
import { IUserData, IUserListPagination } from '../../../services/user.api';

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

    const newName = 'New name'

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

    const getUsersService = jest.fn(
        (): Promise<IUserListPagination> => {
            return Promise.resolve({
                pagination: {
                    pageNumber: 1,
                    pageSize: 4,
                    totalItems: 1,
                    pages: 1
                },
                users: [
                    {
                        username: username,
                        name: name,
                        lastName: lastName,
                        userId: userId,
                    }
                ]
            });
        },
    );

    const deleteUserByIdService = jest.fn(
        (): Promise<{[key: string]: any}> => {
            return Promise.resolve({ msg: 'deleted' });
        },
    );

    const logoutService = jest.fn(
        (): Promise<void> => {
            return Promise.resolve();
        },
    );

    const updateUserService = jest.fn(
        (): Promise<Pick<IUserData, any>> => {
            const resolveData: IUserData = {
                username: username,
                name: newName,
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
            getUsersService={getUsersService}
            deleteUserByIdService={deleteUserByIdService}
            logoutService={logoutService}
            updateUserService={updateUserService}
        />,
    );

    const usernameInputSearch = getByTestId('input.input');

    fireEvent.change(usernameInputSearch, { target: { value: username } });
    await act(async () => {
        await fireEvent.keyDown(usernameInputSearch, { key: 'Enter', code: 'Enter' });
    });

    expect(getUserByUserNameService).toHaveBeenCalledWith(username);
    expect(getUserByUserNameService).toHaveBeenCalledTimes(1);

    const usernameCardBody = getByTestId('update.user.form.username.input');
    const nameCardBody = getByTestId('update.user.form.name.input');
    const lastNameCardBody = getByTestId('update.user.form.lastName.input');

    expect(usernameCardBody.value).toEqual(username);
    expect(nameCardBody.value).toEqual(name);
    expect(lastNameCardBody.value).toEqual(lastName);
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

    const getUsersService = jest.fn(
        (): Promise<IUserDataError> => {
            return Promise.reject({ msg: 'Error endpoint' });
        },
    );

    const deleteUserByIdService = jest.fn(
        (): Promise<IUserDataError> => {
            return Promise.reject({ msg: 'Error endpoint' });
        },
    );

    const logoutService = jest.fn(
        (): Promise<void> => {
            return Promise.reject({ msg: 'Error endpoint' });
        },
    );

    const updateUserService = jest.fn(
        (): Promise<Pick<IUserData, any>> => {
            return Promise.reject({ msg: 'Error endpoint' });
        },
    );

    const { getByTestId } = render(
        <User
            redirect={() => undefined}
            loginService={loginService}
            getUserDataByUserIdService={getUserByUserNameService}
            getUsersService={getUsersService}
            deleteUserByIdService={deleteUserByIdService}
            logoutService={logoutService}
            updateUserService={updateUserService}
        />,
    );

    const usernameInputSearch = getByTestId('input.input');

    fireEvent.change(usernameInputSearch, { target: { value: username } });
    await act(async () => {
        await fireEvent.keyDown(usernameInputSearch, { key: 'Enter', code: 'Enter' });
    });

    expect(getUserByUserNameService).toHaveBeenCalledWith(username);
    expect(getUserByUserNameService).toHaveBeenCalledTimes(1);

    const usernameCardBody = getByTestId('update.user.form.username.input');
    const nameCardBody = getByTestId('update.user.form.name.input');
    const lastNameCardBody = getByTestId('update.user.form.lastName.input');

    expect(usernameCardBody).toBeEmpty();
    expect(nameCardBody).toHaveTextContent('');
    expect(lastNameCardBody).toHaveTextContent('');
});
