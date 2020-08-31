import React, { useState } from 'react';

export type Props = {
    title: string;
    id?: string;
    placeHolder: string;
    buttonText: string;
    action: (inputValue: string) => void;
};

function Input(props: Props): React.ReactElement {
    const { title, id, buttonText, placeHolder, action } = props;
    const [inputValue, setInputValue] = useState<string>('');

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            action(inputValue);
        }
    };

    return (
        <div className="w-64 p-4">
            <label
                htmlFor={title}
                className="block text-sm leading-5 font-medium text-gray-700"
                data-testid="input.label"
            >
                {title}
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <input
                    id={id}
                    data-testid="input.input"
                    className="form-input block w-full pl-7 pr-12 sm:text-sm sm:leading-5"
                    placeholder={placeHolder}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                    <button
                        data-testid="input.button"
                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-2 py-0 border border-blue-500 hover:border-transparent rounded"
                        onClick={() => action(inputValue)}
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Input;
