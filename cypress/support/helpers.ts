/**
 * Takes a test ID string as a parameter and returns
 * a selector string with the "data-test-id" attribute
 * set to the specified test ID
 * @example
 * cy.get(getByDataTestId('example-test-id'))
 */
export const getByDataTestId = (testId: string) => {
	return `[data-test-id="${testId}"]`;
};
