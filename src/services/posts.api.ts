import { baseUrl, IFetchDataError } from './user.api';

export interface IPostContent {
    title?: string;
    body?: string;
}

export interface PaginationItems {
    pageNumber: number;
    pageSize: number;
    totalItems: number;
    pages: number;
}

export interface IPostData {
    userId: string | number;
    postId?: number;
    content: IPostContent;
    createdAt?: string;
    updatedAt?: string;
}

export interface IPostListPagination {
    pagination: PaginationItems;
    posts: IPostData[];
}

export const getAllPosts = (
    includeUserId: boolean,
    pageNumber: number,
    pageSize: number,
): Promise<IPostListPagination | IFetchDataError> => {
    const authorization = window.localStorage.getItem('token') || '';
    const userId = window.localStorage.getItem('userIdLogged') || '';
    const baseUrlPosts = `${baseUrl}/posts/users/?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    const url = includeUserId ? baseUrlPosts.concat(`&userId=${userId}`) : baseUrlPosts;

    return fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            authorization,
        },
    })
        .then((resp) => resp.json())
        .catch((err) => err);
};

export const createPost = (userId: number | undefined, content: IPostContent): Promise<IPostData | IFetchDataError> => {
    const authorization = window.localStorage.getItem('token') || '';
    const baseUrlPosts = `${baseUrl}/posts`;
    return fetch(baseUrlPosts, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            authorization,
        },
        body: JSON.stringify({
            userId,
            content,
        }),
    })
        .then((resp) => resp.json())
        .catch((err) => err);
};

export const updatePost = (
    postId: string | number,
    content: Partial<IPostContent>,
): Promise<IPostData | IFetchDataError> => {
    const authorization = window.localStorage.getItem('token') || '';
    const baseUrlPosts = `${baseUrl}/posts/${postId}`;

    return fetch(baseUrlPosts, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            authorization,
        },
        body: JSON.stringify({
            content,
        }),
    })
        .then((resp) => resp.json())
        .catch((err) => err);
};

export const deletePostById = (postId: number): Promise<{ [key: string]: string }> => {
    const authorization = window.localStorage.getItem('token') || '';
    return fetch(`${baseUrl}/posts/${postId}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            authorization,
        },
    })
        .then((resp) => resp.json())
        .catch((err) => err);
};
