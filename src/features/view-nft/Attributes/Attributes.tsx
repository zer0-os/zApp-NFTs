import { FC, useState, useMemo, useRef } from 'react';

import { getDomainId } from '../../../lib/util';
import { useDomainMetadata, useResize } from '../../../lib/hooks';
import { Attribute } from '../../../lib/types/metadata';

import classNames from 'classnames/bind';
import styles from './Attributes.module.scss';

const cx = classNames.bind(styles);

export const NFT_ATTRIBUTES_VISIBLE_COUNTS_BY_VIEWPORT = {
	MOBILE: 5,
	TABLET: 7,
	DESKTOP: 11,
};

interface AttributesProps {
	zna: string;
}

export const Attributes: FC<AttributesProps> = ({ zna }) => {
	const containerRef = useRef(null);
	const domainId = getDomainId(zna);

	const { data: metadata } = useDomainMetadata(domainId);

	const [isToggled, setIsToggled] = useState<boolean>(true);
	const [containerWidth, setContainerWidth] = useState<number>(0);

	const initialVisibleAttributesCount: number = useMemo(() => {
		const isTablet = containerWidth > 592 && containerWidth < 800;
		const isMobile = containerWidth <= 592;

		if (isMobile) return NFT_ATTRIBUTES_VISIBLE_COUNTS_BY_VIEWPORT.MOBILE;
		if (isTablet) return NFT_ATTRIBUTES_VISIBLE_COUNTS_BY_VIEWPORT.TABLET;
		return NFT_ATTRIBUTES_VISIBLE_COUNTS_BY_VIEWPORT.DESKTOP;
	}, [containerWidth]);

	const initialHiddenAttributesCount: number = Math.max(
		metadata?.attributes?.length - initialVisibleAttributesCount,
		0,
	);

	const visibleAttributes: Attribute[] = useMemo(() => {
		if (!metadata?.attributes) {
			return [];
		}

		const visibleAttributesCount = isToggled
			? initialVisibleAttributesCount
			: metadata.attributes.length;

		return metadata.attributes.slice(0, visibleAttributesCount);
	}, [metadata, isToggled, initialVisibleAttributesCount]);

	if (visibleAttributes.length === 0) {
		return null;
	}

	useResize({
		onResize: setContainerWidth,
		targetRef: containerRef,
	});

	return (
		<section className={styles.AttributesSection}>
			<div className={styles.Container} ref={containerRef}>
				<h4>Attributes</h4>

				<AttributesGrid
					attributes={visibleAttributes}
					isToggled={isToggled}
					setIsToggled={setIsToggled}
					initialHiddenAttributesCount={initialHiddenAttributesCount}
				/>
			</div>
		</section>
	);
};

/*******************
 * Attributes Grid
 *******************/

interface AttributesGridProps {
	attributes: Attribute[];
	isToggled: boolean;
	setIsToggled: (value: boolean) => void;
	initialHiddenAttributesCount: number;
}

const AttributesGrid = ({
	attributes,
	isToggled,
	setIsToggled,
	initialHiddenAttributesCount,
}: AttributesGridProps) => {
	return (
		<ul className={styles.Grid}>
			{attributes.map((attributeItem: Attribute, index: number) => (
				<AttributeItem
					key={index}
					attributeItem={attributeItem}
					attributeIndex={index}
				/>
			))}

			{initialHiddenAttributesCount > 0 && (
				<ToggleButton
					count={initialHiddenAttributesCount}
					isToggled={isToggled}
					setIsToggled={setIsToggled}
				/>
			)}
		</ul>
	);
};

/*******************
 * Attribute Item
 *******************/

interface AttributeItemProps {
	attributeItem: Attribute;
	attributeIndex: number;
}

const AttributeItem = ({
	attributeItem,
	attributeIndex,
}: AttributeItemProps) => {
	return (
		<li
			className={cx(styles.AttributeItem, {
				setOpacityAnimation: attributeIndex > 10,
			})}
			key={`attribute-type-${attributeItem.trait_type}`}
		>
			<span className={styles.Traits}>{attributeItem.trait_type}</span>
			<span className={styles.Properties}>{attributeItem.value} </span>
		</li>
	);
};

/*******************
 * Toggle Button
 *******************/

interface ToggleButtonProps {
	count: number;
	isToggled: boolean;
	setIsToggled: (value: boolean) => void;
}

const ToggleButton = ({
	count,
	isToggled,
	setIsToggled,
}: ToggleButtonProps) => {
	const buttonText = isToggled ? count + ' More' : 'Show Less';

	return (
		<button
			className={cx(styles.Button, {
				setOpacityAnimation: !isToggled,
			})}
			onClick={() => setIsToggled(!isToggled)}
		>
			{buttonText}
		</button>
	);
};
