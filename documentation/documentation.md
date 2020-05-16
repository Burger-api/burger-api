# API Burger #
## Descriptif ##
API de gestion d'utilisateurs, de produits et de commandes alimentaires.

### Informations ###

Concernant les différentes valeurs de retour présentes dans la documentation, leur lecture se fera dans le fichier `models.md` qui contient ces structures.

## Routes ##

## <ins>/users/me<ins> ##

### Type de requête ###
`GET`

### Descriptif ###
Récupère les informations de l'utilisateur qui requête

#### Contraintes ####
Nécessite un token d'authentification.  

#### Paramètres ####
Aucun

#### Body ####
Aucun

#### Retour ####

| Nom  | Type de donnée |
|---|---| 
| success | Boolean |
| user  | User  | 

#### Codes d'erreurs ####
Aucun
---
## <ins>/users/search<ins> ##

### Type de requête ###
`GET`

### Descriptif ###
Récupère un utilisateur par rapport à son nom d'utilisateur

#### Contraintes ####
Nécessite un token d'authentification.  
Nécessite d'être admin.

#### Paramètres ####
Aucun

#### Body ####
Aucun

#### Queries ####

| Nom  | Type de donnée | Optionnel |
|---|---| --- |
| username | String | Non |

#### Retour ####

| Nom  | Type de donnée |
|---|---| 
| success | Boolean |
| user  | User  | 

#### Codes d'erreurs ####
| Code HTTP  | Raison |
|---|---|
| 400   | `"username" parameter must be a string.`  |
| 400   | `"username" parameter required.`  |
---
## <ins>/users/:id<ins> ##

### Type de requête ###
`GET`

### Descriptif ###
Récupère un utilisateur par son id

#### Contraintes ####
Nécessite un token d'authentification.  
Nécessite d'être admin.

#### Paramètres ####
| Nom  | Type de donnée | Optionnel |
|---|---| --- |
| id | String | Non |

#### Body ####
Aucun

#### Retour ####

| Nom  | Type de donnée |
|---|---| 
| success | Boolean |
| user  | User  | 

#### Codes d'erreurs ####
| Code HTTP  | Raison |
|---|---|
| 404   | `This user doesn't exist.`  |
---
## <ins>/users/:id/status<ins> ##

### Type de requête ###
`GET`

### Descriptif ###
Modifie le statuts d'un utilisateur

#### Contraintes ####
Nécessite un token d'authentification.  
Nécessite d'être admin.

#### Paramètres ####
| Nom  | Type de donnée | Optionnel |
|---|---| --- |
| id | String | Non |

#### Body ####

| Nom  | Type de donnée | Optionnel |
|---|---| --- |
| status | String | Non |

#### Retour ####

| Nom  | Type de donnée |
|---|---| 
| success | Boolean |

#### Codes d'erreurs ####
| Code HTTP  | Raison |
|---|---|
| 501   | `Something went wrong.`  |
|   |   |
|   |   |
|   |   |
|   |   |
|   |   |
---

## <ins>/products<ins> ##

### Type de requête ###
`POST`

### Descriptif ###
Permet la création d'un nouveau produit

#### Contraintes ####
Nécessite un token d'authentification 
Nécessite d'être admin

#### Valeur de retour ####
Aucune

#### Paramètres ####
Aucun

#### Body ####
| Nom | Type | Requis |
|---|---|---|
| name | string | Oui |
| category | string | Oui |
| price | number | Oui |

#### Valeur de retour ####
| Attribut | Valeur |
|---|---|
| success | booléen |
| product | Product |

#### Codes d'erreurs ####
| Code HTTP  | Raison |
|---|---|
| 409 | Un produit du même nom déjà existant |
| 500 | Erreur Interne du Serveur |

---

## <ins>/products<ins> ##

### Type de requête ###
`GET`

### Descriptif ###
Permet de lister l'ensemble des produits

#### Contraintes ####
Aucune

#### Paramètres ####
Aucun

#### Valeur de retour ####
| Attribut | Valeur |
|---|---|
| success | booléen |
| products | Product[] |

#### Codes d'erreurs ####
| Code HTTP  | Raison |
|---|---|
| 500 | Erreur interne du serveur |
---

## <ins>/products/{id}<ins> ##

### Type de requête ###
`GET`

### Descriptif ###
Permet la récupération d'un produit spécifique

#### Contraintes ####
Aucune

#### Valeur de retour ####
Un objet représentant un produit

#### Paramètres ####
| Nom  | Type de donnée | Optionnel |
|---|---| --- |
| id | string | non |

#### Codes d'erreurs ####
| Code HTTP  | Raison |
|---|---|
| 404 | Le produit n'existe pas |
| 500 | Erreur interne du serveur |
---

## <ins>/products/{id}<ins> ##

### Type de requête ###
`PUT`

### Descriptif ###
Met à jour un produit

#### Contraintes ####
Nécessite un token d'authentification.
Nécessite d'être admin.

#### Body ####
| Nom | Type | Requis |
|---|---|---|
| name | string | Non |
| category | string | Non |
| price | number | NOn |

#### Paramètres ####
| Nom  | Type de donnée | Optionnel |
|---|---| --- |
| id | string | Non |

#### Valeur de retour ####
| Attribut | Valeur |
|---|---|
| success | booléen |

#### Codes d'erreurs ####
| Code HTTP  | Raison |
|---|---|
| 400 | Les paramètres soumis sont invalides |
| 401 | Le produit n'existe pas |
| 409 | Un produit du même nom déjà existant |
| 500 | Erreur interne du serveur |
---
## <ins>/products/categories/{category}<ins> ##

### Type de requête ###
`GET`

### Descriptif ###
Permet de lister l'ensemble des produits d'une catégorie donnée

#### Contraintes ####
Aucune

#### Paramètres ####
| Nom  | Type de donnée | Optionnel |
|---|---| --- |
| category | string | Non |

#### Valeur de retour ####
| Attribut | Valeur |
|---|---|
| success | booléen |
| products | Product[] |

#### Codes d'erreurs ####
| Code HTTP  | Raison |
|---|---|
| 400 | Les paramètres soumis sont invalides |
| 404 | Aucun produit de cette catégorie existe |
| 500 | Erreur interne du serveur |

## <ins>/products/{id}/activate<ins> ##

### Type de requête ###
`PUT`

### Descriptif ###
Active ou désactive un produit spécifique

#### Contraintes ####
Nécessite un token d'authentification
Nécessite d'être admin

#### Body ####
| Nom | Type | Requis |
|---|---|---|
| active | booléen | Oui |

#### Paramètres ####
| Nom  | Type de donnée | Optionnel |
|---|---| --- |
| id | string | non |

#### Valeur de retour ####
| Attribut | Valeur |
|---|---|
| success | booléen |

#### Codes d'erreurs ####
| Code HTTP  | Raison |
|---|---|
| 400 | Les paramètres soumis sont invalides |
| 404 | Le produit n'existe pas |
| 500 | Erreur interne du serveur |

---

## <ins>/menus<ins> ##

### Type de requête ###
`GET`

### Descriptif ###
Permet de récupérer tous les menus actifs.

#### Contraintes ####
Aucune.

#### Valeur de retour ####
| Attribut | Valeur |
|---|---|
| success | true |
| menus | Menu[] |

#### Paramètres ####
Aucun.

#### Codes d'erreurs ####
| Code HTTP  | Raison |
|---|---|
| 500 | `Internal Server Error`  |

## <ins>/menus/{id}<ins> ##

### Type de requête ###
`GET`

### Descriptif ###
Permet de récupérer un menu spécifique.

#### Contraintes ####
Aucune.

#### Valeur de retour ####
| Attribut | Valeur |
|---|---|
| success | true |
| menus | Menu |

#### Paramètres ####
| Nom | Type |
|---|---|
| id | string |

#### Codes d'erreurs ####
| Code HTTP  | Raison |
|---|---|
| 400 | `Invalid parameters`  |
| 404 | `Resource not found`  |
| 500 | `Internal Server Error`  |

---

## <ins>/menus/disabled<ins> ##

### Type de requête ###
`GET`

### Descriptif ###
Permet de récupérer tous les menus inactifs.

#### Contraintes ####
Aucune.

#### Valeur de retour ####
| Attribut | Valeur |
|---|---|
| success | true |
| menus | Menu[] |

#### Paramètres ####
Aucun.

#### Codes d'erreurs ####
| Code HTTP  | Raison |
|---|---|
| 500 | `Internal Server Error`  |

---

## <ins>/menus/promotions<ins> ##

### Type de requête ###
`GET`

### Descriptif ###
Permet de récupérer toutes les promotions.

#### Contraintes ####
Aucune.

#### Valeur de retour ####
| Attribut | Valeur |
|---|---|
| success | true |
| menus | Menu[] |

#### Paramètres ####
Aucun.

#### Codes d'erreurs ####
| Code HTTP  | Raison |
|---|---|
| 500 | `Internal Server Error`  |

---

## <ins>/menus/promotions/permanent<ins> ##

### Type de requête ###
`GET`

### Descriptif ###
Permet de récupérer toutes les promotions permanentes.

#### Contraintes ####
Aucune.

#### Valeur de retour ####
| Attribut | Valeur |
|---|---|
| success | true |
| menus | Menu[] |

#### Paramètres ####
Aucun.

#### Codes d'erreurs ####
| Code HTTP  | Raison |
|---|---|
| 500 | `Internal Server Error`  |

---

## <ins>/menus/promotions/ongoing<ins> ##

### Type de requête ###
`GET`

### Descriptif ###
Permet de récupérer toutes les promotions à durée limitée.

#### Contraintes ####
Aucune.

#### Valeur de retour ####
| Attribut | Valeur |
|---|---|
| success | true |
| menus | Menu[] |

#### Paramètres ####
Aucun.

#### Codes d'erreurs ####
| Code HTTP  | Raison |
|---|---|
| 500 | `Internal Server Error`  |

---

## <ins>/menus/promotions/ended<ins> ##

### Type de requête ###
`GET`

### Descriptif ###
Permet de récupérer toutes les promotions dont la durée limitée a été dépassée.

#### Contraintes ####
Aucune.

#### Valeur de retour ####
| Attribut | Valeur |
|---|---|
| success | true |
| menus | Menu[] |

#### Paramètres ####
Aucun.

#### Codes d'erreurs ####
| Code HTTP  | Raison |
|---|---|
| 500 | `Internal Server Error`  |

---

## <ins>/menus<ins> ##

### Type de requête ###
`POST`

### Descriptif ###
Ajoute un nouveau menu.

#### Contraintes ####
Nécessite un token d'authentification.  
Nécessite d'être admin.

#### Valeur de retour ####
| Attribut | Valeur |
|---|---|
| success | true |
| menus | Menu |

#### Body ####

| Nom | Type | Requis |
|---|---|---|
| name | string | Oui |
| products | string[]  | Oui |
| limits | Limit | Oui |
| price | number | Oui |
| promotion_start | string | Non |
| promotion_end | string | Non |

###### Limit ######

| Attributs | Type | Requis |
|---|---|---|
| burgers | number | Non
| drinks | number | Non
| snacks | number | Non
| sides | number | Non
| desserts | number | Non
| salads | number | Non


#### Codes d'erreurs ####
| Code HTTP  | Raison |
|---|---|
| 400 | `This name is already used for an existing menu`  |
| 400 | `A menu contains at least two products` |
| 400 | `The default products do not match with the limits set` |
| 500 | `Internal Server Error` |

---

## <ins>/menus/{id}<ins> ##

### Type de requête ###
`PUT`

### Descriptif ###
Modifie un menu spécifique.

#### Contraintes ####
Nécessite un token d'authentification.  
Nécessite d'être admin.

#### Valeur de retour ####
| Attribut | Valeur |
|---|---|
| success | true |

#### Paramètres ####
| Nom | Type |
|---|---|
| id | string |

#### Body ####

| Nom | Type | Requis |
|---|---|---|
| name | string | Oui |
| products | string[]  | Oui |
| limits | Limit | Oui |
| price | number | Oui |
| promotion_start | string | Non |
| promotion_end | string | Non |

###### Limit ######

| Attributs | Type | Requis |
|---|---|---|
| burgers | number | Non
| drinks | number | Non
| snacks | number | Non
| sides | number | Non
| desserts | number | Non
| salads | number | Non


#### Codes d'erreurs ####
| Code HTTP  | Raison |
|---|---|
| 400 | `This name is already used for an existing menu`  |
| 400 | `A menu contains at least two products` |
| 400 | `The default products do not match with the limits set` |
| 500 | `Internal Server Error` |

---

## <ins>/highlights<ins> ##

### Type de requête ###
`GET`

### Descriptif ###
Permet de récupérer tous les menus et produits mis en avant.

#### Contraintes ####
Aucune.

#### Valeur de retour ####
| Attribut | Valeur |
|---|---|
| success | true |
| highlights | Menu[] & Product[] |

#### Paramètres ####
Aucun.

#### Codes d'erreurs ####
| Code HTTP  | Raison |
|---|---|
| 500 | `Internal Server Error`  |

 ---
 
 ## <ins>/highlights/{id}<ins> ##
 
 ### Type de requête ###
 `PUT`
 
 ### Descriptif ###
 Modifie un menu ou produit pour le mettre en avant.
 
 #### Contraintes ####
 Nécessite un token d'authentification.  
 Nécessite d'être admin.
 
 #### Valeur de retour ####
 | Attribut | Valeur |
 |---|---|
 | success | true |
 
 #### Paramètres ####
 | Nom | Type |
 |---|---|
 | id | string |
 
 #### Body ####
 
 | Nom | Type | Requis |
 |---|---|---|
 | promoted | boolean | Oui |
 
 
 #### Codes d'erreurs ####
 | Code HTTP  | Raison |
 |---|---|
 | 400 | `Invalid parameters`  |
 | 404 | `Resource does not exist` |
 | 500 | `Internal Server Error` |
 
 ---

## <ins>/orders<ins> ##

### Type de requête ###
`GET`

### Descriptif ###
Récupère toutes les commandes.

#### Contraintes ####
Nécessite un token d'authentification.  
Nécessite d'être admin.

#### Paramètres ####
Aucun

#### Body ####
Aucun

#### Retour ####

| Nom  | Type de donnée |
|---|---| 
| success | Boolean |
|  orders | Orders[]  | 

#### Codes d'erreurs ####
| Code HTTP  | Raison |
|---|---|
| 500   | `Internal server Error`  |

--- 
## <ins>/orders/{id}<ins> ##

### Type de requête ###
`GET`

### Descriptif ###
Retourne une order spécifique.

#### Contraintes ####
Nécessite un token d'authentification.  
Nécessite d'être admin.

#### Paramètres ####
| Nom  | Type de donnée | Optionnel |
|---|---| --- |
|  id | string  | non  |

#### Body ####
Aucun

#### Retour ####

| Nom  | Type de donnée |
|---|---| 
| success | Boolean |
| order  | Order  | 

#### Codes d'erreurs ####
| Code HTTP  | Raison |
|---|---|
| 400  | `Invalid parameters.` |
| 400  | `Resource does not exist.` |
| 500  | `Internal server error.`  |

---
## <ins>/orders/pending<ins> ##

### Type de requête ###
`GET`

### Descriptif ###
Récupère toutes les requêtes en attente d'être délivrée 

#### Contraintes ####
Nécessite un token d'authentification.  
Nécessite d'être préparateur.

#### Paramètres ####
Aucun

#### Body ####
Aucun

#### Retour ####

| Nom  | Type de donnée |
|---|---| 
| success | Boolean |
| orders  | Order[]  | 

#### Codes d'erreurs ####
| Code HTTP  | Raison |
|---|---|
| 500   | `Internal server Error`  |
---
## <ins>/orders/user/{id} ##

### Type de requête ###
`GET` 

### Descriptif ###
Récupère les orders liées à un utilisateur précis

#### Contraintes ####
Nécessite un token d'authentification.  
Nécessite d'être Customer.

#### Paramètres ####
| Nom  | Type de donnée | Optionnel |
|---|---| --- |
| id  | String  | Non  |

#### Body ####
Aucun

#### Retour ####

| Nom  | Type de donnée |
|---|---| 
| success | Boolean |
| orders | Order[] |


#### Codes d'erreurs ####
| Code HTTP  | Raison |
|---|---|
| 400  | `Invalid parameters.`  |
| 404  | `Resource does not exist.`  |
| 500   | `Internal server Error`  |

---
## <ins>/orders<ins> ##

### Type de requête ###
`POST`

### Descriptif ###
Ajoute une order.  
Lie un utilisateur à son order si connectedUserId est fourni.  
Inscrit un status personnalisé, sinon l'order sera en 'pending'.

#### Contraintes ####
Nécessite un token d'authentification.  
Nécessite d'être customer.

#### Paramètres ####
Aucun

#### Body ####
| Nom  | Type de donnée | Optionnel |
|---|---| --- |
| menusData | menusData[] | Non |
| standaloneProducts  | String[]  | Non  |
| connectedUserId  | String  | Oui  |
| status  | String  | Oui  |

##### menusData ##### 
| Nom  | Type de donnée | Optionnel |
|---|---| --- |
| id | String | Non |
| Products  | String[]  | Non  |

#### Retour ####

| Nom  | Type de donnée |
|---|---| 
| success | Boolean |
| order  | Order  | 

#### Codes d'erreurs ####
| Code HTTP  | Raison |
|---|---|
| 400  |  `Required menu doesn't exist` |
| 400  |  `Passed list of products doesn't match menu limit` |
| 400  |  `One of the passed product doesn't exist` |
| 500   | `Internal server Error`  |
---
## <ins>/orders/checkin/{id}<ins> ##

### Type de requête ###
`PUT`

### Descriptif ###
Valide la livraison d'une order

#### Contraintes ###
Nécessite un token d'authentification.  
Nécessite d'être préparateur.

#### Paramètres ####
| Nom  | Type de donnée | Optionnel |
|---|---| --- |
|  id | string  | Non  |

#### Body ####
Aucun

#### Retour ####

| Nom  | Type de donnée |
|---|---| 
| success | Boolean |

#### Codes d'erreurs ####
| Code HTTP  | Raison |
|---|---|
| 400  | `Invalid parameters.`  |
| 404  | `Resource does not exist.`  |
| 500   | `Internal server Error`  |
---
## <ins>/orders/{id}<ins> ##

### Type de requête ###
`DELETE` 

### Descriptif ###
Supprime une order 

#### Contraintes ####
Nécessite un token d'authentification.  
Nécessite d'être admin.

#### Paramètres ####
| Nom  | Type de donnée | Optionnel |
|---|---| --- |
| id  | String  | Non  |

#### Body ####
Aucun.

#### Retour ####

| Nom  | Type de donnée |
|---|---| 
| success | Boolean |


#### Codes d'erreurs ####
| Code HTTP  | Raison |
|---|---|
| 400  | `Invalid parameters.`  |
| 404  | `Resource does not exist.`  |
| 500   | `Internal server Error`  |
