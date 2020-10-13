import React from 'react';
import { FormFields } from '../createUser.form/createUser.form';

const BASE_CLASS_NAME = 'w-full md:w-1/2 px-3';

interface Props {
    attributes: FormFields;
    containerClassName?: string;
}

function FormField({ attributes, containerClassName = BASE_CLASS_NAME }: Props): React.ReactElement {
    return (
        <div className={containerClassName}>
            <label
                data-testid={attributes.testId?.concat('.label')}
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor={attributes.id}
            >
                {attributes.title}
            </label>
            <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                data-testid={attributes.testId?.concat('.input')}
                id={attributes.id}
                type={attributes.type}
                placeholder={attributes.placeHolder}
                required={attributes.required}
                value={attributes.currentValue || ''}
                // onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeData(event, 'lastName')}
                onChange={attributes.onChange}
            />
        </div>
    );
}

export default FormField;
