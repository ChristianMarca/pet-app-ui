import React from 'react';
import {render, fireEvent, waitForElement, act} from '@testing-library/react';
import Pagination, { PaginationData } from "../pagination";

test('should create a pagination component', async () => {
    const fakePreviousAction = jest.fn();
    const fakeNextAction = jest.fn();
    const props: Omit<PaginationData, 'children'> = {
        currentPage: 1,
        paginationData: {
            pageNumber: 1,
            pageSize: 4,
            totalItems: 10,
            pages: 2
        },
        onNextPageAction: fakeNextAction,
        onPreviousPageAction: fakePreviousAction,
        testId: 'fake_test_id'
    }

   const { getByTestId } = render(
       <Pagination {...props} >
            <div>children</div>
       </Pagination>
   )

    const startCount = await waitForElement(() => getByTestId('fake_test_id.start.pagination'))

    expect(startCount).toHaveTextContent('1');
    expect(getByTestId('fake_test_id.last.pagination')).toHaveTextContent('4');
    expect(getByTestId('fake_test_id.total.pagination')).toHaveTextContent('10');

    expect(getByTestId('fake_test_id.page.number.pagination')).toHaveTextContent('1');
    expect(getByTestId('fake_test_id.page.total.pagination')).toHaveTextContent('2');

    await act(async () => {
        await fireEvent.click(getByTestId('fake_test_id.page.next.page'));
    })

    expect(fakeNextAction).toBeCalledTimes(1);

});
