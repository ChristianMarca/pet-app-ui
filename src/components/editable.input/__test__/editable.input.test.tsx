import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { EditableInput, EditableTextArea, Props } from "../editable.input";


afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
});

describe('Editable input',  () => {
    const fakeAction = jest.fn();

    test('should update the editable input', async () => {
       const props: Props = {
           className: '',
           type: 'text',
           required: true,
           currentValue: 'value',
           placeholder: 'current place holder',
           id: 'fake_id',
           testId: 'fake_test_id',
           onChange: fakeAction
       };
       const newValue = 'new value';
        const { getByTestId } = render(
            <EditableInput {...props} />,
        );

        expect(getByTestId('fake_test_id').value).toEqual('value');

        await act(async () => {
            await  fireEvent.change(getByTestId('fake_test_id'), { target: { value: newValue } });
        });

        expect(fakeAction).toBeCalledTimes(1);
    });

    test('should update the editable textarea', async () => {
        const props: Props = {
            className: '',
            type: 'text',
            required: true,
            currentValue: 'value',
            placeholder: 'current place holder',
            id: 'fake_id',
            testId: 'fake_test_id',
            onChange: fakeAction
        };
        const newValue = 'new value';
        const { getByTestId } = render(
            <EditableTextArea {...props} />,
        );

        expect(getByTestId('fake_test_id').value).toEqual('value');

        fireEvent.change(getByTestId('fake_test_id'), { target: { value: newValue } });

        expect(fakeAction).toBeCalledTimes(1);
    });
});
