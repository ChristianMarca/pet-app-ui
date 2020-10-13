import React from 'react';
import {render, fireEvent, waitForElement, act} from '@testing-library/react';
import Post, { IPost } from "../post";
import {IUserData} from "../../../services/user.api";
import {IPostContent, IPostData, IPostListPagination} from "../../../services/posts.api";

test('should create a Post component', async () => {
    const username = 'Fake username';
    const name = 'Fake name';
    const lastName = 'Fake last name';
    const userId = 1;
    const postTitle = 'My post Title';
    const postBody = 'MY post body';
    const postId = 1;
    const date = new Date().toDateString();
    const loginService = jest.fn(
        (): Promise<IUserData> => {
            const resolveData: IUserData = {
                username: username,
                name: name,
                lastName: lastName,
                userId: userId.toString(),
            };
            return Promise.resolve(resolveData);
        },
    );
    const createPostService = jest.fn(
        (userId: number | undefined, content: IPostContent): Promise<IPostData> => {
            const resolveData: IPostData = {
                content: {
                    title: postTitle,
                    body: postBody,
                },
                createdAt: date,
                postId,
                updatedAt: date,
                userId: 1
            };
            return Promise.resolve(resolveData);
        },
    );

    const getAllPostService = jest.fn((includeUserId: boolean, pageNumber: number, pageSize: number,): Promise<IPostListPagination> => {
        const resolveData: IPostListPagination = {
            pagination: {
                pageNumber: 1,
                pageSize: 1,
                totalItems: 2,
                pages: 2
            },
            posts: [{ userId: 1, postId: 1, content: { body: 'my body', title: 'my title' }, createdAt: date, updatedAt:date }],
        };
        return Promise.resolve(resolveData);
    });
    const updatePostService = jest.fn((postId: number | undefined, content: Partial<IPostContent>): Promise<IPostData> => {
        const resolveData: IPostData = { userId: 1, postId: 1, content: { body: 'my new body', title: 'my title' }, createdAt: date, updatedAt: new Date().toDateString() };
        return Promise.resolve(resolveData);
    })
    const deletePostService = jest.fn((postId: number) : Promise<{ [key: string]: string }> => {
        return Promise.resolve({ msg: 'deleted' });
    });
    const props: IPost = {
        redirect: () => undefined,
        loginService: loginService,
        createPostService: createPostService,
        getPostsService: getAllPostService,
        updatePostsService: updatePostService,
        deletePost: deletePostService
    }

    const { getByText, getByTestId } = render(<Post { ...props } />)
    await waitForElement(() => getByText('View users'))
    expect(getByText('View users')).toBeInTheDocument();
    expect(getByText('Show only my posts')).toBeInTheDocument();

    await waitForElement(() => getByTestId('post.list.view.start.pagination'))
    expect(getByTestId('post.list.view.start.pagination')).toHaveTextContent('1');
    expect(getByTestId('post.list.view.last.pagination')).toHaveTextContent('1');
    expect(getByTestId('post.list.view.total.pagination')).toHaveTextContent('2');

    expect(getByTestId('post.list.view.page.number.pagination')).toHaveTextContent('1');
    expect(getByTestId('post.list.view.page.total.pagination')).toHaveTextContent('2');
});
