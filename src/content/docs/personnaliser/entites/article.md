---
title: Article
---

L'entité **Article** représente un produit abstrait disponible sur votre site, le plus souvent un livre (à la différence de l'entité [[Item]] qui représente un objet concret) avec les informations bibliographiques liées.

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

Par défaut, le prix d'un article est enregistré en base et affiché sous la forme d'un entier en centimes. Pour afficher un prix correctement formaté à deux décimales, incluant la devise, on peut utiliser le code suivant :

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

### article.hasCover()

Permet de tester la présence d'une image de couverture pour cet article.
Retourne un booléan (`true` ou `false`).

```twig
{% if article.hasCover() %}
  {{ article.getCoverTag()|raw }}
{% endif %}
```

### article.hasDownloadableFiles(type)

Permet de tester la présence de fichier téléchargeables associés à l'article. Par défaut, renvoie `true` ou `false` si n'importe quel type de fichier est présent, mais il est possible de filtrer le test avec le paramètre `type` qui peut prendre la valeur `free` pour les fichiers publics ou `paid` pour les fichiers restreints.

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

### article.getCoverTag(options)

Retourne la couverture de l'article sous la forme d'une balise HTML (image et lien vers l'image haute définition). L'argument options est un tableau qui peut prendre les propriétés suivantes :

* `class` : la valeur de l'attribut `class` de la balise image (par défaut : aucun)
* `rel` : la valeur de l'attribut `rel` du lien (par défaut : aucun)
* `link` : l'url vers laquelle doit pointer le lien (par défaut : l'image en haute définition)
* `size` la taille de l'image sous la forme `wXXX` pour fixer la largeur ou `hXXX` pour la hauteur (par défaut : pleine résolution).

```twig
article.getCoverTag({ class: 'cover', rel: 'lightbox', size: 'w300' });
```

Générera le code HTML suivant :

```html
<a href="https://media.biblys.fr/book/05/13005.jpg" rel="lightbox">
    <img src="https://media.biblys.fr/book/05/13005-w300.jpg" class="cover" alt="Titre du livre">
</a>
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

Retourne un tableau d'entités [[Contributor]] correspondants à tous les contributeurs d'un livre (auteur·trice·s, illustrateur·trice·s, traducteur·trice·s, etc.)

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
* `isComingSoon()`: `true` si **01** ou **09** et que la date de parution est dans le futur, ou si **02 - Pas encore paru**
* `isToBeReprinted()` : `true` si **03 - Réimpression en cours**
* `isSoldOut()` : `true` si **06 - Arrêt définitif de commercialisation**
* `isSoonUnavailable()` : `true` si **09 - Bientôt épuisé**
* `isPrivatelyPrinted()` : `true` si **10 - Hors commerce**
