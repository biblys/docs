---
title: Créer un thème
---

Pour personnaliser l'apparence de votre site Biblys, vous pouvez créer un thème. Un thème est un ensemble de fichiers (
HTML, CSS, JavaScript, images) qui définissent le design et la mise en page de votre site.

Biblys utiliser le moteur de template [Twig](https://twig.symfony.com/) pour générer les pages HTML. Vous pouvez
consulter la [documentation de Twig](https://twig.symfony.com/doc/3.x/) pour en savoir.

## Créer un nouveau thème

Les fichiers d'un thème se trouvent dans le dossier `app` à la racine de Biblys. Si vous n'avez pas encore de thème,
vous pouvez cloner le [thème de démarrage](https://github.com/biblys/biblys-theme-starter) qui contient tous les
fichiers nécessaires.

### Arborescence d'un thème

Voici l'arborescence d'un thème Biblys :

```
app/
├── layout/
│   └── base.html.twig
├── public/
│   └── theme/
│       └── styles.css 
├── views
│   └── {Type}/
│       └── {page}.html.twig
```

- Le dossier `layout` contient le fichier `base.html.twig` qui est la vue de base utilisé par toutes les pages du
  site. Vous pouvez le modifier pour changer la structure globale des pages, par exemple l'en-tête, le pied de page, les
  éléments latéraux, etc.
- Le dossier `public/theme` contient les fichiers statiques (CSS, JavaScript, images) utilisés par le thème. Vous pouvez
  ajouter vos propres fichiers ici et les référencer dans les templates.
- Le dossier `views` contient les vues spécifiques à chaque type de page. Chaque sous-dossier correspond à un type
  de page (par exemple `Article`, pour les articles, etc.) et chaque fichier finissant `.html.twig` correspond à une
  page spécifique (par exemple `show.html.twig` pour la page de détail d'un article).

### Vue par défaut et vue du theme

Chaque vue se trouvant dans le dossier `app/views` remplace la vue par défaut située dans le dossier
`src/AppBundle/Resources/views` de votre projet Biblys. Si un fichier n'existe pas dans le dossier `app/views`, la
vue par défaut sera utilisée. Si vous souhaitez modifier une vue par défaut, vous pouvez copier le fichier
correspondant dans le dossier `app/views` en conservant le même chemin de fichier et le modifier à votre convenance.

:::caution[Ne modifiez pas les vues par défaut]
Ne modifiez pas directement les fichiers qui se trouvent dans le dossier `src/AppBundle/Resources/views`, car vos
modifications seront perdues lors de la mise à jour de Biblys. Utilisez plutôt le dossier `app/views` pour personnaliser
votre thème.
:::