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
                height: 'auto',
                padding: '5%',
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {props.children}
        </div>
    );
}

export default MainLayout;
