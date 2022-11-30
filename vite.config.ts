import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';


// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@/pages': path.resolve(__dirname, './src/pages'),
			'@/generic': path.resolve(__dirname, './src/components/generic'),
			'@/components': path.resolve(__dirname, './src/components'),
			'@/providers': path.resolve(__dirname, './src/providers'),
			'@/services': path.resolve(__dirname, './src/services'),
			'@/assets': path.resolve(__dirname, './src/assets'),
			'@/types': path.resolve(__dirname, './src/types'),
			'@/context': path.resolve(__dirname, './src/context'),
			'@/hooks': path.resolve(__dirname, './src/hooks'),
			'@/store': path.resolve(__dirname, './src/store'),
			'@/utils': path.resolve(__dirname, './src/utils'),
			'@/styles': path.resolve(__dirname, './src/styles'),
			'@/vars': path.resolve(__dirname, './src/vars')
		}
	},
	plugins: [react()]
})