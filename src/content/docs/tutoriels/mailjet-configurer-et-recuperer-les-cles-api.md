---
title: "Mailjet : configurer et récupérer les clés API"
---

Voici comment configurer Mailjet pour une utilisation avec Biblys, et récupérer les clés API qui permettront de s'y connecter.

## Ajouter une adresse d'expédition

1.  Se rendre dans [**Mon compte**](https://app.mailjet.com/account)
2.  Cliquer sur **[Ajout d'un domaine ou d'une adresse d'expéditeur](https://app.mailjet.com/account/sender)** (section **Expéditeur & Domaines**)
3.  Cliquer sur le bouton [**Ajouter une adresse d'expédition**](https://app.mailjet.com/account/sender/add)
4.  Entrer l'adresse de contact configurée dans Biblys dans le champ **Email**
5.  Pour **Types d'email** Cocher la case "les deux / je ne sais pas", sauf si vous souhaitez utiliser une autre adresse-email pour envoyer votre newsletter depuis Mailjet (dans ce cas, choisir "e-mails de votre site").
6.  Cliquer sur **Ajouter**

## Récupérer les clés API

1.  Se rendre dans [**Mon compte**](https://app.mailjet.com/account)
2.  Cliquer sur [**Paramètres SMTP et Send API**](https://app.mailjet.com/account/setup)
3.  Récupérer les valeurs des champs **Nom d'utilisateur (clé API)** et **Mot de passe (clé secrète)**

## Configurer SPF et DKIM

Facultatives mais grandement recommandées, ces entrées DNS à ajouter à votre domaine permettront d'indiquer que Mailjet, et donc Biblys, sont légitimes lorsqu'ils envoient des e-mails à partir d'adresses de votre domaine. Vous éviterez que vos newsletters et e-mails transactionnels soient considérés comme du SPAM.

1.  Se rendre dans [**Mon compte**](https://app.mailjet.com/account)
2.  Cliquer sur [**Configuration de l'authentification SPF/DKIM**](https://app.mailjet.com/account/domain)
3.  Créer les deux entrées DNS TXT selon les instructions de Mailjet
