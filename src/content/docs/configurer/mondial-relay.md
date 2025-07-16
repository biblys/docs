---
title: Mondial Relay
---

L'option d'expédition Mondial Relay permet aux client·es de votre site de rechercher un point relais dans une liste à 
partir d'un code postal.

![Choix du point relais](../../../assets/configurer/mondial-relay/choix-point-relais.png)

## Configurer Mondial Relay

Pour configurer Mondial Relay sur votre site Biblys, vous devez obtenir deux chaînes de caractères (clés API) : le 
**code enseigne** et la **clé privée**.

### Étape 1 : récupérer les clés API Mondial Relay

1. Créer [un compte Mondial Relay professionnel](https://www.mondialrelay.fr/connexion-inscription/?returnUrl=https://www.mondialrelay.fr/)
2. Se rendre sur le site [Mondial Relay Connect](https://connect.mondialrelay.com/YETI/Account/LogOn?ReturnUrl=%2fCC239FXF)
3. S'identifier
4. Dans le menu déroulant **Administration**, sélectionner **Configuration des API**

![Menu déroulant](../../../assets/configurer/mondial-relay/menu-deroulant.png)

5. Sur la page "Paramétrage des API", copier le **Code Enseigne** et la **Clé privée** 

![Clés API](../../../assets/configurer/mondial-relay/cles-api.png)

### Étape 2 : activer Mondial Relay sur le site

Si vous utilisez Biblys dans le cadre de l'abonnement Biblys, ou si quelqu'un gère techniquement votre site Biblys pour
vous, vous pouvez lui [transmettre les clés API de manière sécurisée](/tutoriels/transmettre-des-informations-confidentielles-de-maniere-securisee/).

Sinon, vous devez ajouter ces clés à la configuration en modifiant le fichier `config.yml` comme ceci :

```yaml
mondial_relay:
  code_enseigne: ABCD1234
  private_key: efgHijKl
```

### Étape 3 : créer un tarif Mondial Relay

L'outil de sélection du point de retrait Mondial Relay est désormais configuré sur votre site, mais pour que vos 
client·es puisse choisir ce mode d'expédition, vous devrez créer une tranche tarifaire Mondiale Relay pour l'expédition.

1. Rendez-vous sur la page **Frais de port** de l'administration de votre site
2. Cliquez sur le bouton **Ajouter une tranche**
3. Pour le **Type d'envoi**, choisissez "Mondial Relay"

![Frais de port](../../../assets/configurer/mondial-relay/frais-de-port.png)

4. Vous êtes libre de définir les autres caractéristiques (conditions, tarifs) selon votre politique de frais de port.


### Étape 4 (facultative) : récupérer le code du point relais de collecte

Si vous souhaitez utiliser la fonctionnalité d'export d'un fichier CSV de commandes pour Mondial Relay, vous devrez
également préciser l'identifiant du point relais dans lequel vous souhaitez déposer les colis (dit point de collecte).

Pour cela, vous devez :
1. Se rendre sur le site [Trouver votre point relais ou Locker](https://www.mondialrelay.fr/trouver-le-point-relais-le-plus-proche-de-chez-moi/)
2. Entrer votre code postal, votre ville et cliquer sur le bouton **Rechercher**
3. Trouver le point relais de collecte souhaité dans la liste des points relais
4. Récuperer le code du point relais de collecte : il s'agit d'un code à 5 chiffres précédé de `FR-`

![Trouver le code du point relais de collecte](../../../assets/configurer/mondial-relay/code-point-relais-collecte.png)

5. Enfin, ajouter ce code, sans le préfixe `FR-` comme valeur d'une nouvelle propriété `id_relais_collecte` enfant de la 
propriété `mondial_relay` en modifiant le fichier `config.yml` comme ceci :

```yaml
mondial_relay:
  code_enseigne: ABCD1234
  private_key: efgHijKl
  id_relais_collecte: 12345
```