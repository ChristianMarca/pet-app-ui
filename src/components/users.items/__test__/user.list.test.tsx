import { fireEvent, render, act, waitForElement } from '@testing-library/react';
import UserList from "../users.list";
import React from 'react';
import {IUserListPagination} from "../../../services/user.api";

afterEach(() => {
    jest.resetAllMocks();
});

test('Show user list with pagination', async () => {
    const userData = {
        username: 'Fake',
        name: 'Fake name',
        lastName: 'Fake Last name',
    }

    const getUsersService = jest.fn(
        (): Promise<IUserListPagination> => {
            return Promise.resolve({
                pagination: {
                    pageNumber: 1,
                    pageSize: 1,
                    totalItems: 2,
                    pages: 2
                },
                users: [
                    {
                        username: userData.username,
                        name: userData.name,
                        lastName: userData.lastName,
                        userId: '1',
                    }
                ]
            });
        },
    );

    const { getByTestId } = render(<UserList getUsersService={getUsersService} />);

    const startCount = await waitForElement(() => getByTestId('user.list.view.start.pagination'))
    const lastCount = getByTestId('user.list.view.last.pagination');
    const totalCount = getByTestId('user.list.view.total.pagination');

    const pageNumber = getByTestId('user.list.view.page.number.pagination');
    const totalNumber = getByTestId('user.list.view.page.total.pagination');

    const previousPageButton = getByTestId('user.list.view.page.previous.page');
    const nextPageButton = getByTestId('user.list.view.page.next.page');

    expect(startCount).toHaveTextContent('1');
    expect(lastCount).toHaveTextContent('1');
    expect(totalCount).toHaveTextContent('2');

    expect(pageNumber).toHaveTextContent('1');
    expect(totalNumber).toHaveTextContent('2');

    await act(async () => {
      await fireEvent.click(nextPageButton);
    })

    const newPageNumber = await waitForElement(() => getByTestId('user.list.view.page.number.pagination'));
    expect(totalNumber).toHaveTextContent('2');

    await act(async () => {
        await fireEvent.click(previousPageButton);
    })
    expect(pageNumber).toHaveTextContent('1');
    expect(totalNumber).toHaveTextContent('2');
});
