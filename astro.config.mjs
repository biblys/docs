import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.biblys.fr',
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
			editLink: {
				baseUrl: 'https://github.com/biblys/docs/edit/main/',
			},
			social: {
				github: 'https://github.com/biblys/docs/',
			},
			sidebar: [
				{
					label: 'Installer',
					autogenerate: { directory: 'installer' }
				},
				{
					label: 'Administrer',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Bien commencer avec Biblys', link: '/administrer/bien-commencer-avec-biblys/' },
						{
							label: 'Catalogue',
							items: [
								{ label: 'Articles et exemplaires', link: '/administrer/catalogue/articles-et-exemplaires' },
								{ label: 'Fiche article', link: '/administrer/catalogue/fiche-article' },
								{ label: 'Grille de prix', link: '/administrer/catalogue/grille-de-prix' },
								{ label: 'Fichiers téléchargeables', link: '/administrer/catalogue/fichiers-telechargeables' },
								{ label: 'Créer un article de type lot', link: '/administrer/catalogue/creer-un-article-de-type-lot' },
								{ label: 'Supprimer un article', link: '/administrer/catalogue/supprimer-un-article' },
							]
						},
						{
							label: 'Stock',
							items: [
								{ label: 'Ajouter un livre au stock', link: '/administrer/stock/ajouter-un-livre-au-stock' },
								{ label: 'Fiche exemplaire', link: '/administrer/stock/fiche-exemplaire' },
								{ label: 'Réassocier un exemplaire', link: '/administrer/stock/reassocier-un-exemplaire-a-un-autre-article' },
							]
						}
					],
				},
				{
					label: 'Configurer',
					autogenerate: { directory: 'configurer' }
				},
			],
		}),
	],
});
