import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { SubdomainTable } from './SubdomainTable';

///////////////////////
// Mock Custom Hooks //
///////////////////////

let mockSubdomainSearch;
jest.mock('./useSubdomainSearch', () => ({
	useSubdomainSearch: () => mockSubdomainSearch,
}));

const mockSearchResult = {
	isSearching: false,
	isFetching: false,
	activeQuery: undefined,
	isIdle: true,
	searchResult: undefined,
};

let mockInfiniteSubdomains;
jest.mock('./useInfiniteSubdomains', () => ({
	useInfiniteSubdomains: () => mockInfiniteSubdomains,
}));

const mockSubdomains = {
	loadedSubdomains: {
		pages: [
			[
				{
					id: '0x123',
					name: 'mock-1',
				},
				{
					id: '0x234',
					name: 'mock-2',
				},
			],
			[
				{
					id: '0x345',
					name: 'mock-3',
				},
			],
		],
	},
	isLoading: false,
};

////////////////////////
// Mock Subcomponents //
////////////////////////

jest.mock('../SubdomainTableCard', () => ({
	SubdomainTableCard: ({ zna }: { zna: string }) => (
		<div data-testid="card">{zna}</div>
	),
}));

jest.mock('../SubdomainTableRow', () => ({
	SubdomainTableRow: ({ zna }: { zna: string }) => (
		<tr data-testid="row">
			<td>{zna}</td>
		</tr>
	),
}));

beforeEach(() => {
	jest.resetAllMocks();
});

///////////
// Tests //
///////////

describe('<SubdomainTable />', () => {
	beforeEach(() => {
		mockSubdomainSearch = mockSearchResult;
		mockInfiniteSubdomains = mockSubdomains;
	});

	test('should render scroll trigger', () => {
		const { container } = render(<SubdomainTable zna="0x123" />);
		expect(container.getElementsByClassName('Trigger')).toHaveLength(1);
	});

	describe('when browsing subdomains', () => {
		describe('when toggling between grid and table view', () => {
			test('should be grid view by default', () => {
				const { getAllByTestId } = render(<SubdomainTable zna="0x123" />);
				expect(getAllByTestId('card').length).toBeTruthy();
			});

			test('should be able to toggle between grid and list views', () => {
				/*
				 * @note: this test is flaky, as it relies on the order of the radio buttons.
				 * Improve this in future iterations!
				 */

				const { getAllByRole, queryByTestId, getAllByTestId } = render(
					<SubdomainTable zna="0x123" />,
				);

				const [listViewButton, gridViewButton] = getAllByRole('radio');

				fireEvent.click(listViewButton);

				expect(getAllByTestId('row').length).toBeTruthy();
				expect(queryByTestId('card')).toBeNull();

				fireEvent.click(gridViewButton);

				expect(getAllByTestId('card')).toBeTruthy();
				expect(queryByTestId('row')).toBeNull();
			});
		});

		describe('when loading initial subdomains', () => {
			test('should display correct message: "Loading subdomains"', () => {
				mockInfiniteSubdomains = {
					...mockSubdomains,
					isLoading: true,
				};
				const { getByText } = render(<SubdomainTable zna="0x123" />);
				expect(getByText('Loading subdomains')).toBeInTheDocument();
			});
		});

		describe('when loading next page of subdomains', () => {
			beforeEach(() => {
				mockInfiniteSubdomains = {
					...mockSubdomains,
					isLoading: true,
					isFetchingNextPage: true,
				};
			});

			test('should display correct message: "Loading more subdomains"', () => {
				const { getByText } = render(<SubdomainTable zna="0x123" />);
				expect(getByText('Loading more subdomains')).toBeInTheDocument();
			});

			test('should show already loaded subdomains', () => {
				const { queryAllByTestId } = render(<SubdomainTable zna="0x123" />);
				// Checking cards or rows here to make test less flaky
				const cards = queryAllByTestId('card');
				const rows = queryAllByTestId('row');
				expect(cards.length + rows.length).toBe(3);
			});
		});

		describe('when subdomains have loaded', () => {
			test('should display all subdomains', () => {
				const { queryAllByTestId } = render(<SubdomainTable zna="0x123" />);
				// Checking cards or rows here to make test less flaky
				const cards = queryAllByTestId('card');
				const rows = queryAllByTestId('row');
				expect(cards.length + rows.length).toBe(3);
			});

			test('should pass "zna" prop to each subdomain', () => {
				const { queryAllByTestId } = render(<SubdomainTable zna="0x123" />);
				const cards = queryAllByTestId('card');
				const rows = queryAllByTestId('row');

				const cardText = cards.map((card) => card.textContent).join('');
				const rowText = rows.map((row) => row.textContent).join('');

				expect(cardText + rowText).toContain('mock-1mock-2mock-3');
			});
		});
	});

	describe('when searching for a subdomain', () => {
		describe('when search is loading', () => {
			beforeEach(() => {
				mockSubdomainSearch = {
					...mockSearchResult,
					isSearching: true,
					activeQuery: 'mock',
				};
			});

			test('should display correct message: "Searching for subdomain [activeQuery]"', () => {
				const { getByText } = render(<SubdomainTable zna="0x123" />);

				expect(getByText('Searching for subdomain mock')).toBeInTheDocument();
			});

			test('should not display any previously loaded subdomains', () => {
				const { queryAllByTestId } = render(<SubdomainTable zna="0x123" />);
				const cards = queryAllByTestId('card');
				const rows = queryAllByTestId('row');
				expect(cards.length + rows.length).toBe(0);
			});
		});

		describe('when search yields results', () => {
			test('should display all matching subdomains', () => {
				mockSubdomainSearch = {
					isSearching: false,
					activeQuery: 'mock',
					searchResult: {
						id: '0x123',
						name: 'mock-1',
					},
				};

				const { queryAllByTestId } = render(<SubdomainTable zna="0x123" />);
				const cards = queryAllByTestId('card');
				const rows = queryAllByTestId('row');
				expect(cards.length + rows.length).toBe(1);
			});
		});
	});
});
