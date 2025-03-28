---
title: Article
---

L'entité **Article** représente un produit abstrait disponible sur votre site, le plus souvent un livre (à la différence
de l'entité [[Item]] qui représente un objet concret) avec les informations bibliographiques liées.

| Propriété          | Type         | Description                                                                                                                         |
|--------------------|--------------|-------------------------------------------------------------------------------------------------------------------------------------|
| `id`               | `int`        | identifiant unique du livre dans la base                                                                                            |
| `ean`              | `string`     | code EAN (au format EAN-13, sans tiret)                                                                                             |
| `isbn`             | `string`     | code ISBN pour un livre (au format ISBN-13)                                                                                         |
| `title`            | `string`     | titre de l'article                                                                                                                  |
| `authors`          | `string`     | liste des auteurs, séparés par des virgules                                                                                         |
| `collection`       | `Collection` | collection de l'article                                                                                                             |
| `publisher`        | `Publisher`  | éditeur de l'article (défini par celui de la collection)                                                                            |
| `cycle`            | `Cycle`      | cycle de l'article                                                                                                                  |
| `price`            | `int`        | prix de l'article en centimes (voir Prix d'un article)                                                                              |
| `subtitle`         | `string`     | sous-titre de l'article                                                                                                             |
| `title_original`   | `string`     | titre de l'article dans la langue originale (si traduction)                                                                         |
| `title_others`     | `string`     | autres titres de l'article (utile pour faire ressortir l'article même si l'utilisateur cherche avec le titre d'une ancienne édition |
| `copyright`        | `string`     | année du copyright                                                                                                                  |
| `langOriginal`     | `Language`   | langue d'origine                                                                                                                    |
| `originCountry`    | `Country`    | pays d'origine                                                                                                                      |
| `ageRange`         | `string`     | âge conseillé, sous la forme "à partir de *X* ans", "jusqu'à *X* ans" ou "de *X* à *Y* ans"                                         |
| `shaping`          | `string`     | façonnage de l'article                                                                                                              |
| `printing_process` | `string`     | procédé d'impression de l'article                                                                                                   |
| `format`           | `string`     | format (physique) de l'article                                                                                                      |
| `weight`           | `string`     | poids de l'article                                                                                                                  |
| `tags`             | `Tag[]`      | liste de mots-clés associés à l'article                                                                                             |
| `rayons`           | `Rayon[]`    | liste de rayons associés à l'article                                                                                                |
| `awards`           | `Award[]`    | liste des récompenses obtenues                                                                                                      |
| `contents`         | `string`     | sommaire de couverture (format HTML)                                                                                                |
| `summary`          | `string`     | quatrième de couverture du livre (format HTML)                                                                                      |
| `catchline`        | `string`     | accroche de l'article (format HTML)                                                                                                 |
| `biography`        | `string`     | biographie de l'auteur·rice de l'article (format HTML)                                                                              |

### Prix d'un article

Par défaut, le prix d'un article est enregistré en base et affiché sous la forme d'un entier en centimes. Pour afficher
un prix correctement formaté à deux décimales, incluant la devise, on peut utiliser le code suivant :

```twig
article.price|price('EUR')|raw
```

## Méthodes

### article.has(property)

Permet de tester la présence de la propriété `property` pour cet article.

```twig
{% if article.has('summary') %}
	<h2>Résumé du livre</h2>
	{{ article.summary }}
{% endif %}
```

### article.hasDownloadableFiles(type)

Permet de tester la présence de fichier téléchargeables associés à l'article. Par défaut, renvoie `true` ou `false` si
n'importe quel type de fichier est présent, mais il est possible de filtrer le test avec le paramètre `type` qui peut
prendre la valeur `free` pour les fichiers publics ou `paid` pour les fichiers restreints.

```twig
    {% if article.hasDownloadableFiles('free') %}
      <p>
        Extraits
      <p>
      <p id="files">
          {% for file in article.getDownloadableFiles('free') %}
              <a href="{{ file.getUrl() }}" class="btn btn-default btn-sm"><i class="fa fa-file"></i> {{ file.getType('name') }}</a>
          {% endfor %}
        </p>
    {% endif %}
```

### `article.getAvailableItems()`

Retourne un tableau d'entité [[Item]] représentant les exemplaires en stock pour cet article.

```twig
{% for item in article.getAvailableItems() %}
  {{ item.getCartButton('Ajouter au panier')|raw }}
  {{ item.selling_price|currency(true)|raw }}
{% endfor %}
```

### article.getCheapestAvailableItem()

Retourne une unique entité [[Item]] représentant l'exemplaire en stock le moins cher.

```twig
{% set item = article.getCheapestAvailableItem() %}
{{ item.getCartButton('Ajouter au panier')|raw }}
{{ item.selling_price|currency(true)|raw }}
```

### article.getContributors(): Contributor[]

Retourne un tableau d'entités [[Contributor]] correspondants à tous les contributeurs d'un livre (auteur·trice·s,
illustrateur·trice·s, traducteur·trice·s, etc.)

```twig
{% for contributor in article.getContributors() %}
  <a href="{{ path('people_show', { slug: contributor.url }) }}">
    {{ contributor.name }}
  </a>
  {% if not loop.last %},{% endif %}
{% endfor %}
```

Variantes :

- `getAuthors()`: retourne uniquement des contributeurs dont le rôle est "auteur·rice"
- `getOtherContributors()`: retourne uniquement des contributeurs dont le rôle n'est pas "auteur·rice"

### Disponibilité des articles

Ces fonctions retournent `true` ou `false` selon la disponibilité d'un article.

* `isAvailable()` : `true` si **01 - Disponible** ou **09 - Bientôt épuisé**
* `isComingSoon()`: `true` si **01** ou **09** et que la date de parution est dans le futur, ou si **02 - Pas encore
  paru**
* `isToBeReprinted()` : `true` si **03 - Réimpression en cours**
* `isSoldOut()` : `true` si **06 - Arrêt définitif de commercialisation**
* `isSoonUnavailable()` : `true` si **09 - Bientôt épuisé**
* `isPrivatelyPrinted()` : `true` si **10 - Hors commerce**

## Afficher l'image de couverture d'un article

* `hasImage` renvoie `true` si une image de couverture existe pour cet article, `false` sinon
* `imageUrl` renvoie l'url de l'image de couverture de l'article

Il est possible d'utiliser le template partiel `AppBundle:Article:_cover.html.twig` pour générer facilement le code HTML
nécessaire à l'affichage d'une image de couverture :

```twig
{% if article.model|hasImage %}
  {% include "AppBundle:Article:_cover.html.twig" with {
    article: article.model,
    class: "article__cover-image",
    rel: "lightbox"
  } %}
{% endif %}
```

## Article de type "lot"

Un article de type lot peut contenir plusieurs autres articles. Dans ce cas, les méthodes suivantes peuvent être
utiles :

* `isBundle` : renvoie `true` pour un article de type **lot**, `false` sinon
* `getArticlesFromBundle` : renvoie une collection d'entité `Article` contenus dans le lot
* `isInABundle` : renvoie `true` si l'article fait partie d'un lot
* `getBundles` : renvoie les entités `Article` de type **lot** dont l'article fait partie

Exemple d'utilisation :

```twig
{% if article.isBundle %}
  <div class="article__articles-from-bundle">
    <p>Ce lot contient les articles :</p>
    {% for articleInBundle in article.articlesFromBundle %}
      <li>
        <a href="{{ path('article_show', { slug: articleInBundle.url }) }}">
          {{ articleInBundle.title }}
        </a>
      </li>
    {% endfor %}
  </div>
{% endif %}

{% if article.isInABundle %}
  <div class="article__bundles">
    <p>Ce article fait partie des lots :</p>
    {% for bundle in article.bundles %}
      <li>
        <a href="{{ path('article_show', { slug: bundle.url }) }}">
          {{ bundle.title }}
        </a>
      </li>
    {% endfor %}
  </div>
{% endif %}
```
