import { Banner, BannerProps, BannerInfo } from '../Banner';
import React from 'react';

export interface Banners {
	shouldRender: boolean;
	bannerValues: BannerInfo;
}

///////////////////
// Banner Series //
///////////////////

interface BannerSeriesProps {
	banners: Banners[];
	backgroundImageSrc?: BannerProps['backgroundImageSrc'];
	style?: BannerProps['style'];
}

export const BannerSeries = ({
	banners,
	backgroundImageSrc,
	style,
}: BannerSeriesProps) => {
	const bannerToRender = banners?.find((banner) => banner.shouldRender);

	if (!bannerToRender) {
		return null;
	}

	const { buttonText, onClick, subtext, text } = bannerToRender.bannerValues;

	return (
		<Banner
			buttonText={buttonText}
			onClick={onClick}
			text={text}
			subtext={subtext}
			style={style}
			backgroundImageSrc={backgroundImageSrc}
		/>
	);
};
