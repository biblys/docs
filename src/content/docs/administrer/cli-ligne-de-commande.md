---
title: CLI (ligne de commande)
description: Les commandes du CLI biblys
---

Le CLI (pour _Command Line Interface_) Biblys est un outil permettant d'exécuter certaines tâches depuis un terminal.

Il peut s'agir de tâche d'installation ou de mise à jour de Biblys, mais aussi de tâches de maintenance à exécuter
régulièrement (qui peuvent être lancées à l'aide d'un outil de planification des tâches comme _cron_) ou de tâches
longues qui doivent être exécutées en arrière-plan et ne peuvent donc être lancée depuis l'interface web.

## Gestion des utilisateur·ices

### Créer un compte admin

Cette commande permet de créer un compte utilisateur avec des droits d'administration et prend en paramètre une adresse
e-mail. Par exemple :

```shell
users:create-admin admin@paronymie.fr
```

L'adresse e-mail doit être valide afin que l'utilisateur·ice puisse recevoir le lien de connexion sécurisé au site.

La création d'un compte utilisateur avec des droits d'administration nécessite d'être connecté au site avec un compte
admin. Le seul moyen de créer le premier compte admin, après l'installation Biblys, est d'utiliser cette commande.
