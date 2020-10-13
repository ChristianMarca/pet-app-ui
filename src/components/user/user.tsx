import React, { useEffect, useState } from 'react';
import {
    IFetchDataError,
    IUserData,
    IUserListPagination,
    IUserRelationship,
    IUserRelationshipListPagination,
} from '../../services/user.api';
import Input from '../input/input';
import Card from '../card/card';
import { IRoute, Routers } from '../../containers/routers';
import FormField from '../form.field/form.field';
import { validateUser } from '../../utils/user.utils';
import UserList from '../users.items/users.list';
import ToggleButton from '../toggle.button/toggle.button';

interface IUser extends IRoute {
    loginService: () => Promise<IUserData | IFetchDataError>;
    getUserDataByUserIdService: (username: string) => Promise<IUserData | IFetchDataError>;
    updateUserService: (
        userData: Partial<Omit<IUserData, 'email' | 'userId' | 'createdAt' | 'updatedAt'>>,
        userId: string,
    ) => Promise<IUserData | IFetchDataError>;
    getUsersService: (pageNumber: number, pageSize: number) => Promise<IUserListPagination | IFetchDataError>;
    deleteUserByIdService: (userId: string) => Promise<{ [key: string]: string }>;
    logoutService: () => Promise<void>;
    getFollowedUsersService: (
        userId: number,
        pageNumber: number,
        pageSize: number,
    ) => Promise<IUserRelationshipListPagination | IFetchDataError | IUserRelationship[]>;
    createUserRelationshipService: (userId: number, followedUserId: number) => Promise<IUserRelationship>;
    removeUserRelationshipService: (relationshipId: number) => Promise<{ [key: string]: string }>;
}

function User({
    redirect,
    loginService,
    getUserDataByUserIdService,
    updateUserService,
    getUsersService,
    deleteUserByIdService,
    logoutService,
    getFollowedUsersService,
    createUserRelationshipService,
    removeUserRelationshipService,
}: IUser): React.ReactElement {
    const [userData, setUserData] = useState<Partial<IUserData>>({});
    const [usernameInput, setUsernameInput] = useState<string>('');
    const [formData, setFormData] = useState<Partial<IUserData>>({});
    const [onlyFollowingUsers, setOnlyFollowingUsers] = useState<boolean>(false);

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

    const handleDeleteUser = () => {
        const confirmDeletion = window.confirm(`Are you sure to delete the account username: ${userData.username}`);
        if (confirmDeletion) {
            deleteUserByIdService(userData.userId || '')
                .then(() => logoutService())
                .then(() => {
                    console.log('lOG OUT');
                })
                .catch(() => {
                    alert("Couldn't delete user");
                });
        }
    };

    const goPostHandler = () => {
        redirect(Routers.POSTS);
    };

    const onToggleHandler = (currentState: boolean) => {
        setOnlyFollowingUsers(currentState);
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
                        onChange: (event: React.ChangeEvent<HTMLInputElement>) => onChangeData(event, 'lastName'),
                    }}
                    containerClassName="w-full md:w-1/2 px-3 mb-6 md:mb-0"
                />
                <button
                    data-testid="update.user.form.button"
                    onClick={onUserUpdateSubmit}
                    className="my-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                >
                    Update
                </button>
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center justify-center h-auto" data-testid="user.container">
            <div className="absolute m-8 top-0 left-0">
                <button
                    data-testid="user.delete.button"
                    className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                    onClick={handleDeleteUser}
                >
                    Delete Account
                </button>
            </div>
            <div className="bg-gray-200 rounded p-4 m-4">
                <Input title="User" id="input.user" buttonText="find" placeHolder="Username" action={onUserSubmit} />
                <Card title={userData.username || ''} body={getUserDataForm()} />
            </div>
            <div className="flex flex-col">
                <ToggleButton onToggleAction={onToggleHandler} title="Show following users" testId="user.following" />
                <UserList
                    getUsersService={getUsersService}
                    currentUserLogged={parseInt(userData.userId || 'Infinity', 10)}
                    getFollowedUsers={getFollowedUsersService}
                    createUserRelationshipService={createUserRelationshipService}
                    removeUserRelationshipService={removeUserRelationshipService}
                    filterByFollowing={onlyFollowingUsers}
                />
            </div>
            <button
                onClick={goPostHandler}
                className="underline border-2 rounded hover:bg-gray-200 p-1 m-4"
                data-testid="route.posts.button"
            >
                View posts
            </button>
        </div>
    );
}

export default User;
