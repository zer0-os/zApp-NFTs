import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths(), nodePolyfills()],
	root: 'dev-environment',
	resolve: {
		alias: {
			// This is a temporary fix as zUI uses react-router-dom v6 and this app uses v5
			'react-router-dom': require.resolve('react-router-dom'),
		},
	},
	define: {
		// VITE_: process.env.VITE_,
	},
});
