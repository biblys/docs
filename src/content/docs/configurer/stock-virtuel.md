---
title: Stock virtuel
---

## Stock réel

Par défaut, Biblys permet une gestion précise du stock. Chaque article a un stock d'exemplaire associé. Pour être 
vendable, un article doit avoir au moins un article en stock. Chaque vente retire un exemplaire du stock. Si le stock 
d'un article tombe à 0, l'article n'est plus vendable.

## Stock virtuel

En mode **stock virtuel**, l'administrateur n'a pas besoin de créer les exemplaires. Tant qu'un article est indiqué 
comme **disponible**, l'utilisateur pourra l'ajouter à son panier, ce qui provoquera automatiquement la création d'un 
nouvel exemplaire. Si l'article est marqué comme **indisponible**, alors il ne pourra plus être ajouté au panier.

Note : la distinction **stock réel**/**stock virtuel** ne concerne que les articles de type physique 
(livres papiers, CD, DVD, jeu, etc.). Les articles de type téléchargeable (livres numériques, livres audios, etc.) sont 
dans tous les cas gérés selon le mode **stock virtuel**. 

## Configurer le mode stock virtuel

Par défaut, Biblys est en mode **stock réel**. Pour activer, le mode **stock virtuel**, il faut ajouter une **option de 
site** avec pour clé `virtual_stock` et pour valeur `1`.
