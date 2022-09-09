module.exports = {
	presets: [
		['@babel/preset-env', { targets: { node: 'current' } }],
		'@babel/preset-typescript',
		'@babel/preset-react',
	],
	plugins: [
		[
			'module-resolver',
			{
				root: ['src'],
				alias: {
					'@features': 'src/features',
					'@pages': 'src/pages',
					'@lib': 'src/lib',
					'@types': 'src/lib/types',
				},
			},
		],
	],
};
