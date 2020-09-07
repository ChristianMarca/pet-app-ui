import React, { useState } from 'react';
import User from '../components/user/user';
import Login from '../components/login/login';
import SignUp from '../components/signup/signup';
import {
    logoutUser,
    loginUser,
    getUserByUserName,
    createUser,
    updateUser,
    getAllUsers,
    deleteUserByUserId,
} from '../services/user.api';

export enum Routers {
    LOGIN = 'LOGIN',
    SIGN_UP = 'SIGN_UP',
    USER_PAGE = 'USER_PAGE',
}

interface IPages {
    [key: string]: React.ReactElement;
}

export interface IRoute {
    redirect: (router: Routers) => void;
}

function Router(): React.ReactElement {
    const [currentRoute, setCurrentRoute] = useState<Routers>(Routers.LOGIN);

    const redirect = (route: Routers) => {
        setCurrentRoute(route);
    };

    const handleLogout = async () => {
        await logoutUser();
        redirect(Routers.LOGIN);
    };

    const pages: IPages = {
        [Routers.USER_PAGE]: (
            <User
                redirect={redirect}
                loginService={loginUser}
                getUserDataByUserIdService={getUserByUserName}
                updateUserService={updateUser}
                getUsersService={getAllUsers}
                deleteUserByIdService={deleteUserByUserId}
                logoutService={handleLogout}
            />
        ),
        [Routers.LOGIN]: <Login redirect={redirect} loginService={loginUser} />,
        [Routers.SIGN_UP]: <SignUp redirect={redirect} createUserService={createUser} />,
    };

    const getRenderPage = (): React.ReactElement => {
        return (
            <div
                data-testid="container"
                className="flex flex-col items-center justify-center h-auto bg-blue-100 scrolling-auto"
            >
                {!(currentRoute === Routers.LOGIN || currentRoute === Routers.SIGN_UP) && (
                    <button
                        data-testid="logout.button"
                        onClick={handleLogout}
                        className="absolute m-8 top-0 right-0 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                    >
                        Log Out
                    </button>
                )}
                {pages[currentRoute]}
            </div>
        );
    };

    return getRenderPage();
}

export default Router;
