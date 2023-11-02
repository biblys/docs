import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Documentation Biblys',
			defaultLocale: 'fr',
			locales: {
				fr: {
					label: 'Français',
				},
			},
			social: {
				github: 'https://github.com/withastro/starlight',
			},
			sidebar: [
				{
					label: 'Administrer',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Bien commencer avec Biblys', link: '/administrer/bien-commencer-avec-biblys/' },
					],
				},
			],
		}),
	],
});
