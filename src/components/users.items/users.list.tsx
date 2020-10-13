import React, { useEffect, useState } from 'react';
import {
    IUserData,
    IFetchDataError,
    IUserListPagination,
    IUserRelationship,
    IUserRelationshipListPagination,
    getFollowedUsers,
} from '../../services/user.api';
import { PaginationItems } from '../../services/posts.api';
import UserItem from './user.item';
import Pagination from '../pagination/pagination';

interface IUserList {
    currentUserLogged: number;
    getUsersService: (pageNumber: number, pageSize: number) => Promise<IUserListPagination | IFetchDataError>;
    getFollowedUsers: (
        userId: number,
        pageNumber: number,
        pageSize: number,
    ) => Promise<IUserRelationshipListPagination | IFetchDataError | IUserRelationship[]>;
    createUserRelationshipService: (userId: number, followedUserId: number) => Promise<IUserRelationship>;
    removeUserRelationshipService: (relationshipId: number) => Promise<{ [key: string]: string }>;
    filterByFollowing: boolean;
}

function UserList({
    currentUserLogged,
    getUsersService,
    createUserRelationshipService,
    removeUserRelationshipService,
    filterByFollowing,
}: IUserList): React.ReactElement {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [paginationData, setPaginationData] = useState<PaginationItems>({
        pageNumber: 0,
        pageSize: 0,
        pages: 0,
        totalItems: 0,
    });
    const [userList, setUserList] = useState<IUserData[]>([]);
    const [followedUsers, setFollowedUsers] = useState<IUserRelationship[]>([]);
    const PAGE_SIZE = 4;

    useEffect(() => {
        if (currentUserLogged) {
            getFollowedUsers(currentUserLogged, 0, 0)
                .then((users) => {
                    const followedUsers = users as IUserRelationship[];
                    setFollowedUsers(followedUsers);
                })
                .catch(() => {
                    setFollowedUsers([]);
                });
        }
    }, [currentUserLogged]);

    useEffect(() => {
        getUsersService(currentPage, PAGE_SIZE)
            .then((data) => {
                const { pagination, users } = data;
                if (pagination && users && typeof pagination !== 'string' && typeof users !== 'string') {
                    setPaginationData(pagination);
                    setUserList(users);
                }
            })
            .catch((error) => {
                setPaginationData({ pageNumber: 0, pageSize: 0, pages: 0, totalItems: 0 });
                setUserList([]);
            });
    }, [currentPage, getUsersService]);

    const previousPageHandler = () => {
        setCurrentPage(currentPage - 1);
    };

    const nextPageHandler = () => {
        setCurrentPage(currentPage + 1);
    };
    const onUpdateHandler = () => {
        getFollowedUsers(currentUserLogged, 0, 0)
            .then((users) => {
                const followedUsers = users as IUserRelationship[];
                setFollowedUsers(followedUsers);
            })
            .catch(() => {
                setFollowedUsers([]);
            });
    };

    return (
        <Pagination
            currentPage={currentPage}
            paginationData={paginationData}
            onNextPageAction={nextPageHandler}
            onPreviousPageAction={previousPageHandler}
            testId="user.list.view"
        >
            {userList
                .filter((userItem) =>
                    filterByFollowing
                        ? followedUsers
                              .map((item) => item.followedUserId)
                              .includes(parseInt(userItem.userId || 'Infinity', 10))
                        : true,
                )
                .map((userItem) => (
                    <UserItem
                        user={userItem}
                        key={userItem.username}
                        currentUserLogged={currentUserLogged}
                        followData={followedUsers.find(
                            (item) => item.followedUserId === parseInt(userItem.userId || 'Infinity', 10),
                        )}
                        createUserRelationshipService={createUserRelationshipService}
                        removeUserRelationshipService={removeUserRelationshipService}
                        onUpdate={onUpdateHandler}
                    />
                ))}
        </Pagination>
    );
}

export default UserList;
