import { FC } from 'react';

import { useDataContainer } from '../../lib/hooks/useDataContainer';

import { Details } from './Details';
import { Banner } from './Banner';

import styles from './DomainPreview.module.scss';

type DomainPreviewProps = {
	domainId: string;
};

export const DomainPreview: FC<DomainPreviewProps> = ({ domainId }) => {
	const { domain, domainMetadata, isNFTView } = useDataContainer(domainId);

	const imageSrc = domainMetadata?.previewImage ?? domainMetadata?.image;
	const imageAlt = domainMetadata?.name ?? domain?.name;

	return (
		<>
			<div className={styles.Container}>
				<Banner imageSrc={imageSrc} imageAlt={imageAlt} isNFTView={isNFTView} />

				<Details
					id={domainId}
					zna={domain?.name}
					title={domainMetadata?.title}
					description={domainMetadata?.description}
					owner={domain?.owner}
					creator={domain?.minter}
					isNFTView={isNFTView}
				/>
			</div>
		</>
	);
};
