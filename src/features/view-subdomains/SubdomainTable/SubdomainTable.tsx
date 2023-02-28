import { FC, useEffect, useMemo, useRef, useState } from 'react';

import { SubdomainTableCard } from '../SubdomainTableCard';
import { SubdomainTableRow } from '../SubdomainTableRow';

import { COLUMNS } from '../SubdomainTable.constants';

import {
	Body,
	Controls,
	Grid,
	Header,
	HeaderGroup,
	Table,
	TableSearch,
	TableStatus,
	TableStatusMessage,
	View,
	ViewToggle,
} from '@zero-tech/zui/components/Table';
import { useInfiniteSubdomains } from './useInfiniteSubdomains';
import { useSubdomainSearch } from './useSubdomainSearch';

type SubdomainTableProps = {
	zna: string;
};

export const SubdomainTable: FC<SubdomainTableProps> = ({ zna }) => {
	const [view, setView] = useState<View>(View.GRID);

	const [searchQuery, setSearchQuery] = useState<string | undefined>();

	const {
		searchResult,
		isSearching,
		isFetching: isFetchingSearch,
		activeQuery,
		isIdle,
	} = useSubdomainSearch(zna, searchQuery);

	useEffect(() => {
		setSearchQuery(undefined);
	}, [zna]);

	const {
		loadedSubdomains,
		fetchNextPage,
		isLoading: isLoadingInitialSubdomains,
		isFetchingNextPage: isLoadingNextSubdomains,
		isRefetching,
	} = useInfiniteSubdomains(zna);

	const subdomains = useMemo(() => {
		if (activeQuery) {
			return searchResult ? [searchResult] : [];
		} else {
			// react-query returns a 2d array of pages, so we need to flatten it
			return loadedSubdomains?.pages?.flat() ?? [];
		}
	}, [loadedSubdomains, searchResult, activeQuery]);

	const isEmpty =
		!isLoadingInitialSubdomains &&
		!isLoadingNextSubdomains &&
		!isFetchingSearch &&
		!isRefetching &&
		activeQuery &&
		!isIdle &&
		subdomains.length === 0;

	return (
		<div style={{ position: 'relative' }}>
			<SubdomainTableControls
				view={view}
				onChangeView={setView}
				searchQuery={searchQuery}
				onChangeSearchQuery={setSearchQuery}
			/>
			<SubdomainsView
				isGridView={view === View.GRID}
				znas={subdomains.map((s) => s.name)}
				onFetchNextPage={fetchNextPage}
			/>
			{activeQuery && isSearching && (
				<TableStatusMessage
					status={TableStatus.SEARCHING}
					message={'Searching for subdomain ' + searchQuery}
				/>
			)}
			{isLoadingInitialSubdomains && (
				<TableStatusMessage
					status={TableStatus.LOADING}
					message={'Loading subdomains'}
				/>
			)}
			{isEmpty && <TableStatusMessage status={TableStatus.EMPTY} />}
			{isLoadingNextSubdomains && (
				<TableStatusMessage
					status={TableStatus.LOADING}
					message={'Loading more subdomains'}
				/>
			)}
		</div>
	);
};

/**********************
 * Controls
 *********************/

interface SubdomainTableControlsProps {
	view: View;
	onChangeView: (view: View) => void;
	searchQuery: string;
	onChangeSearchQuery: (query: string) => void;
}

const SubdomainTableControls = ({
	view,
	onChangeView,
	searchQuery,
	onChangeSearchQuery,
}: SubdomainTableControlsProps): JSX.Element => {
	return (
		<Controls>
			<TableSearch
				queryString={searchQuery}
				onQueryStringChange={onChangeSearchQuery}
				placeholder={'Search by exact zNA'}
			/>
			<ViewToggle view={view} onChange={onChangeView} />
		</Controls>
	);
};

/**********************
 * List
 *********************/

interface SubdomainsViewProps {
	isGridView: boolean;
	znas: string[];
	onFetchNextPage: () => void;
}

const SubdomainsView = ({
	isGridView,
	znas,
	onFetchNextPage,
}: SubdomainsViewProps) => {
	if (znas.length === 0) {
		return <></>;
	}
	if (isGridView) {
		return (
			<>
				<Grid>
					{znas?.map((zna) => (
						<SubdomainTableCard key={zna} zna={zna} />
					))}
				</Grid>
				<Trigger onTrigger={onFetchNextPage} />
			</>
		);
	} else {
		return (
			<>
				<Table>
					<HeaderGroup>
						{COLUMNS.map((column) => (
							<Header key={column.id} alignment={column.alignment}>
								{column.header}
							</Header>
						))}
					</HeaderGroup>
					<Body>
						{znas?.map((zna) => (
							<SubdomainTableRow key={zna} zna={zna} />
						))}
					</Body>
				</Table>
				<Trigger onTrigger={onFetchNextPage} />
			</>
		);
	}
};

/**********************
 * Trigger
 * Used for triggering infinite scroll
 *********************/

interface TriggerProps {
	onTrigger: () => void;
}

const Trigger = ({ onTrigger }: TriggerProps) => {
	const triggerRef = useRef();

	useEffect(() => {
		if (triggerRef.current) {
			// add a visibility listener to the trigger
			const observer = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						onTrigger();
					}
				});
			});
			observer.observe(triggerRef.current);
		}
	}, [onTrigger, triggerRef.current]);

	return (
		<div
			style={{
				position: 'absolute',
				bottom: '75vh',
			}}
			ref={triggerRef}
		></div>
	);
};
