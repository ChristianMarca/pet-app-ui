import React, { useEffect, useState } from 'react';
import { IUserData, IUserDataError, IUserListPagination } from '../../services/user.api';
import UserItem from './user.item';

interface IUserList {
    getUsersService: (pageNumber: number, pageSize: number) => Promise<IUserListPagination | IUserDataError>;
}

function UserList({ getUsersService }: IUserList): React.ReactElement {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [paginationData, setPaginationData] = useState<{ [key: string]: number }>({});
    const [userList, setUserList] = useState<IUserData[]>([]);
    const PAGE_SIZE = 4;

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
                setPaginationData({});
                setUserList([]);
            });
    }, [currentPage, getUsersService]);

    return (
        <div className="shadow bg-gray-200 rounded p-4 m-4">
            <div className="bg-white px-4 py-3 flex items-center justify-center border-t border-gray-200 sm:px-6 flex-col">
                {userList.map((userItem) => (
                    <UserItem user={userItem} key={userItem.username} />
                ))}
            </div>
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="p-4">
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div className="p-2">
                            <p className="text-sm leading-5 text-gray-700">
                                Showing
                                <span className="font-medium p-1" data-testid="user.list.view.start.pagination">
                                    {(((paginationData.pageNumber || 1) - 1) * paginationData.pageSize || 0) + 1}
                                </span>
                                to
                                <span className="font-medium p-1" data-testid="user.list.view.last.pagination">
                                    {((paginationData.pageNumber || 1) * paginationData.pageSize || 0) >
                                        paginationData.totalItems || 0
                                        ? paginationData.totalItems || 0
                                        : (paginationData.pageNumber || 1) * paginationData.pageSize || 0}
                                </span>
                                of
                                <span className="font-medium p-1" data-testid="user.list.view.total.pagination">
                                    {paginationData.totalItems || 0}
                                </span>
                                results
                            </p>
                        </div>
                        <div className="p-2">
                            <p className="text-sm leading-5 text-gray-700">
                                page
                                <span className="font-medium p-1" data-testid="user.list.view.page.number.pagination">
                                    {paginationData.pageNumber || 0}
                                </span>
                                of
                                <span className="font-medium p-1" data-testid="user.list.view.page.total.pagination">
                                    {paginationData.pages || 0}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-4">
                    <nav className="relative z-0 inline-flex shadow-sm">
                        <button
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                            aria-label="Previous"
                            disabled={currentPage <= 1}
                            onClick={() => {
                                setCurrentPage(currentPage - 1);
                            }}
                            data-testid="user.list.view.page.previous.page"
                        >
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                        <button
                            className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                            aria-label="Next"
                            disabled={(paginationData.pages || currentPage) <= currentPage}
                            onClick={() => {
                                setCurrentPage(currentPage + 1);
                            }}
                            data-testid="user.list.view.page.next.page"
                        >
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default UserList;
