module.exports = {
	'*.ts': ['prettier --write', 'npx eslint --fix'],
	'*.tsx': ['prettier --write', 'npx eslint --fix'],
	'*.css': ['prettier --write'],
	'*.scss': ['prettier --write'],
	'*.json': ['prettier --write'],
};
