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

export interface IUserDataError {
    [key: string]: string;
}

export interface IUserListPagination {
    pagination: { [key: string]: number };
    users: IUserData[];
}

export const getAllUsers = (pageNumber: number, pageSize: number): Promise<IUserListPagination | IUserDataError> => {
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

export const getUserByUserName = (username: string): Promise<IUserData | IUserDataError> => {
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

export const createUser = (userData: IUserData): Promise<IUserData | IUserDataError> => {
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

export const updateUser = (userData: { [key: string]: any }, userId: string): Promise<IUserData | IUserDataError> => {
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
): Promise<IUserData | IUserDataError> => {
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
            return userData;
        })
        .catch((err) => err);
};

export const logoutUser = (): Promise<IUserData | IUserDataError> => {
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
