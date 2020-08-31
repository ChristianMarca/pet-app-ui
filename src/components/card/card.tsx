import React from 'react';

export type ICard = {
    title: string;
    body: React.ReactNode | string;
    footer?: React.ReactNode | string;
};

function Card(props: ICard): React.ReactElement {
    const { title, body, footer } = props;

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg p-4">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2" data-testid="card.title">
                    {title}
                </div>
                <div className="text-gray-700 text-base" data-testid="card.body">
                    {body}
                </div>
            </div>
            <div className="px-6 pt-4 pb-2" data-testid="card.footer">
                {footer}
            </div>
        </div>
    );
}

export default Card;
