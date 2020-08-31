import { IUserData, loginUser } from '../../../services/user.api';
import { fireEvent, render } from '@testing-library/react';
import Login from '../login';
import { act } from 'react-dom/test-utils';
import React from 'react';

afterEach(() => {
    jest.resetAllMocks();
});

test('Login a user', async () => {
    const username = 'Fake username';
    const name = 'Fake name';
    const lastName = 'Fake last name';
    const email = 'cmarca@test.com';
    const password = 'test_123';
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

    const { getByTestId } = render(<Login redirect={() => undefined} loginService={loginService} />);

    const inputTagEmail = getByTestId('login.user.form.email.input');
    const inputTagPassword = getByTestId('login.user.form.password.input');
    const buttonTag = getByTestId('login.user.button');

    fireEvent.change(inputTagEmail, { target: { value: email } });
    fireEvent.change(inputTagPassword, { target: { value: password } });

    await act(async () => {
        await fireEvent.submit(buttonTag);
    });

    expect(loginService).toHaveBeenCalledWith(email, password);
    expect(loginService).toHaveBeenCalledTimes(2);
});
