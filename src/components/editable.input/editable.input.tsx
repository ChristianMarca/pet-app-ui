import React from 'react';

export interface Props {
    className: string;
    disabled?: boolean;
    type: string;
    required: boolean;
    currentValue: string | undefined;
    placeholder: string;
    id: string;
    testId: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function EditableInput({
    currentValue,
    onChange,
    id,
    testId,
    className,
    placeholder = '',
    type = 'text',
    required = false,
    disabled = false,
}: Props) {
    return (
        <input
            type={type}
            onChange={onChange}
            value={currentValue || ''}
            id={id}
            data-testid={testId}
            className={className}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
        />
    );
}

function EditableTextArea({
    currentValue,
    onChange,
    id,
    testId,
    className,
    placeholder = '',
    required = false,
    disabled = false,
}: Props) {
    return (
        <textarea
            onChange={onChange}
            value={currentValue}
            id={id}
            data-testid={testId}
            className={className}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
        />
    );
}

export { EditableInput, EditableTextArea };

export default EditableInput;
