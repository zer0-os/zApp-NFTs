module.exports = {
    '**/*.(ts|tsx)': () => 'npx tsc --noEmit',
    '**/*.(ts|tsx|js)': filenames => [`npx eslint ${filenames.join(' ')}`, `npx prettier --write ${filenames.join(' ')}`],
    '*.{json,md,css,scss}': ['npx prettier --write'],
    '*.test.(ts|tsx)': ['jest']
};
