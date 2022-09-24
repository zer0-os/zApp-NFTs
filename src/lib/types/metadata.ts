export interface Attribute {
	trait_type: string;
	value: string | number;
}

// typing for parseDomainMetadata()
interface Meta {
	[key: string]: any | undefined;
	image: string;
	animation_url?: string;
	isBiddable?: boolean;
	gridViewByDefault?: boolean;
	customDomainHeader?: boolean;
	previewImage?: string;
	customDomainHeaderValue?: string;
	image_full?: string;
	attributes?: Attribute[];
}

export interface Metadata extends Meta {
	title: string;
}
