import React, { useState } from 'react';
import './style.css';

interface Props {
    onToggleAction: (state: boolean) => void;
    title: string;
    testId: string;
}

function ToggleButton({ onToggleAction, title, testId }: Props) {
    const [state, setState] = useState<boolean>(false);
    const onClickHandler = () => {
        onToggleAction(!state);
        setState((prevState) => !prevState);
    };

    return (
        <div className="flex items-center justify-center w-full mb-24">
            <label htmlFor="toogleA" className="flex items-center cursor-pointer">
                <div className="relative" data-testid={testId.concat('.toggle.button')}>
                    <input id="toogleA" type="checkbox" className="hidden" onClick={onClickHandler} />
                    <div className="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                    <div className="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0"></div>
                </div>
                <div className="ml-3 text-gray-700 font-medium">{title}</div>
            </label>
        </div>
    );
}

export default ToggleButton;
