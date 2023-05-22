import React, { createElement, ReactNode, useEffect, useState } from 'react';

import { IconArrowNarrowUpRight } from '@zero-tech/zui/icons';
import styles from './Banner.module.scss';

/////////////////
// Drop Banner //
/////////////////

export interface BannerInfo {
	buttonText?: string;
	onClick?: (event: any) => void;
	subtext?: string | ReactNode;
	text: string | ReactNode;
}

export interface BannerProps {
	backgroundImageSrc?: string;
	buttonText: BannerInfo['buttonText'];
	onClick?: BannerInfo['onClick'];
	style?: React.CSSProperties;
	subtext: BannerInfo['subtext'];
	text: BannerInfo['text'];
}

export const Banner: React.FC<BannerProps> = ({
	backgroundImageSrc,
	buttonText,
	onClick,
	style,
	subtext,
	text,
}) => {
	return createElement(
		Boolean(onClick) ? 'button' : 'div',
		{
			className: styles.Banner,
			style,
			onClick,
			'data-is-clickable': Boolean(onClick) ? '' : null,
		},
		<>
			{backgroundImageSrc && <LazyBackground src={backgroundImageSrc} />}
			<div className={styles.Text}>
				<h2>{text}</h2>
				<span>{subtext}</span>
			</div>

			{onClick && buttonText && (
				<p className={styles.Button}>
					{buttonText}
					<IconArrowNarrowUpRight size={16} isFilled={true} />
				</p>
			)}
		</>,
	);
};

////////////////////
// LazyBackground //
////////////////////

interface LazyBackgroundProps {
	src: string;
}

/**
 * Lazy loads banner background image
 */
const LazyBackground = ({ src }: LazyBackgroundProps) => {
	const [blob, setBlob] = useState<string | undefined>();

	/**
	 * @todo: replace with react-query
	 */
	useEffect(() => {
		let isMounted = true;

		fetch(src)
			.then((r) => r.blob())
			.then((blob) => {
				if (isMounted) {
					const url = URL.createObjectURL(blob);
					setBlob(url);
				}
			});
		return () => {
			isMounted = false;
		};
	}, [src]);

	if (blob) {
		return <img className={styles.Background} src={blob} alt="" />;
	} else {
		return null;
	}
};
