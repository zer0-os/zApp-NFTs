import '@testing-library/jest-dom/extend-expect';

jest.mock('remark-emoji', () => jest.fn());
jest.mock('remark-gemoji', () => jest.fn());
jest.mock('@uiw/react-md-editor', () => jest.fn());
