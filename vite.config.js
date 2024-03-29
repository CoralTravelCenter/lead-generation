import {defineConfig} from 'vite';
import monkey from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		monkey({
			entry: 'src/main.js',
			userscript: {
				icon: 'https://vitejs.dev/logo.svg',
				namespace: 'npm/vite-plugin-monkey',
				match: [
					'https://new.coral.ru/hotels/turkey/kleopatra-smile-hotel-alanya/?qp=gEIDPqjHDS6F9wLPRxSMEoBdG3JUI6hJr8oCDvQxUFwDnIQKuqeOWIKHKCXfJUOkLLqQWY5Vxm94mc1%2B%2BNn%2BKDObga5Fcs5QTQia666Sr39OwIKuAAlWHCHZRn7yFhSunTd8Jp6EZq%2FHOrjhYRKSzpa9YFt3u2aIF1t67LUjBy2jp%2BB7r8OiGseyijNs1L69zRwi1eCmwXy%2FK8g1uqV5ba1bTJ5DDoCNPYBj%2FG0H7qAOEnCWhZ2ysRiqC43XICjDuDseUBV87ogTmrvfdTP9XCMGmrngobCsFnTSHRIuutexU7IG3c5c8mvZ5sUGS7Sl&p=1&w=0&s=5&hlu=packagetours%2Fmoskva-to-turtsiya-tours&hlqp=gEIDPqjHDS6F9wLPRxSMEoBdG3JUI6hJr8oCDvQxUFwDnIQKuqeOWIKHKCXfJUOkLLqQWY5Vxm94mc1%20%20Nn%20KDObga5Fcs5QTQia666Sr39OwIKuAAlWHCHZRn7yFhSuVsWtwXw4luh7%20lQu942tJ9g0eOR%2F%20r2m6X%2FrOLpToQGR8dungERDAJtIq2O67JF4T%20zwtZPHApGhjQkhQRiQiG%20lETiwHb5Alo2VZQIUes1hrzOjG6FO0zn48zbPvubaiXOOvo2rHhlFDZuFwaNNtOLnHPwuVFprEYCQ%20zZsGpE%3D'
				],
			},
		}),
	],
});
