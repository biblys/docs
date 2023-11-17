---
title: Liste d'articles
---

**Liste d'articles** est un modèle partiel, c'est-à-dire qu'il peut être inclus dans un autre modèle. Il est utilisé pour afficher une liste d'articles.

## Variables

* `articles` : un tableau d'entité [[Article]]

## Exemple

```twig
<table class="table">
    <tbody>
        {% for article in articles %}
            <tr>
                <td>
                  <a href="/{{ article.url }}">{{ article.title }}</a>
                </td>
                <td>
                	{{ article.authors }}
                </td>
            </tr>
        {% endfor %}
    </tbody>
</table>
```
