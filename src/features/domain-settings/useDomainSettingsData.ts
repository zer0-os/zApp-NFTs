import { useMemo, useState, useEffect, useRef } from 'react';

import { getDomainId } from '../../lib/util';
import { useWeb3, useDomainData, useDomainMetadata } from '../../lib/hooks';

import { isEqual } from 'lodash';

export const usePrevious = <T>(value: T): T => {
	const valueRef = useRef(value);

	useEffect(() => {
		valueRef.current = value;
	}, [value]);

	return valueRef.current;
};

export default usePrevious;

/**
 * Same as useState, but will update itself value, when prop value is changed
 *
 * @param initial
 * @returns
 */
export const usePropsState = <T>(initial: T): [T, (v: T) => void] => {
	const [value, setValue] = useState<T>(initial);
	const prevInitial = usePrevious<T>(initial);

	const handleChangeValue = (v: T) => setValue(v);

	useEffect(() => {
		if (!isEqual(initial, prevInitial)) {
			setValue(initial);
		}
	}, [initial, prevInitial]);

	return [value, handleChangeValue];
};

export enum ERROR_KEYS {
	NAME = 'NAME',
	SUB_DOMAIN = 'SUBDOMAIN',
	DESCRIPTION = 'DESCRIPTION',
	CUSTOM_DOMAIN_HEADER = 'CUSTOM_DOMAIN_HEADER',
}

export enum ERROR_TYPES {
	REQUIRED = 'REQUIRED',
	DUPLICATED = 'DUPLICATED',
	LOWER_CASE = 'LOWER_CASE',
	MAX_LENGTH = 'MAX_LENGTH',
}

export const ERROR_MESSAGES = {
	[ERROR_KEYS.NAME]: {
		[ERROR_TYPES.REQUIRED]: 'NFT name is required',
	},
	[ERROR_KEYS.SUB_DOMAIN]: {
		[ERROR_TYPES.REQUIRED]: 'Domain name is required',
		[ERROR_TYPES.DUPLICATED]: 'Domain name already exists',
		[ERROR_TYPES.LOWER_CASE]: 'Domain name must be lower case',
	},
	[ERROR_KEYS.DESCRIPTION]: {
		[ERROR_TYPES.REQUIRED]: 'Domain description is required',
	},
	[ERROR_KEYS.CUSTOM_DOMAIN_HEADER]: {
		[ERROR_TYPES.REQUIRED]: 'Custom domain header is required',
	},
};

export type DomainSettingsError = {
	[ERROR_KEYS.NAME]?: string;
	[ERROR_KEYS.SUB_DOMAIN]?: string;
	[ERROR_KEYS.DESCRIPTION]?: string;
	[ERROR_KEYS.CUSTOM_DOMAIN_HEADER]?: string;
};

export const useDomainSettingsData = (zna: string) => {
	const { account } = useWeb3();
	const domainId = getDomainId(zna);

	const { data: domain, isLoading: isLoadingDomain } = useDomainData(domainId);

	const { data: metadata, isLoading: isLoadingMetadata } =
		useDomainMetadata(domainId);

	const imageAlt = `${metadata?.title ?? 'loading'} nft image`;
	const imageSrc =
		metadata?.animation_url || metadata?.image_full || metadata?.image || '';

	const domainLockedBy = domain?.lockedBy ?? '';
	const isLockedByOwner =
		domain?.isLocked &&
		domainLockedBy?.toLowerCase() === account?.toLowerCase();

	const initialSettings = useMemo(() => {
		// Domain
		const isMetadataLocked = domain?.isLocked;

		// Metadata
		const title = metadata?.title ?? '';
		const description = metadata?.description ?? '';
		const isMintable = Boolean(metadata?.isMintable);
		const isBiddable = Boolean(metadata?.isBiddable);
		const gridViewByDefault = Boolean(metadata?.gridViewByDefault);
		const customDomainHeader = Boolean(metadata?.customDomainHeader);

		const customDomainHeaderValue =
			(metadata?.customDomainHeaderValue as string) || '';

		return {
			title,
			imageAlt,
			imageSrc,
			isMintable,
			isBiddable,
			description,
			isMetadataLocked,
			gridViewByDefault,
			customDomainHeader,
			customDomainHeaderValue,
		};
	}, [domain, metadata]);

	const [isMetadataLocked, setIsMetadataLocked] = usePropsState<boolean>(
		initialSettings.isMetadataLocked,
	);

	const [title, setTitle] = usePropsState<string>(initialSettings.title);

	const [description, setDescription] = usePropsState<string>(
		initialSettings.description,
	);
	const [errors, setErrors] = useState<DomainSettingsError>({});

	/* Switches */
	const [isMintable, setIsMintable] = usePropsState<boolean>(
		initialSettings.isMintable,
	);
	const [isBiddable, setIsBiddable] = usePropsState<boolean>(
		initialSettings.isBiddable,
	);
	const [gridViewByDefault, setGridViewByDefault] = usePropsState<boolean>(
		initialSettings.gridViewByDefault,
	);

	const [customDomainHeader, setCustomDomainHeader] = usePropsState<boolean>(
		initialSettings.customDomainHeader,
	);
	const [customDomainHeaderValue, setCustomDomainHeaderValue] =
		usePropsState<string>(initialSettings.customDomainHeaderValue);

	const localState = useMemo(
		() => ({
			title,
			domain,
			description,
			errors,
			isMintable,
			isBiddable,
			gridViewByDefault,
			customDomainHeader,
			customDomainHeaderValue,
			isMetadataLocked,
		}),
		[
			title,
			domain,
			description,
			errors,
			isMintable,
			isBiddable,
			gridViewByDefault,
			customDomainHeader,
			customDomainHeaderValue,
			isMetadataLocked,
		],
	);

	const localActions = useMemo(
		() => ({
			setTitle,
			setDescription,
			setErrors,
			setIsMintable,
			setIsBiddable,
			setGridViewByDefault,
			setCustomDomainHeader,
			setCustomDomainHeaderValue,
			setIsMetadataLocked,
		}),
		[
			setTitle,
			setDescription,
			setErrors,
			setIsMintable,
			setIsBiddable,
			setGridViewByDefault,
			setCustomDomainHeader,
			setCustomDomainHeaderValue,
			setIsMetadataLocked,
		],
	);

	return {
		localState,
		localActions,
		domainId,
		imageAlt,
		imageSrc,
		domainLockedBy,
		isLockedByOwner,
	};
};
