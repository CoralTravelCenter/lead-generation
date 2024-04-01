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
					'https://new.coral.ru/hotels/turkey/kleopatra-smile-hotel-alanya/?qp=lWOJw1XDa14WeujkN6zDTsEo8K1rnZqbMpxcaqVYEbYo48fogE%2fWeAAarhFZrjbm6dz74xYsJBJPJLJI7ZmWb1C%2bNj%2bHc0De1y4fUzoPxgF85zRHBhzHspeC5vW6V5M6EQnu9mjC2AigQXojtw7FY8B30t9rRCf822KwKI8lBGQoiQ2iXVIfldL7LSROB6IKhiBp2QcZPcjtgTOztrqthRsZD7JRjRFmHA0jFQBKQDD0FXeS2myFcHacnd9UI%2fgodZb4seknMYBgUG4SUsAfK3hpGDKwwpKWlwLT9FtwaMV3KAs6C2OCKmEJMtv%2f2GBc&p=1&s=0'
				],
			},
		}),
	],
	build: {
		minify: 'terser', // Используйте 'terser' для минификации JS
		cssCodeSplit: true, // Включите, если хотите минифицировать CSS
	}
});
