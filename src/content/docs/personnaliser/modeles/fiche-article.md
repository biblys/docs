---
title: Fiche article
---

La fiche article représente un produit en vente sur votre site (livre papier, numérique, CD, DVD, etc.). Elle présente en général les données bibliographiques (titre, auteur, éditeur, couverture, résumé, extrait), les exemplaires associés et un bouton d'ajout au panier.

## Variables

* `article` : l'entité [[Article]] de la page courante

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
