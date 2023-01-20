import '@testing-library/jest-dom/extend-expect';

jest.mock('remark-emoji', () => jest.fn());
jest.mock('remark-gemoji', () => jest.fn());
jest.mock('@uiw/react-md-editor', () => jest.fn());

// We need to mock ResizeObserver to test the dropdown menu's.
// See https://github.com/radix-ui/primitives/issues/420#issuecomment-1125837782.
(global as any).ResizeObserver = class ResizeObserver {
	constructor(cb: any) {
		(this as any).cb = cb;
	}

	observe() {
		(this as any).cb([{ borderBoxSize: { inlineSize: 0, blockSize: 0 } }]);
	}

	unobserve() {}
};

(global as any).DOMRect = {
	fromRect: () => ({
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		width: 0,
		height: 0,
	}),
};
