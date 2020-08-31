import { IUserData } from '../services/user.api';

export const validateUser = (userData: Partial<IUserData>) => {
    const { username = '', name = '', lastName = '' } = userData;
    return username.length && name.length && lastName.length ? { username, name, last_name: lastName } : {};
};
