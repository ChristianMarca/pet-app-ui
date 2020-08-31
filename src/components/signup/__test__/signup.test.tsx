import { createUser, getUserByUserName, IUserData, loginUser } from '../../../services/user.api';
import { fireEvent, render } from '@testing-library/react';
import SignUp from '../signup';
import { act } from 'react-dom/test-utils';
import React from 'react';
import { buildUser } from '../../user/__test__/user.test';

jest.mock('../../../services/user.api');

afterEach(() => {
    jest.resetAllMocks();
});

test('Create a new user', async () => {
    const username = 'Fake username';
    const name = 'Fake name';
    const lastName = 'Fake last name';
    const email = 'cmarca@test.com';
    const password = 'Test_123';
    const userId = '1';
    window.alert = jest.fn();
    const createUserService = jest.fn(
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

    const { getByTestId } = render(<SignUp redirect={() => undefined} createUserService={createUserService} />);

    const inputTagName = getByTestId('create.user.form.name.input');
    const inputTagLastName = getByTestId('create.user.form.lastName.input');
    const inputTagUsername = getByTestId('create.user.form.username.input');
    const inputTagEmail = getByTestId('create.user.form.email.input');
    const inputTagPassword = getByTestId('create.user.form.password.input');
    const buttonTag = getByTestId('create.user.form.submit.button');

    fireEvent.change(inputTagUsername, { target: { value: username } });
    fireEvent.change(inputTagName, { target: { value: name } });
    fireEvent.change(inputTagLastName, { target: { value: lastName } });
    fireEvent.change(inputTagEmail, { target: { value: email } });
    fireEvent.change(inputTagPassword, { target: { value: password } });

    await act(async () => {
        await fireEvent.click(buttonTag);
    });

    expect(createUserService).toHaveBeenCalledWith({ username, name, lastName, email, password });
    expect(createUserService).toHaveBeenCalledTimes(1);
});
