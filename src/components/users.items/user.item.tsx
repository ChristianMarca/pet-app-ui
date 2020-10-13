import React, { useEffect, useState } from 'react';
import { IUserData, IUserRelationship } from '../../services/user.api';

interface IProps {
    currentUserLogged: number;
    user: IUserData;
    followData?: IUserRelationship;
    createUserRelationshipService: (userId: number, followedUserId: number) => Promise<IUserRelationship>;
    removeUserRelationshipService: (relationshipId: number) => Promise<{ [key: string]: string }>;
    onUpdate: () => void;
}

function UserItem({
    user,
    currentUserLogged,
    followData,
    createUserRelationshipService,
    removeUserRelationshipService,
    onUpdate,
}: IProps): React.ReactElement {
    const [relationshipData, setRelationshipData] = useState<IUserRelationship | undefined>(followData);

    useEffect(() => {
        setRelationshipData(followData);
    }, [followData]);

    const handleOnFollowClick = () => {
        if (currentUserLogged) {
            createUserRelationshipService(currentUserLogged, parseInt(user.userId || 'Infinity', 10))
                .then((created) => {
                    setRelationshipData(created);
                    onUpdate();
                })
                .catch((err) => {
                    alert('Error following try again!');
                });
        }
    };

    const handleOnUnfollowCLick = () => {
        if (followData) {
            removeUserRelationshipService(followData.linkId)
                .then((data) => {
                    if (data.msg) {
                        setRelationshipData(undefined);
                        onUpdate();
                    }
                })
                .catch(() => {
                    alert('Error unfollowing try again!');
                });
        }
    };

    return (
        <div
            className="shadow p-4 my-2 flex justify-around w-full rounded"
            data-testid={'d'.concat('.user.pagination.item')}
            id={user.username}
        >
            <div hidden={currentUserLogged === parseInt(user.userId || 'Infinity', 10)}>
                {relationshipData ? (
                    <button
                        data-testid={user.username.concat('.button.unfollow.user')}
                        className="font-light font text-red-700 text-xs hover:underline bg-none hover:bg-gray-100"
                        onClick={handleOnUnfollowCLick}
                    >
                        Unfollow
                    </button>
                ) : (
                    <button
                        data-testid={user.username.concat('.button.follow.user')}
                        className="font-light font text-blue-700 text-xs hover:underline bg-none hover:bg-gray-100"
                        onClick={handleOnFollowClick}
                    >
                        Follow
                    </button>
                )}
            </div>

            <div data-testid="user.view.username">{user.username}</div>
            <div data-testid="user.view.name">{user.name}</div>
            <div data-testid="user.view.lastName">{user.lastName}</div>
        </div>
    );
}

export default UserItem;
