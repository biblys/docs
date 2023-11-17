---
title: Item
---

L'entité **Item** représente un objet concret, comme un exemplaire physique dans votre stock ou un exemplaire numérique dans la bibliothèque d'un utilisateur. **Item** est toujours lié à une entité [[Article]] qui contient les données bibliographiques liées (titre, auteur, éditeur, etc.).

## Propriétés

* `item.condition` : état de l'exemplaire d'occasion
* `item.condition_details` : précisions sur l'état
* `item.id` : identifiant unique de l'exemplaire dans la base
* `item.pub_year` : année de parution (dépot légal)
* `item.selling_price` : prix de vente TTC en centimes
* `item.stockage` : emplacement
* `item.weight` : poids en grammes

## Méthodes

### item.getCartButton(text)

Retourne le code HTML du bouton d'ajout au panier pour cet exemplaire. L'argument `text` permet de préciser le texte du bouton (par défaut, il y a juste une icône).

```twig
{{ item.getCartButton('Ajouter au panier')|raw }}
```

### item.hasCover()

Retourne `true` si l'exemple a une image associée.

### item.isAvailable()

Retourne `true` si l'exemplaire est disponible, `false` sinon. Un exemplaire est considéré disponible s'il a une date d'achat dans le passé et s'il n'a pas :
* de date de vente
* de date de retour
* de date de perte

Un exemplaire dans un panier VPC est considéré comme disponible, tandis un exemplaire dans un panier caisse ne l'est pas.
