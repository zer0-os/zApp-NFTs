import { useDrop } from '../../../../lib/useDrop';
import {
	CURRENT_SALE,
	FORM_HEADER_VIDEO,
	PLURAL_NAME,
	SALE_CURRENCY,
} from '../../../../lib/drop-data';
import { useDropUserEligibility } from '../../../../lib/useDropUserEligibility';
import { useDropUserPurchases } from '../../../../lib/useDropUserPurchases';
import { useWeb3 } from '../../../../../../lib/hooks';

import { Loading } from '../Loading';
import { ArrowLink } from '@zero-tech/zui/components/Link/ArrowLink';

import styles from './Info.module.scss';

//////////
// Info //
//////////

export interface InfoProps {
	onContinue: () => void;
	onDismiss: () => void;
}

export const Info = (props: InfoProps) => {
	return (
		<section className={styles.Container}>
			<FormMedia />
			<Body />
		</section>
	);
};

//////////
// Body //
//////////

const Body = () => {
	///////////////////
	// Get sale data //
	///////////////////

	const { account } = useWeb3();
	const { data: dropData, isLoading: isLoadingDropData } =
		useDrop(CURRENT_SALE);
	const { data: isUserEligible } = useDropUserEligibility(CURRENT_SALE);
	const { data: userPurchaseData } = useDropUserPurchases(CURRENT_SALE);

	///////////////////////
	// Process sale data //
	///////////////////////

	const remaining = dropData?.amountForSale - dropData?.amountSold;
	const userRemainingPurchases =
		userPurchaseData?.max - userPurchaseData?.minted;

	///////////////////////////
	// Conditional rendering //
	///////////////////////////

	if (isLoadingDropData) {
		return <Loading text={'Loading Drop Data'} />;
	}

	if (!account) {
		return (
			<>
				<p>
					You will be able to mint {PLURAL_NAME} if your wallet was mintlisted
					in our raffle.
				</p>
				<p>
					The cost for each {PLURAL_NAME} is{' '}
					<b>
						{dropData.salePrice} {SALE_CURRENCY}
					</b>{' '}
					plus GAS.
				</p>
			</>
		);
	}

	if (remaining === 0) {
		return <p className={styles.Orange}>{PLURAL_NAME} are all sold out!</p>;
	}

	if (!isUserEligible) {
		return (
			<p className={styles.Orange}>
				Currently, GENs are only available to mintlisted supporters of Wilder
				World. If supply lasts, you will be able to mint when the mintlist sale
				ends.
			</p>
		);
	}

	if (userRemainingPurchases === 0) {
		return (
			<>
				<p className={styles.Green}>
					Congratulations, you have minted {userPurchaseData?.minted} your{' '}
					{userPurchaseData?.max} GENs.
				</p>
			</>
		);
	}

	return <Available remaining={remaining} />;
};

///////////////
// Available //
///////////////

interface AvailableProps {
	remaining: number;
}

const Available = ({ remaining }: AvailableProps) => {
	return (
		<div className={styles.Available}>
			<span>{PLURAL_NAME} Available</span>
			<h2>
				{remaining} {PLURAL_NAME} Remaining
			</h2>
			<ArrowLink
				href="https://zine.wilderworld.com/a-new-genesis-collection-is-born-introducing-wilder-gens/"
				isLinkToExternalUrl
			>
				View Sale Details
			</ArrowLink>
		</div>
	);
};

////////////////
// Form Media //
////////////////

const FormMedia = () => {
	return (
		<video
			autoPlay={true}
			className={styles.Image}
			loop={true}
			playsInline
			controls
			disablePictureInPicture
			controlsList="nodownload noremoteplayback noplaybackrate nofullscreen"
			poster={FORM_HEADER_VIDEO + '.jpg'}
			preload="metadata"
		>
			<source src={FORM_HEADER_VIDEO + '.webm'} type="video/webm"></source>
			<source src={FORM_HEADER_VIDEO + '.mp4'} type="video/mp4"></source>
			<source src={FORM_HEADER_VIDEO + '.ogv'} type="video/ogg"></source>
		</video>
	);
};
