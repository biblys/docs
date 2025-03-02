---
title: Installer Biblys sur un hébergement mutualisé
---

:::tip[Vous n'avez pas encore d'hébergeur ?]
Biblys recommande [alwaysdata](https://www.alwaysdata.com/fr/inscription/?from=215e2fb8) (lien sponsorisé) pour la
qualité de son service, la réactivité de son support technique et la facilité d'utilisation de son interface.
:::

## Préambule

La procédure d'installation nécessite pour l'instant certaines opérations manuelles qui sont décrites ci-dessous. Un
bon nombre d'entre elles seront automatisées à l'avenir afin de faciliter au maximum l'installation. Si vous rencontrez
des difficultés, vous pouvez 
[demander de l'aide sur Github](https://github.com/biblys/biblys/discussions/categories/probl%C3%A8mes-techniques).

## Pré-requis

Biblys peut en théorie s'installer chez n'importe quel hébergeur mutualisé, sous réserve des pré-requis suivant :

- PHP 8.1 ou plus
- MySQL 8 ou plus
- Un accès SSH avec git et [composer](https://getcomposer.org)

Biblys a été installé avec succès chez les hébergeurs
[alwaysdata](https://www.alwaysdata.com/fr/inscription/?from=215e2fb8) (lien sponsorisé) et
[OVH](https://www.ovhcloud.com/fr/web-hosting/). Si vous avez installé Biblys chez un autre hébergeur, mettez à jour
cette page !

Vous aurez également besoin d'un service d'envoi d'e-mail avec accès SMTP pour que Biblys puisse envoyer des e-mails.
Une simple boîte mail fournie par votre hébergeur peut faire l'affaire.

Biblys permet par défaut d'accepter les paiements par chèque ou virement. Pour proposer le paiement sécurisé par carte
bancaire, il vous faudra un compte chez l'un des deux services compatibles : [Stripe](https://stripe.com/fr) et
[Payplug](https://www.payplug.com/fr/). Biblys permet également d'accepter les paiement avec un compte
[Paypal](https://www.paypal.com/fr/home).

## Installer Biblys

**1. Pour commencer, clonez le dépôt git pour récupérer le code source de Biblys :**

```shell
git clone -b main https://github.com/biblys/biblys.git biblys
```

**2. Placez-vous dans le répertoire qui a été créé :**

```shell
cd biblys
```

**3. Installer les dépendances**

```shell
composer install
```

**4. Installer un thème**

Le thème est à installer dans le dossier `app` de Biblys.

À moins que vous ayez déjà créé un thème personnalisé, vous pouvez installer le thème par défaut avec la commande
suivante et le personnaliser par la suite :

```shell
git clone https://github.com/biblys/biblys-theme-starter.git app
```

**5. Rafraichir les fichiers statiques**

Cette commande est à exécuter à chaque modification d'un fichier statique (styles css, fichiers javascript, images…)
dans le dossier `app`. Comme nous avons installé un nouveau thème, il faut le faire.

```shell
composer theme:refresh
```

**6. Copier le fichier de configuration**

```shell
cp config.example.yml config.yml 
```

**7. Configurer la base de données**

Vous pouvez éditer le fichier à l'aide d'un éditeur texte, comme vim ou nano.

Par exemple, avec vim :

```shell
vim config.yml
```

Renseigner l'option de configuration `db` avec les informations de connexion à la base de données fournies par votre
hébergeur :

```yaml
db:
  host: localhost
  port: 3306
  user: biblys
  pass: abcd1234…
  base: biblys
```

**8. Exécuter les migrations.**

La commande suivante est à lancer à chaque mise à jour de Biblys pour mettre à jour le schema de base de données. Au
premier lancement, le schema de la base de données sera créé.

```shell
composer db:migrate
```

**9. Ajouter un secret pour l'authentification**

Générer une châine de caractères aléatoire de 32 caractères :

```shell
openssl rand -hex 16
```

Ajouter la chaine de caractères obtenue pour l'option de configuration `authentication.secret` du fichier `config.yml`

```yaml
authentication:
  secret: abcd1234…
```

**10. Configurer l'envoi d'e-mail**

Renseigner l'option `smtp` avec les informations fournies par votre hébergeur de boite e-mail ou votre service d'envoi
d'email.

```yaml
smtp:
  host: mail.example.org
  user: mail@example.org
  pass: abcd1234…
  port: 465
  encryption: tls
```

**11. Choisir l'environnement de production**

Dans le fichier `config.yml`, passer l'environnement de `dev` à `prod`.

**12. Configurer le site**

Pour que Biblys fonctionne, il faut créer une entrée dans la table `sites`. Cela doit se faire manuellement aujourd'hui.
Les colonnes à remplir obligatoirement sont :

- `site_name` : un nom court, sans espaces ni caractères spéciaux
- `site_title` : le nom complet du site
- `site_domain` : le nom de domaine du site (avec éventuellement le sous-domaine `www` mais sans `https//`)
- `site_contact` : une adresse e-mail de contact

Voici un exemple de requête SQL à exécuter :

```sql
INSERT INTO `sites`
(`site_name`, `site_title`, `site_domain`, `site_contact`, `site_created`, `site_updated`)
VALUES ('paronymie', 'Éditions Paronymie', 'paronymie.fr', 'contact@paronymie.fr', NOW(), NOW());
```

**13. Créer un compte admin**

Le compte du premier utilisateur doit également être créé manuellement à l'aide de la commande suivante.
La seule information nécessaire est l'adresse e-mail. Elle doit être valide afin que vous puissiez recevoir le lien de 
connexion.

```shell
users:create-admin admin@paronymie.fr
```

**14. Configurer le serveur web**

Pour finir, il faut configurer le serveur web de votre hébergement pour que votre nom de domaine pointe sur le dossier
`public` dans le dossier `biblys`. Cela se fait dans l'interface de votre hébergement web.

**15. Accéder à l'administration**

Vous devriez à présent avoir accès à l'administration de votre site en ajoutant `/admin/` à votre nom de domaine !

Quelque chose ne fonctionne pas ?
[Demandez de l'aide sur Github](https://github.com/biblys/biblys/discussions/categories/probl%C3%A8mes-techniques).
