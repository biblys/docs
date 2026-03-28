---
title: Installer Biblys sur un hébergement mutualisé
---

## Préambule

Biblys est un logiciel libre, ce qui signifie que n'importe qui peut l'installer et l'utiliser gratuitement. Son code
source [est disponible sur Github](https://github.com/biblys/biblys), où l'on trouvera également des instructions
techniques pour installer une version de développement en local, destinée aux développeur·euses et intégrateur·ices.

Ce tutoriel se veut adapté à un public non technique, mais il nécessite tout de même certaines compétences techniques.
Néanmoins, la procédure d'installation nécessite pour l'instant certaines opérations manuelles qui sont décrites
ci-dessous. Un bon nombre d'entre elles seront automatisées à l'avenir afin de faciliter au maximum l'installation. Si
vous rencontrez des difficultés, vous
pouvez [demander de l'aide sur Github](https://github.com/biblys/biblys/discussions/categories/probl%C3%A8mes-techniques).

## Pré-requis

:::note[Hébergeurs compatibles]
Biblys a été installé avec succès chez les hébergeurs
[alwaysdata](https://www.alwaysdata.com/fr/inscription/?from=215e2fb8) (lien sponsorisé) et
[OVH](https://www.ovhcloud.com/fr/web-hosting/) qui proposent tous les deux des offres d'hébergement mutualisé
compatibles avec les pré-requis de Biblys. Si vous n'avez pas encore d'hébergeur, Biblys
recommande [alwaysdata](https://www.alwaysdata.com/fr/inscription/?from=215e2fb8) (lien sponsorisé) pour la
qualité de son service, la réactivité de son support technique et la facilité d'utilisation de son interface.
:::

### Technologies

Biblys peut en théorie s'installer chez n'importe quel hébergeur mutualisé, sous réserve des pré-requis suivant :

- PHP 8.2 ou plus
- MySQL 8 ou plus

### Accès SSH

Pour installer Biblys, vous aurez besoin d'un accès SSH à votre hébergement avec les outils suivants. C'est un outil de
ligne de commande qui vous permettra d'exécuter les commandes nécessaires à l'installation et à la maintenance de
Biblys. Votre hébergeur doit vous fournir ces outils, mais n'hésitez pas à les contacter pour vérifier que c'est bien le
cas.

Une fois connecté en SSH à votre hébergement, vous devez pouvoir exécuter les commandes suivantes, assurez-vous que vous
possédez les outils `git` et `composer`.

### Git

Git permet de récupérer le code source de Biblys et de ses thèmes, pour l'installer puis le mettre à jour. Il est en
général installé par défaut sur les hébergements mutualisés. Vous pouvez le vérifier avec la commande suivante :

```shell
git --version
```

### Composer

Composer est un gestionnaire de dépendances pour PHP. Il permet d'installer les dépendances de Biblys, et d'exécuter les
commandes nécessaires à l'installation et à la maintenance de Biblys. Il est en général installé par défaut sur les
hébergements mutualisés proposant le langage PHP. Vous pouvez le vérifier avec la commande suivante :

```shell
composer --version
```

Si cette commande renvoie l'erreur `composer: command not found`, cela signifie que composer n'est pas installé. Dans ce
cas, suivez les instructions d'installation de composer pour l'installer sur votre
hébergement : [https://getcomposer.org/doc/00-intro.md#installation-linux-unix-macos](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-macos).

### Service d'envoi d'email

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

Vous pouvez éditer le fichier directement sur le serveur, à l'aide d'un éditeur texte, comme vim ou nano, ou bien le
télécharger sur votre ordinateur, le modifier avec un éditeur de texte, puis le re-télécharger sur le serveur.

Par exemple, avec vim :

```shell
vim config.yml
```

Renseigner l'option de configuration `db` avec les informations de connexion à la base de données fournies par votre
hébergeur :

```yaml
db:
  host: localhost # serveur de la base de données
  port: 3306 # port de connexion à la base de données
  base: biblys # nom de la base de données
  user: biblys # utilisateur de la base de données
  pass: abcd1234… # mot de passe de l'utilisateur de la base de données
```

**8. Exécuter les migrations.**

La commande suivante est à lancer à chaque mise à jour de Biblys pour mettre à jour le schema de base de données. Au
premier lancement, le schema de la base de données sera créé.

```shell
composer db:migrate
```

**9. Ajouter un secret pour l'authentification**

Pour sécuriser l'authentification des utilisateurs, Biblys a besoin d'une chaine de 32 caractères aléatoires. Le mieux
est de la générer directement sur le serveur avec la commande :

```shell
openssl rand -hex 16
```

Puis, il faut ajouter la chaine de caractères obtenue comme valeur de l'option de configuration `authentication.secret`
du fichier `config.yml`.

```yaml
authentication:
  secret: abcd1234…
```

**10. Configurer l'envoi des e-mails**

Il faut configurer un serveur SMTP afin que Biblys puisse envoyer des e-mails. C'est impératif, car la connexion au
site, notamment pour les administrateurs, nécessite de recevoir par e-mail un lien de connexion.

Renseigner l'option `smtp` avec les informations fournies votre service d'envoi d'emails. Vous pouvez également utiliser
une simple boîte mail fournie par votre hébergeur, à condition que celui-ci propose un accès SMTP.
d'email.

```yaml
smtp:
  host: mail.example.org # Serveur SMTP
  user: mail@example.org # Identifiant de connexion (souvent l'adresse e-mail)
  pass: abcd1234…        # Mot de passe de la boîte mail
  port: 465              # Port de connexion au serveur SMTP (souvent 465 ou 587)  
  encryption: tls        # Type de chiffrement utilisé par le serveur SMTP (souvent "ssl" ou "tls")
```

**11. Choisir le mode "production"**

Par défaut, Biblys est configuré pour fonctionner en mode "développement" (dev), ce qui signifie que les erreurs sont
affichées à l'écran, que les fichiers statiques ne sont pas mis en cache, etc. Pour un site réel, il est recommandé de
passer en mode "production" (prod).

Dans le fichier `config.yml`, passer l'environnement de `dev` à `prod`.

```yaml
environment: prod
```

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
composer users:create-admin <votre adresse e-mail>
```

Par exemple :

```shell
composer users:create-admin admin@example.org
```

**14. Configurer le serveur web**

Pour finir, il faut configurer le serveur web de votre hébergement pour que votre nom de domaine pointe sur le dossier
`public` dans le dossier `biblys`. Cela se fait dans l'interface de votre hébergement web.

**15. Accéder à l'administration**

Vous devriez à présent avoir accès à l'administration de votre site en ajoutant `/admin/` à votre nom de domaine.

Quelque chose ne fonctionne pas ?
[Demandez de l'aide sur Github](https://github.com/biblys/biblys/discussions/categories/probl%C3%A8mes-techniques).
