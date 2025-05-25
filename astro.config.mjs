import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import Icons from 'unplugin-icons/vite'

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.biblys.org',
	integrations: [
		starlight({
			title: 'Documentation Biblys',
			description: 'Documentation de Biblys, le logiciel libre pour créer des boutiques de livres en ligne.',
			customCss: ['./src/styles/custom.css'],
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
								{ label: 'Précommande', link: '/administrer/catalogue/precommande' },
								{ label: 'Grille de prix', link: '/administrer/catalogue/grille-de-prix' },
								{ label: 'Fichiers téléchargeables', link: '/administrer/catalogue/fichiers-telechargeables' },
								{ label: 'Créer un article de type lot', link: '/administrer/catalogue/creer-un-article-de-type-lot' },
								{ label: 'Supprimer un article', link: '/administrer/catalogue/supprimer-un-article' },
							],
							collapsed: true,
						},
						{
							label: 'Stock',
							items: [
								{ label: 'Ajouter un livre au stock', link: '/administrer/stock/ajouter-un-livre-au-stock' },
								{ label: 'Fiche exemplaire', link: '/administrer/stock/fiche-exemplaire' },
								{ label: 'Réassocier un exemplaire', link: '/administrer/stock/reassocier-un-exemplaire-a-un-autre-article' },
								{ label: 'Créer des promotions ponctuelles', link: '/administrer/stock/creer-des-promotions-ponctuelles' },
							],
							collapsed: true,
						},
						{
							label: 'Commandes',
							autogenerate: { directory: 'administrer/commandes' },
							collapsed: true,
						},
						{
							label: 'Contenu éditorial',
							autogenerate: { directory: 'administrer/contenu' },
							collapsed: true,
						},
						{
							label: 'Financement participatif',
							autogenerate: { directory: 'administrer/crowdfunding' },
							collapsed: true,
						},
						{ label: 'CLI (ligne de commande)', link: '/administrer/cli-ligne-de-commande/' },
					],
				},
				{
					label: 'Configurer',
					autogenerate: { directory: 'configurer' }
				},
				{
					label: 'Personnaliser',
					items: [{
						label: 'Modèles',
						autogenerate: { directory: 'personnaliser/modeles' }
					},
					{
						label: 'Entités',
						autogenerate: { directory: 'personnaliser/entites' }
					}],
				},
				{
					label: 'Tutoriels',
					autogenerate: { directory: 'tutoriels' }
				},
			],
		}),
	],
	vite: {
		plugins: [Icons({ compiler: 'astro' })],
	},
});
