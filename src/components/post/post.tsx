import React, { useEffect, useState } from 'react';
import { IRoute, Routers } from '../../containers/routers';
import { deletePostById, getAllPosts, IPostContent, IPostData, IPostListPagination } from '../../services/posts.api';
import { IFetchDataError, IUserData } from '../../services/user.api';
import PostList from '../post.items/post.list';
import ToggleButton from '../toggle.button/toggle.button';
import CreatePostForm from '../createPost.form/createPost.form';

export interface IPost extends IRoute {
    loginService: () => Promise<IUserData | IFetchDataError>;
    createPostService: (userId: number | undefined, content: IPostContent) => Promise<IPostData | IFetchDataError>;
    getPostsService: (
        includeUserId: boolean,
        pageNumber: number,
        pageSize: number,
    ) => Promise<IPostListPagination | IFetchDataError>;
    updatePostsService: (postId: number, content: Partial<IPostContent>) => Promise<IPostData | IFetchDataError>;
    deletePost: (postId: number) => Promise<{ [key: string]: string }>;
}

function Post({ redirect, updatePostsService, getPostsService, loginService, createPostService }: IPost) {
    const [onlyUserPost, setOnlyUserPost] = useState<boolean>(false);
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);
    const [forceUpdate, setForceUpdate] = useState<boolean>(false);

    useEffect(() => {
        loginService()
            .then((userData) => {
                if (userData.userId) {
                    setCurrentUserId(parseInt(userData.userId, 10));
                } else {
                    redirect(Routers.LOGIN);
                }
            })
            .catch((error) => {
                alert('Login failed');
            });
    }, [redirect, loginService]);

    const onToggleHandler = (currentState: boolean) => {
        setOnlyUserPost(currentState);
    };

    const createPost = (postCreated: IPostContent) => {
        setForceUpdate((prevState) => !prevState);
    };

    const goUserHandler = () => {
        redirect(Routers.USER_PAGE);
    };

    return (
        <div className="w-full rounded flex flex-col justify-around">
            <CreatePostForm
                action={createPost}
                createPostService={createPostService}
                currentUserId={currentUserId || Infinity}
            />
            <div className="">
                <ToggleButton onToggleAction={onToggleHandler} title="Show only my posts" testId="post.own" />
                <PostList
                    currentUserLogged={currentUserId || Infinity}
                    getPostsService={getPostsService}
                    filterByUserId={onlyUserPost}
                    updatePostsService={updatePostsService}
                    deletePost={deletePostById}
                    forceUpdate={forceUpdate}
                />
            </div>
            <button
                onClick={goUserHandler}
                className="underline border-2 rounded hover:bg-gray-200 p-1 m-4"
                data-testid="route.users.button"
            >
                View users
            </button>
        </div>
    );
}

export default Post;
