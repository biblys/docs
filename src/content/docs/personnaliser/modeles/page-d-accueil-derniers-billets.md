---
title: Page d'accueil (derniers billets)
---

Ce modèle permet de présenter sur la page d'accueil les dix derniers billets du blog (billets en ligne et ayant une date de publication dans le passé).

## Variables

* `posts` : un tableau d'entités [[Post]]

## Exemple

```twig
<h1>Dernières nouvelles</h1>
{% for post in posts %}

    <article class="post">
        <header class="header">
            <h2 class="title"><a href="/blog/{{ post.url }}">{{ post.title }}</a></h2>
            <p>Publié le {{ post.date|date("d/m/Y") }} 
                {% if post.has('category') %} dans {{ post.category.name }} {% endif %}
            </p>
        </header>
        {% if post.content %}
            <section class="content">
                {{ post.content|raw }}
            </section>
        {% endif %}
    </article>

{% endfor %}
```
