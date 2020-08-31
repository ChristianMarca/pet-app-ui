import React, { ReactChildren } from 'react';

type Props = {
    children: ReactChildren | React.ReactNode;
};

function MainLayout(props: Props) {
    return (
        <div
            style={{
                position: 'absolute',
                margin: 'auto',
                width: '100vw',
                height: '100vh',
                padding: '5%',
                justifyContent: 'center',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {props.children}
        </div>
    );
}

export default MainLayout;
