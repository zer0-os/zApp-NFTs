import { FC } from 'react';

import { Options } from '../Options';
import { Members } from '../Members';

import { ArrowLink } from '@zero-tech/zui/components/Link/ArrowLink';

import classNames from 'classnames/bind';
import styles from './Details.module.scss';

const cx = classNames.bind(styles);

type DomainPreviewProps = {
	id: string;
	zna: string;
	title: string;
	description: string;
	owner: string;
	creator: string;
	isNFTView: boolean;
};

export const Details: FC<DomainPreviewProps> = ({
	id,
	zna,
	title,
	description,
	owner,
	creator,
	isNFTView,
}) => {
	return (
		<div
			className={cx(styles.DetailsContainer, {
				isNFTView: isNFTView,
			})}
		>
			<div className={styles.TitleBlock}>
				{title && <h1 className={styles.Title}>{title}</h1>}

				{isNFTView && (
					<div className={styles.DetailsRow}>
						<Members creator={creator} owner={owner} />
						<Options domainId={id} />
					</div>
				)}

				{description && <p className={styles.Description}>{description}</p>}

				{!isNFTView && (
					<div className={styles.LinkContainer}>
						<ArrowLink
							className={styles.Link}
							href={`/${zna}/nfts?view=true`}
							replace
						>
							View Domain NFT
						</ArrowLink>
					</div>
				)}
			</div>
		</div>
	);
};
