import React, { useEffect, useState } from 'react';
import { IRoute, Routers } from '../../containers/routers';
import { IUserData, IUserDataError } from '../../services/user.api';

interface ILoginUser extends IRoute {
    loginService: (email?: string, password?: string) => Promise<IUserData | IUserDataError>;
}

function Login({ redirect, loginService }: ILoginUser): React.ReactElement {
    const [formData, setFormData] = useState<Partial<IUserData>>({});
    const handleSignUp = () => {
        redirect(Routers.SIGN_UP);
    };

    const loginUserHandler = (email?: string, password?: string): void => {
        loginService(email, password)
            .then((userData) => {
                if (userData.userId) {
                    redirect(Routers.USER_PAGE);
                } else if (email && password) {
                    alert('Login failed');
                }
            })
            .catch((error) => {
                alert('Login failed');
            });
    };

    useEffect(() => {
        loginService()
            .then((userData) => {
                if (userData.userId) {
                    redirect(Routers.USER_PAGE);
                }
            })
            .catch((error) => {
                alert('Login failed');
            });
    }, [redirect, loginService]);

    const validateForm = (email: string, password: string): boolean => {
        return !!(email.length && password.length);
    };

    const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        const { password = '', email = '' } = formData;

        if (validateForm(email, password)) {
            await loginUserHandler(email, password);
        }
    };

    const onChangeData = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const value: string = event.target.value;
        const newUserChange: Partial<IUserData> = { ...formData, [field]: value };
        setFormData(newUserChange);
    };

    return (
        <>
            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmitHandler}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            data-testid="login.user.form.email.input"
                            required
                            placeholder="Email"
                            onChange={(event) => {
                                onChangeData(event, 'email');
                            }}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            data-testid="login.user.form.password.input"
                            required
                            placeholder="******************"
                            onChange={(event) => {
                                onChangeData(event, 'password');
                            }}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            data-testid="login.user.button"
                        >
                            Sign In
                        </button>
                        <button onClick={handleSignUp}>Sign UP</button>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs">&copy;Footer example :)</p>
            </div>
        </>
    );
}

export default Login;
