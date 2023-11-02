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
								{ label: 'Fiche article', link: '/administrer/bibliographie/fiche-article' },
								{ label: 'Fiche exemplaire', link: '/administrer/bibliographie/fiche-exemplaire' },
								{ label: 'Ajouter un livre au stock', link: '/administrer/bibliographie/ajouter-un-livre-au-stock' },
								{ label: 'Grille de prix', link: '/administrer/bibliographie/grille-de-prix' },
								{ label: 'Fichiers téléchargeables', link: '/administrer/bibliographie/fichiers-telechargeables' },
								{ label: 'Créer un article de type lot', link: '/administrer/bibliographie/creer-un-article-de-type-lot' },
							]
						}
					],
				},
			],
		}),
	],
});
