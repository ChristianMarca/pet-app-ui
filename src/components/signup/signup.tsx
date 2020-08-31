import React from 'react';
import { IRoute, Routers } from '../../containers/routers';
import CreateUserForm from '../createUser.form/createUser.form';
import { IUserData, IUserDataError } from '../../services/user.api';

interface ICreateUser extends IRoute {
    createUserService: (userData: IUserData) => Promise<IUserData | IUserDataError>;
}

function SignUp({ redirect, createUserService }: ICreateUser): React.ReactElement {
    const handleGoToLogin = () => {
        redirect(Routers.LOGIN);
    };

    const onCreateUser = (userData: IUserData) => {
        createUserService(userData)
            .then((resp) => {
                if (resp.userId) {
                    redirect(Routers.LOGIN);
                } else {
                    alert('Invalid fields');
                }
            })
            .catch((err) => {
                alert('Error creating the user');
            });
    };

    return (
        <>
            <div className="bg-gray-200 rounded p-4 m-4">
                <CreateUserForm
                    username={{ title: 'Username', placeHolder: 'crmg', type: 'text', required: true }}
                    name={{ title: 'First Name', placeHolder: 'Christian', type: 'text', required: true }}
                    lastName={{ title: 'Last Name', placeHolder: 'Marca', type: 'text', required: true }}
                    email={{ title: 'email', placeHolder: 'cmarca@test.com', type: 'email', required: true }}
                    password={{ title: 'Last Name', placeHolder: '***********', type: 'password', required: true }}
                    action={onCreateUser}
                />
                <button onClick={handleGoToLogin}>Login</button>
            </div>
        </>
    );
}

export default SignUp;
