import { FC } from 'react';

import { MemberTitle } from '../../../lib/constants/labels';
import { getDomainId } from '../../../lib/util/domains/domains';
import { useDomainData } from '../../../lib/hooks/useDomainData';
import { useDomainMetadata } from '../../../lib/hooks/useDomainMetadata';

import { CTAContainer } from './ui';
import { Options } from './ui/Options';
import { Member } from '../../ui/Member';
import { SkeletonText, SkeletonTextProps } from '@zero-tech/zui/components';

import styles from './NFTDetailsCard.module.scss';

export interface DetailsCardProps {
	zna: string;
}

export const NFTDetailsCard: FC<DetailsCardProps> = ({ zna }) => {
	const domainId = getDomainId(zna);

	const { data: domain } = useDomainData(domainId);
	const { data: metadata, isLoading: isLoadingMetadata } =
		useDomainMetadata(domainId);

	const members: Member[] = [
		{ title: MemberTitle.CREATOR, address: domain?.minter },
		{ title: MemberTitle.OWNER, address: domain?.owner },
	];

	const title: SkeletonTextProps['asyncText'] = {
		text: metadata?.title,
		isLoading: isLoadingMetadata,
	};

	const description: SkeletonTextProps['asyncText'] = {
		text: metadata?.description,
		isLoading: isLoadingMetadata,
	};

	return (
		<div className={styles.Content}>
			<div className={styles.TextContainer}>
				<Title title={title} />
				<Options zna={zna} />
			</div>

			<div className={styles.FlexRowWrapper}>
				<div className={styles.FlexColumnWrapper}>
					{/* TODO: swap members and description in follow up task */}
					<Members members={members} />
					<Description description={description} />
				</div>

				{/* TODO: to be added in follow up task */}
				{/* <CTAContainer /> */}
			</div>
		</div>
	);
};

/*******************
 * Title
 *******************/

interface TitleProps {
	title: SkeletonTextProps['asyncText'];
}

const Title = ({ title }: TitleProps) => {
	return (
		<SkeletonText
			as={'h1'}
			className={styles.Title}
			asyncText={title}
			skeletonOptions={{ width: '50%' }}
		/>
	);
};

/*******************
 * Members
 *******************/

type Member = {
	title: MemberTitle;
	address: string;
};

interface MembersProps {
	members: Member[];
}

const Members = ({ members }: MembersProps) => {
	return (
		<ul className={styles.MemberContainer}>
			{members.map((member) => (
				<Member
					key={member.title}
					walletAddress={{
						text: member?.address,
						isLoading: !member?.address,
					}}
					title={member.title}
				/>
			))}
		</ul>
	);
};

/*******************
 * Description
 *******************/

interface DescriptionProps {
	description: SkeletonTextProps['asyncText'];
}

const Description = ({ description }: DescriptionProps) => {
	return (
		<SkeletonText
			className={styles.Description}
			as={'p'}
			asyncText={description}
		/>
	);
};
