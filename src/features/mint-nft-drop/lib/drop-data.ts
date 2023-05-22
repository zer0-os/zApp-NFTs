import {
	DropInstance,
	WapeDrop,
} from '../../../lib/providers/ZsaleSdkProvider';

const WAPES_SALE: WapeDrop = {
	type: 'wape',
	contractAddress: '0x82132726A4E757294731FBb1739b0E5957D158bE',
	merkleTreeFileUri:
		'https://res.cloudinary.com/fact0ry/raw/upload/v1670283876/drops/wapes/merkle/wape-sale-mintlist-merkleTree.json',
	advanced: {
		merkleTreeFileIPFSHash: 'QmdrXFrUwdXAycSwbJNBkRAG7ee8cqNpCqJDShSVWZwgCf',
	},
};

export const CURRENT_SALE: DropInstance = WAPES_SALE;

export const SALE_NAME = 'Wilder GENs';
export const SINGULAR_NAME = 'GEN';
export const PLURAL_NAME = 'GENs';

export const FORM_HEADER_VIDEO =
	'https://res.cloudinary.com/fact0ry/video/upload/q_100,c_fit,h_426,w_672/v1678125632/zns/gens-mint-main';
export const SALE_CURRENCY = 'ETH';
