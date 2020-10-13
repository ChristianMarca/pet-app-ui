import React, { useEffect, useState } from 'react';
import { IFetchDataError } from '../../services/user.api';
import {
    deletePostById,
    IPostContent,
    IPostData,
    IPostListPagination,
    PaginationItems,
} from '../../services/posts.api';
import PostItem from './post.item';
import Pagination from '../pagination/pagination';

interface IUserList {
    currentUserLogged: number;
    getPostsService: (
        includeUserId: boolean,
        pageNumber: number,
        pageSize: number,
    ) => Promise<IPostListPagination | IFetchDataError>;
    filterByUserId?: boolean;
    updatePostsService: (postId: number, content: Partial<IPostContent>) => Promise<IPostData | IFetchDataError>;
    deletePost: (postId: number) => Promise<{ [key: string]: string }>;
    forceUpdate: boolean;
}

function PostList({
    getPostsService,
    updatePostsService,
    currentUserLogged,
    filterByUserId = false,
    forceUpdate,
}: IUserList): React.ReactElement {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [paginationData, setPaginationData] = useState<PaginationItems>({
        pageNumber: 0,
        pageSize: 0,
        pages: 0,
        totalItems: 0,
    });
    const [postList, setPostList] = useState<IPostData[]>([]);
    const PAGE_SIZE = 4;

    const getPost = () =>
        getPostsService(filterByUserId, currentPage, PAGE_SIZE)
            .then((data) => {
                const { pagination, posts } = data;
                if (pagination && posts && typeof pagination !== 'string' && typeof posts !== 'string') {
                    setPaginationData(pagination);
                    setPostList(posts);
                }
            })
            .catch((error) => {
                setPaginationData({ pageNumber: 0, pageSize: 0, pages: 0, totalItems: 0 });
                setPostList([]);
            });

    useEffect(() => {
        getPost().then(() => undefined);
    }, [currentPage, getPostsService, filterByUserId, forceUpdate]);

    const previousPageHandler = () => {
        setCurrentPage(currentPage - 1);
    };

    const nextPageHandler = () => {
        setCurrentPage(currentPage + 1);
    };

    const onUpdateDataHandler = () => {
        getPost().then(() => undefined);
    };

    return (
        <Pagination
            currentPage={currentPage}
            paginationData={paginationData}
            onNextPageAction={nextPageHandler}
            onPreviousPageAction={previousPageHandler}
            testId="post.list.view"
        >
            {postList.map((userItem) => (
                <PostItem
                    updatePostsService={updatePostsService}
                    post={userItem}
                    key={userItem.postId}
                    currentUserLogged={currentUserLogged}
                    deletePost={deletePostById}
                    onUpdatedItem={onUpdateDataHandler}
                />
            ))}
        </Pagination>
    );
}

export default PostList;
