import { useMemo, useState, useEffect, useRef } from 'react';

import { getDomainId } from '../../lib/util';
import { useDomainData, useDomainMetadata } from '../../lib/hooks';

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
	STORY = 'STORY',
	CUSTOM_DOMAIN_HEADER = 'CUSTOM_DOMAIN_HEADER',
}

export enum ERROR_TYPES {
	REQUIRED = 'REQUIRED',
	DUPLICATED = 'DUPLICATED',
	LOWER_CASE = 'LOWER_CASE',
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
	[ERROR_KEYS.STORY]: {
		[ERROR_TYPES.REQUIRED]: 'Story is required',
	},
	[ERROR_KEYS.CUSTOM_DOMAIN_HEADER]: {
		[ERROR_TYPES.REQUIRED]: 'Custom domain header is required',
	},
};

export type DomainSettingsError = {
	[ERROR_KEYS.NAME]?: string;
	[ERROR_KEYS.SUB_DOMAIN]?: string;
	[ERROR_KEYS.STORY]?: string;
	[ERROR_KEYS.CUSTOM_DOMAIN_HEADER]?: string;
};

export const useDomainSettingsData = (zna: string) => {
	const domainId = getDomainId(zna);

	const { data: domain, isLoading: isLoadingDomain } = useDomainData(domainId);

	const { data: metadata, isLoading: isLoadingMetadata } =
		useDomainMetadata(domainId);

	const imageAlt = `${metadata?.title ?? 'loading'} nft image`;
	const imageSrc =
		metadata?.animation_url || metadata?.image_full || metadata?.image || '';

	const initialSettings = useMemo(() => {
		// Domain
		const name = domain?.name ?? '';
		const isMetadataLocked = domain?.isLocked ? 'Locked' : 'Unlocked';

		// Metadata
		const description = metadata?.description ?? '';
		const isMintable = Boolean(metadata?.isMintable);
		const isBiddable = Boolean(metadata?.isBiddable);
		const gridViewByDefault = Boolean(metadata?.gridViewByDefault);
		const customDomainHeader = Boolean(metadata?.customDomainHeader);

		const customDomainHeaderValue =
			(metadata?.customDomainHeaderValue as string) || '';

		return {
			name,
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

	const [isMetadataLocked, setIsMetadataLocked] = usePropsState<string>(
		initialSettings.isMetadataLocked,
	);

	const [name, setName] = usePropsState<string>(initialSettings.name);

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
			name,
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
			name,
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
			setName,
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
			setName,
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

	const isChanged = useMemo(() => {
		const nameChanged = initialSettings.name !== localState.name;
		const storyChanged = initialSettings.description !== localState.description;
		const isMintableChanged =
			initialSettings.isMintable !== localState.isMintable;
		const isBiddableChanged =
			initialSettings.isBiddable !== localState.isBiddable;
		const gridViewByDefaultChanged =
			initialSettings.gridViewByDefault !== localState.gridViewByDefault;
		const customDomainHeaderChanged =
			initialSettings.customDomainHeader !== localState.customDomainHeader;
		const customDomainHeaderValueChanged =
			initialSettings.customDomainHeaderValue !==
			localState.customDomainHeaderValue;

		return (
			nameChanged ||
			storyChanged ||
			isMintableChanged ||
			isBiddableChanged ||
			gridViewByDefaultChanged ||
			customDomainHeaderChanged ||
			customDomainHeaderValueChanged
		);
	}, [initialSettings, localState]);

	return {
		localState,
		localActions,
		formattedData: {
			isChanged,
		},
		imageAlt,
		imageSrc,
	};
};
