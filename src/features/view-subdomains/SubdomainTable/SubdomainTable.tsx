import { CSSProperties, FC, useEffect, useMemo, useRef, useState } from 'react';

import { COLUMNS } from '../SubdomainTable.constants';
import { useInfiniteSubdomains } from './useInfiniteSubdomains';
import { useSubdomainSearch } from './useSubdomainSearch';

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
import { SubdomainTableCard } from '../SubdomainTableCard';
import { SubdomainTableRow } from '../SubdomainTableRow';

import styles from './SubdomainTable.module.scss';

// @note: this value is being used in SubdomainTable.module.scss - change in both places
const GRID_WIDTH_TOGGLE = 600;

type SubdomainTableProps = {
	zna: string;
};

export const SubdomainTable: FC<SubdomainTableProps> = ({ zna }) => {
	const containerRef = useRef<HTMLDivElement>(null);
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

	useEffect(() => {
		const resizeObserver = new ResizeObserver(() => {
			if (containerRef.current) {
				if (containerRef.current.offsetWidth <= GRID_WIDTH_TOGGLE) {
					setView(View.GRID);
				}
			}
		});
		resizeObserver.observe(containerRef.current);
		return () => resizeObserver.disconnect();
	}, [containerRef]);

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
		<div className={styles.Container} ref={containerRef}>
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
					className={styles.Message}
					status={TableStatus.SEARCHING}
					message={'Searching for subdomain ' + activeQuery}
				/>
			)}
			{isLoadingInitialSubdomains && (
				<TableStatusMessage
					className={styles.Message}
					status={TableStatus.LOADING}
					message={'Loading subdomains'}
				/>
			)}
			{isEmpty && (
				<TableStatusMessage
					className={styles.Message}
					status={TableStatus.EMPTY}
				/>
			)}
			{isLoadingNextSubdomains && (
				<TableStatusMessage
					className={styles.Message}
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
				className={styles.Search}
				queryString={searchQuery}
				onQueryStringChange={onChangeSearchQuery}
				placeholder={'Search by exact zNA'}
			/>
			<ViewToggle
				className={styles.Toggle}
				view={view}
				onChange={onChangeView}
			/>
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
				<Grid className={styles.Grid} data-testid={'grid'}>
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
				<Table data-testid={'table'}>
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

	return <div className={styles.Trigger} ref={triggerRef}></div>;
};
