import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CreateUserForm from '../createUser.form';
import { IUserData } from '../../../services/user.api';

afterEach(() => {
    jest.resetAllMocks();
});

test('Create user form', async () => {
    const fakeUserData = {
        name: 'Fake name',
        lastName: 'Fake last name',
        username: 'Fake user name',
        email: 'fake@test.com',
        password: 'Test_1234',
    };

    const nameProp = {
        title: 'Name',
        placeHolder: 'Fake name',
    };
    const lastNameProp = {
        title: 'Last name',
        placeHolder: 'Fake last name',
    };
    const usernameProp = {
        title: 'Username',
        placeHolder: 'Fake username',
    };

    const emailProp = {
        title: 'Username',
        placeHolder: 'Fake username',
    };

    const passwordProp = {
        title: 'Username',
        placeHolder: 'Fake username',
    };
    const fakeAction = jest.fn((formData: IUserData) => {
        expect(formData).toEqual(fakeUserData);
    });

    const { getByTestId } = render(
        <CreateUserForm
            name={nameProp}
            lastName={lastNameProp}
            username={usernameProp}
            email={emailProp}
            password={passwordProp}
            action={fakeAction}
        />,
    );
    const labelTagName = getByTestId('create.user.form.name.label');
    const labelTagLastName = getByTestId('create.user.form.lastName.label');
    const labelTagUsername = getByTestId('create.user.form.username.label');
    const inputTagName = getByTestId('create.user.form.name.input');
    const inputTagLastName = getByTestId('create.user.form.lastName.input');
    const inputTagUsername = getByTestId('create.user.form.username.input');
    const inputTagEmail = getByTestId('create.user.form.email.input');
    const inputTagPassword = getByTestId('create.user.form.password.input');
    const buttonTag = getByTestId('create.user.form.submit.button');

    expect(inputTagUsername).toHaveTextContent('');
    expect(inputTagName).toHaveTextContent('');
    expect(inputTagLastName).toHaveTextContent('');
    expect(labelTagUsername).toHaveTextContent(usernameProp.title);
    expect(labelTagName).toHaveTextContent(nameProp.title);
    expect(labelTagLastName).toHaveTextContent(lastNameProp.title);
    expect(buttonTag).toHaveTextContent('Create');

    fireEvent.change(inputTagUsername, { target: { value: fakeUserData.username } });
    fireEvent.change(inputTagName, { target: { value: fakeUserData.name } });
    fireEvent.change(inputTagLastName, { target: { value: fakeUserData.lastName } });
    fireEvent.change(inputTagEmail, { target: { value: fakeUserData.email } });
    fireEvent.change(inputTagPassword, { target: { value: fakeUserData.password } });

    fireEvent.click(buttonTag);
    expect(fakeAction).toBeCalledTimes(1);
    expect(fakeAction).toBeCalledWith(fakeUserData);
});
