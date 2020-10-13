import React from 'react';
import { act, render, fireEvent } from '@testing-library/react';
import { IPostContent, IPostData } from "../../../services/posts.api";
import CreatePostForm from "../createPost.form";

afterEach(() => {
    jest.resetAllMocks();
});

test('Create post form', async () => {
    const userId = 1;
    const fakePostContent = {
        title: 'Fake title',
        body: 'Fake body content'
    };
    const fakeAction = jest.fn((formData: IPostContent) => {
        expect(formData).toEqual(fakePostContent);
    });

    const createPostService = jest.fn(
        (): Promise<IPostData> => {
            const resolveData: IPostData = {
                userId: userId,
                postId: 1,
                content: {
                    title: fakePostContent.title,
                    body: fakePostContent.body
                }
            };
            return Promise.resolve(resolveData);
        },
    );

    const { getByTestId, getByText } = render(
        <CreatePostForm
            currentUserId={userId}
            createPostService={createPostService}
            action={fakeAction}
        />,
    );

    expect(getByTestId('post.create.title')).toHaveTextContent('');
    expect(getByTestId('post.create.body')).toHaveTextContent('');
    expect(getByText('Create')).toBeInTheDocument();

    fireEvent.change(getByTestId('post.create.title'), { target: { value: fakePostContent.title } });
    fireEvent.change(getByTestId('post.create.body'), { target: { value: fakePostContent.body } });

    await act(async () => {
        await fireEvent.click(getByText('Create'))
    });

    expect(fakeAction).toBeCalledTimes(1);
    expect(fakeAction).toBeCalledWith(fakePostContent);
});
