import React, { useEffect, useState } from 'react';
import { IUserData, IUserDataError } from '../../services/user.api';
import Input from '../input/input';
import Card from '../card/card';
import { IRoute, Routers } from '../../containers/routers';
import FormField from '../form.field/form.field';
import { validateUser } from '../../utils/user.utils';

interface IUser extends IRoute {
    loginService: () => Promise<IUserData | IUserDataError>;
    getUserDataByUserIdService: (username: string) => Promise<IUserData | IUserDataError>;
    updateUserService: (
        userData: Partial<Omit<IUserData, 'email' | 'userId' | 'createdAt' | 'updatedAt'>>,
        userId: string,
    ) => Promise<IUserData | IUserDataError>;
}

function User({ redirect, loginService, getUserDataByUserIdService, updateUserService }: IUser): React.ReactElement {
    const [userData, setUserData] = useState<Partial<IUserData>>({});
    const [usernameInput, setUsernameInput] = useState<string>('');
    const [formData, setFormData] = useState<Partial<IUserData>>({});

    useEffect(() => {
        loginService()
            .then((userData) => {
                if (userData.userId) {
                    setUsernameInput(userData.username);
                } else {
                    redirect(Routers.LOGIN);
                }
            })
            .catch((error) => {
                alert('Login failed');
            });
    }, [redirect, loginService]);

    useEffect(() => {
        if (usernameInput) {
            getUserDataByUserIdService(usernameInput)
                .then((user) => {
                    setUserData(user);
                    setFormData(user);
                })
                .catch(() => {
                    setUserData({});
                });
        }
    }, [usernameInput, loginService, getUserDataByUserIdService]);

    const onUserSubmit = (username: string) => {
        setUsernameInput(username);
    };

    const onUserUpdateSubmit = () => {
        updateUserService(validateUser(formData), userData.userId || '')
            .then((updatedUser) => {
                setUsernameInput(updatedUser.username);
            })
            .catch(() => {
                alert('Something went wrong while update the data');
            });
    };

    const onChangeData = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const value: string = event.target.value;
        const newUserChange: Partial<IUserData> = { ...formData, [field]: value };
        setFormData(newUserChange);
    };

    const getUserDataForm = () => {
        const { name, lastName, username } = formData;
        const usernameConfig = { title: 'Username', placeHolder: 'crmg', type: 'text', required: true };
        const nameConfig = { title: 'First Name', placeHolder: 'Christian', type: 'text', required: true };
        const lastNameConfig = { title: 'Last Name', placeHolder: 'Marca', type: 'text', required: true };

        return (
            <div className="w-full max-w-lg flex justify-center flex-col content-center">
                <FormField
                    attributes={{
                        ...usernameConfig,
                        currentValue: username,
                        testId: 'update.user.form.username',
                        id: 'grid-first-username.update',
                        onChange: (event: React.ChangeEvent<HTMLInputElement>) => onChangeData(event, 'username'),
                    }}
                    containerClassName="w-full md:w-1/2 px-3 mb-6 md:mb-0"
                />
                <FormField
                    attributes={{
                        ...nameConfig,
                        currentValue: name,
                        testId: 'update.user.form.name',
                        id: 'grid-first-name.update',
                        onChange: (event: React.ChangeEvent<HTMLInputElement>) => onChangeData(event, 'name'),
                    }}
                    containerClassName="w-full md:w-1/2 px-3 mb-6 md:mb-0"
                />
                <FormField
                    attributes={{
                        ...lastNameConfig,
                        currentValue: lastName,
                        testId: 'update.user.form.lastName',
                        id: 'grid-first-lastName.update',
                        onChange: (event: React.ChangeEvent<HTMLInputElement>) => onChangeData(event, 'lasName'),
                    }}
                    containerClassName="w-full md:w-1/2 px-3 mb-6 md:mb-0"
                />
                <button
                    onClick={onUserUpdateSubmit}
                    className="my-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                >
                    Update
                </button>
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center justify-center" data-testid="user.container">
            <div className="bg-gray-200 rounded p-4 m-4">
                <Input title="User" id="input.user" buttonText="find" placeHolder="Username" action={onUserSubmit} />
                <Card title={userData.username || ''} body={getUserDataForm()} />
            </div>
        </div>
    );
}

export default User;
