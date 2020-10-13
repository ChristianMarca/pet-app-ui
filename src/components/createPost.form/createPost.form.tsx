import React, { useState } from 'react';
import { EditableInput, EditableTextArea } from '../editable.input/editable.input';
import { IPostContent, IPostData } from '../../services/posts.api';
import { IFetchDataError } from '../../services/user.api';

export type ICreatePost = {
    action: (data: IPostContent) => void;
    createPostService: (userId: number | undefined, content: IPostContent) => Promise<IPostData | IFetchDataError>;
    currentUserId?: number;
};

function CreatePostForm({ action, createPostService, currentUserId }: ICreatePost) {
    const [formData, setFormData] = useState<Partial<IPostContent>>({});

    const onChangeData = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
        const value: string = event.target.value;
        const postDataChanges: Partial<IPostContent> = { ...formData, [field]: value };
        setFormData(postDataChanges);
    };

    const createPostHandler = () => {
        createPostService(currentUserId, { title: formData.title, body: formData.body })
            .then((data) => {
                if (Object.keys(data).length && data.postId) {
                    setFormData({ title: '', body: '' });
                    action({ title: formData.title, body: formData.body });
                } else {
                    alert("Couldn't create the post");
                }
            })
            .catch((err) => {
                alert("Couldn't create the post");
            });
    };

    return (
        <div className="p-4 border-dashed border-2 rounded w-full flex flex-col content-center items-center">
            <div>Create Post</div>
            <EditableInput
                className="w-full max-w-lg flex justify-center flex-col content-center m-4"
                required={true}
                placeholder="My title post"
                testId="post.create.title"
                id="post.create.title"
                type="text"
                onChange={(event) => {
                    onChangeData(event, 'title');
                }}
                currentValue={formData?.title}
            />
            <EditableTextArea
                className="w-full max-w-lg flex justify-center flex-col content-center m-4"
                required={true}
                placeholder="My body post"
                testId="post.create.body"
                id="post.create.body"
                type="textarea"
                onChange={(event) => {
                    onChangeData(event, 'body');
                }}
                currentValue={formData?.body}
            />
            <button
                onClick={createPostHandler}
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                data-testid="post.create.submit.button"
            >
                Create
            </button>
        </div>
    );
}

export default CreatePostForm;
