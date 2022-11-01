import { IconUniswap, IconKucoin, IconGateio } from '../Icons';

import styles from './ExternalLinks.module.scss';

const links = [
	{
		title: 'Uniswap',
		href: 'https://app.uniswap.org/#/swap?outputCurrency=0x2a3bff78b79a009976eea096a51a948a3dc00e34&inputCurrency=ETH&use=V2',
		icon: <IconUniswap />,
	},
	{
		title: 'Kucoin',
		href: 'https://www.kucoin.com/',
		icon: <IconKucoin />,
	},
	{
		title: 'Gate.io',
		href: 'https://www.gate.io/',
		icon: <IconGateio />,
	},
];

export const ExternalLinks = () => (
	<ul className={styles.ExternalLinks}>
		{links.map((item) => (
			<li key={item.title}>
				<a
					className={styles.Link}
					target="_blank"
					rel="noreferrer"
					href={item.href}
				>
					{item.icon}
					<p>{item.title}</p>
				</a>
			</li>
		))}
	</ul>
);
