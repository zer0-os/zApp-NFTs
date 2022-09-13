module.exports = {
	presets: [
		'@babel/typescript',
		['@babel/preset-react', { runtime: 'automatic' }],
		[
			'@babel/preset-env',
			{
				modules: 'commonjs',
				targets: {
					esmodules: true,
				},
			},
		],
	],
	plugins: [
		[
			'transform-rename-import',
			{ original: '^(.+?)\\.scss$', replacement: '$1.css' },
		],
	],
};
