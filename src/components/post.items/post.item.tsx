import React, { useEffect, useState } from 'react';
import { deletePostById, IPostContent, IPostData } from '../../services/posts.api';
import { IFetchDataError } from '../../services/user.api';
import EditableInput from '../editable.input/editable.input';

interface IProps {
    currentUserLogged: number;
    post: IPostData;
    updatePostsService: (postId: number, content: Partial<IPostContent>) => Promise<IPostData | IFetchDataError>;
    deletePost: (postId: number) => Promise<{ [key: string]: string }>;
    onUpdatedItem: () => void;
}

function PostItem({ post, updatePostsService, currentUserLogged, onUpdatedItem }: IProps): React.ReactElement {
    const [formData, setFormData] = useState<Partial<IPostData>>({});

    useEffect(() => {
        setFormData(post);
    }, [post]);

    const onChangeData = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
        const value: string = event.target.value;
        const newPostChange: Partial<IPostData> = { ...formData, content: { [field]: value } };
        setFormData(newPostChange);
    };

    const onSavePostChanges = () => {
        updatePostsService(formData.postId ?? 0, formData.content || {})
            .then((data) => {
                onUpdatedItem();
            })
            .catch((err) => {
                alert('Something went wrong when update post');
            });
    };

    const onDeletePost = () => {
        deletePostById(formData.postId || Infinity)
            .then((data) => {
                onUpdatedItem();
            })
            .catch((err) => {
                alert('Something went wrong when Delete post');
            });
    };

    return (
        <div className="shadow p-4 my-2 flex justify-around w-full rounded flex-col content-center items-center">
            <div className="flex justify-start content-center items-center">
                <EditableInput
                    className="w-full max-w-lg flex justify-center flex-col content-center m-4"
                    required={true}
                    placeholder="My title post"
                    testId="post.editable.title"
                    id="post.editable.title"
                    type="text"
                    onChange={(event) => {
                        onChangeData(event, 'title');
                    }}
                    currentValue={formData.content?.title}
                    disabled={currentUserLogged !== formData.userId}
                />
                <div className="flex justify-end">
                    <button
                        hidden={currentUserLogged !== formData.userId}
                        onClick={onSavePostChanges}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-2 py-1 px-2 rounded-full"
                        data-testid="save.post.item.button"
                    >
                        Save
                    </button>
                    <button
                        hidden={currentUserLogged !== formData.userId}
                        onClick={onDeletePost}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold mx-2 py-1 px-2 rounded-full"
                        data-testid="delete.post.item.button"
                    >
                        Delete
                    </button>
                </div>
            </div>
            <EditableInput
                className="border-dashed border-2 rounded w-full max-w-lg flex justify-center flex-col content-center"
                required={true}
                placeholder="My title post"
                testId="post.editable.body"
                id="post.editable.body"
                type="textarea"
                onChange={(event) => {
                    onChangeData(event, 'body');
                }}
                currentValue={formData.content?.body}
                disabled={currentUserLogged !== formData.userId}
            />
        </div>
    );
}

export default PostItem;
