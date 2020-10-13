import { PaginationItems } from './posts.api';
import { string } from 'prop-types';

export const baseUrl = 'http://localhost:3001';

export interface IUserData {
    username: string;
    name: string;
    lastName: string;
    email?: string;
    password?: string;
    userId?: string;
    token?: string;
}

export interface IFetchDataError {
    [key: string]: string;
}

export interface IUserListPagination {
    pagination: PaginationItems;
    users: IUserData[];
}

export interface IUserRelationship {
    linkId: number;
    userId: number;
    followedUserId: number;
    subscriber?: IUserData;
    creator?: IUserData;
}

export interface IUserRelationshipListPagination {
    pagination: PaginationItems;
    links: IUserRelationship[];
}

export const getAllUsers = (pageNumber: number, pageSize: number): Promise<IUserListPagination | IFetchDataError> => {
    const authorization = window.localStorage.getItem('token') || '';
    return fetch(`${baseUrl}/users/?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            authorization,
        },
    })
        .then((resp) => resp.json())
        .catch((err) => err);
};

export const getUserByUserName = (username: string): Promise<IUserData | IFetchDataError> => {
    const authorization = window.localStorage.getItem('token') || '';
    return fetch(`${baseUrl}/users/usernames/${username}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            authorization,
        },
    })
        .then((resp) => resp.json())
        .catch((err) => err);
};

export const createUser = (userData: IUserData): Promise<IUserData | IFetchDataError> => {
    return fetch(`${baseUrl}/users`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
        .then((resp) => resp.json())
        .catch((err) => err);
};

export const updateUser = (userData: Partial<IUserData>, userId: string): Promise<IUserData | IFetchDataError> => {
    const authorization = window.localStorage.getItem('token') || '';

    return fetch(`${baseUrl}/users/${userId}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            authorization: authorization || '',
        },
        body: JSON.stringify(userData),
    })
        .then((resp) => resp.json())
        .catch((err) => err);
};

export const loginUser = (
    email?: string | undefined,
    password?: string | undefined,
): Promise<IUserData | IFetchDataError> => {
    let authorization = null;

    if (!email || !password) {
        authorization = window.localStorage.getItem('token');
    }

    return fetch(`${baseUrl}/login`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            authorization: authorization || '',
        },
        body: JSON.stringify({ email, password }),
    })
        .then((resp) => resp.json())
        .then((userData) => {
            window.localStorage.setItem('token', userData.token);
            window.localStorage.setItem('userIdLogged', userData.userId);
            return userData;
        })
        .catch((err) => err);
};

export const logoutUser = (): Promise<IUserData | IFetchDataError> => {
    const authorization = window.localStorage.getItem('token') || '';
    return fetch(`${baseUrl}/logout`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            authorization: authorization || '',
        },
    })
        .then((resp) => resp.json())
        .then((userData) => {
            window.localStorage.setItem('token', userData.token);
            return userData;
        })
        .catch((err) => err)
        .finally(() => {
            window.localStorage.clear();
        });
};

export const deleteUserByUserId = (userId: string): Promise<{ [key: string]: string }> => {
    const authorization = window.localStorage.getItem('token') || '';
    return fetch(`${baseUrl}/users/${userId}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            authorization,
        },
    })
        .then((resp) => resp.json())
        .catch((err) => err);
};

export const getFollowedUsers = (
    userId: number,
    pageNumber: number,
    pageSize: number,
): Promise<IUserRelationshipListPagination | IFetchDataError | IUserRelationship[]> => {
    const authorization = window.localStorage.getItem('token') || '';
    return fetch(`${baseUrl}/relationships/followed/users/${userId}?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            authorization,
        },
    })
        .then((resp) => resp.json())
        .catch((err) => err);
};

export const followUser = (userId: number, followedUserId: number): Promise<IUserRelationship> => {
    const authorization = window.localStorage.getItem('token') || '';
    return fetch(`${baseUrl}/relationships/users`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            authorization,
        },
        body: JSON.stringify({
            userId,
            followedUserId,
        }),
    })
        .then((resp) => resp.json())
        .catch((err) => err);
};

export const deleteFollowRelationship = (relationshipId: number): Promise<{ [key: string]: string }> => {
    const authorization = window.localStorage.getItem('token') || '';
    return fetch(`${baseUrl}/relationships/${relationshipId}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            authorization,
        },
    })
        .then((resp) => resp.json())
        .catch((err) => err);
};
