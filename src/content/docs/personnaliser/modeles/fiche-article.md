---
title: Fiche article
---

La fiche article représente un produit en vente sur votre site (livre papier, numérique, CD, DVD, etc.). Elle présente en général les données bibliographiques (titre, auteur, éditeur, couverture, résumé, extrait), les exemplaires associés et un bouton d'ajout au panier.

## Variables

* `article` : l'entité [Article](/personnaliser/entites/article/) de la page courante

## Exemple

```twig
<h1>{{ article.title }}</h1>

<h2>de {{ article.authors }}</h2>

{% if article.has('summary') %}

  <div class="article-summary">
    {{ article.summary|raw }}
  </div>

{% endif %}

{% if article.has('ean') %}

  <p>
    EAN : {{ article.ean }}<br>
    ISBN : {{ article.isbn }}
  </p>

{% endif %}
```

## Afficher l'image de couverture d'un article

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
