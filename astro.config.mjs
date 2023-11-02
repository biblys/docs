import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Documentation Biblys',
			defaultLocale: 'root',
			locales: {
				root: {
					label: 'Français',
					lang: 'fr',
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
						{
							label: 'Bibliographie',
							items: [
								{ label: 'Articles et exemplaires', link: '/administrer/bibliographie/articles-et-exemplaires' },
							]
						}
					],
				},
			],
		}),
	],
});
