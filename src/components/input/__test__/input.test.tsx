import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from '../input';

test('Input component behavior', async () => {
    const fakeUserInput = 'New field value';
    const inputLabelText = 'Input title';
    const inputPlaceHolder = 'Place holder';
    const buttonText = 'Submit';
    const fakeAction = jest.fn((inputValue: string) => {
        expect(inputValue).toEqual(fakeUserInput);
    });

    const { getByTestId, getByPlaceholderText } = render(
        <Input title={inputLabelText} placeHolder={inputPlaceHolder} buttonText={buttonText} action={fakeAction} />,
    );
    const inputTag = getByTestId('input.input');
    const labelTab = getByTestId('input.label');
    const buttonTag = getByTestId('input.button');

    expect(inputTag).toHaveTextContent('');
    expect(labelTab).toHaveTextContent(inputLabelText);
    expect(buttonTag).toHaveTextContent(buttonText);
    expect(labelTab).toHaveTextContent(inputLabelText);

    fireEvent.change(inputTag, { target: { value: fakeUserInput } });

    // @ts-ignore
    expect(getByPlaceholderText(inputPlaceHolder)['value']).toEqual(fakeUserInput);

    fireEvent.click(buttonTag);
    expect(fakeAction).toBeCalledTimes(1);
    fireEvent.keyDown(inputTag, { key: 'Enter', code: 'Enter' });
    expect(fakeAction).toBeCalledTimes(2);
    expect(fakeAction).toBeCalledWith(fakeUserInput);
});
