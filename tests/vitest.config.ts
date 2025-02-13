import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
		environment: 'happy-dom',
		// typecheck: {
		// 	enabled: true,
		// },
		cache: false,
		includeTaskLocation: true,
		reporters: ['verbose']
	},
	clearScreen: true,
	
});
