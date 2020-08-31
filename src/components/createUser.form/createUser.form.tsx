import React, { useState } from 'react';
import { IUserData } from '../../services/user.api';
import { isValidPassword } from '../../utils/password';
import FormField from '../form.field/form.field';

export type FormFields = {
    title: string;
    placeHolder: string;
    requiredMessage?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    currentValue?: string;
    id?: string;
    type?: string;
    required?: boolean;
    testId?: string;
};

export type ICreateUser = {
    name: FormFields;
    lastName: FormFields;
    username: FormFields;
    email: FormFields;
    password: FormFields;
    action: (data: IUserData) => void;
};

function CreateUserForm(props: ICreateUser): React.ReactElement {
    const { name, lastName, username, action, email, password } = props;
    const [formData, setFormData] = useState<Partial<IUserData>>({});

    const validateForm = (
        name: string,
        lastName: string,
        username: string,
        email: string,
        password: string,
    ): boolean => {
        if (!isValidPassword(password)) {
            alert('Invalid password');
            return false;
        }
        return !!(name.length && lastName.length && username.length && email.length && password.length);
    };

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const { name = '', lastName = '', username = '', password = '', email = '' } = formData;

        if (validateForm(name, lastName, username, email, password)) {
            action({ name, username, lastName, email, password });
            setFormData({});
        }
    };

    const onChangeData = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const value: string = event.target.value;
        const newUserChange: Partial<IUserData> = { ...formData, [field]: value };
        setFormData(newUserChange);
    };

    return (
        <form className="w-full max-w-lg" onSubmit={onSubmitHandler}>
            <div className="flex flex-wrap -mx-3 mb-6">
                <FormField
                    attributes={{
                        ...name,
                        currentValue: formData.name,
                        testId: 'create.user.form.name',
                        id: 'grid-first-name',
                        onChange: (event: React.ChangeEvent<HTMLInputElement>) => onChangeData(event, 'name'),
                    }}
                    containerClassName="w-full md:w-1/2 px-3 mb-6 md:mb-0"
                />
                <FormField
                    attributes={{
                        ...lastName,
                        currentValue: formData.lastName,
                        testId: 'create.user.form.lastName',
                        id: 'grid-last-name',
                        onChange: (event: React.ChangeEvent<HTMLInputElement>) => onChangeData(event, 'lastName'),
                    }}
                    containerClassName="w-full md:w-1/2 px-3 mb-6 md:mb-0"
                />
                <FormField
                    attributes={{
                        ...username,
                        currentValue: formData.username,
                        testId: 'create.user.form.username',
                        id: 'grid-username',
                        onChange: (event: React.ChangeEvent<HTMLInputElement>) => onChangeData(event, 'username'),
                    }}
                    containerClassName="w-full md:w-1/2 px-3 mb-6 md:mb-0"
                />
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <FormField
                    attributes={{
                        ...email,
                        currentValue: formData.email,
                        testId: 'create.user.form.email',
                        id: 'grid-email',
                        onChange: (event: React.ChangeEvent<HTMLInputElement>) => onChangeData(event, 'email'),
                    }}
                    containerClassName="w-full px-3"
                />
                <FormField
                    attributes={{
                        ...password,
                        currentValue: formData.password,
                        testId: 'create.user.form.password',
                        id: 'grid-password',
                        onChange: (event: React.ChangeEvent<HTMLInputElement>) => onChangeData(event, 'password'),
                    }}
                    containerClassName="w-full px-3"
                />
            </div>
            <button
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                data-testid="create.user.form.submit.button"
            >
                Create
            </button>
        </form>
    );
}

export default CreateUserForm;
