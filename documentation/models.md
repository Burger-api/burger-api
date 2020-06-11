
### Menu ###
| Attribut        | Type    |
| --------------- | ------- |
| _id             | string  |
| name            | string  |
| default_product | string  |
| price           | number  |
| active          | boolean |
| promoted        | boolean |
| promotion_start | string  |
| promotion_end   | string  |
| limits          | Limit   |
| date            | string  |

### Limit ###
| Attributs | Type   |
| --------- | ------ |
| burgers   | number |
| drinks    | number |
| snacks    | number |
| sides     | number |
| desserts  | number |
| salads    | number |



### Order ###

| Nom                 | Type de donnée  |
| ------------------- | --------------- |
| menus               | menuSchema[]    |
| standalone_products | productSchema[] |
| price               | Number          |
| status              | String          |
| customer            | String          |
| created             | Date            |


#### menuSchema ####

| Nom               | Type de donnée  |
| ----------------- | --------------- |
| original_id       | String          |
| original_products | productSchema[] |

#### productSchema ####

| Nom               | Type de donnée |
| ----------------- | -------------- |
| original_id       | String         |
| original_name     | String         |
| original_category | String         |
| original_price    | Number         |



### User ###

| Nom      | Type de donnée |
| -------- | -------------- |
| username | String         |
| email    | String         |
| password | String         |
| status   | String         |
| created  | Date           |



#### Product ####

| Attributs | Type    |
| --------- | ------- |
| active    | booléen |
| promoted  | booléen |
| _id       | string  |
| name      | string  |
| category  | string  |
| price     | number  |
| date      | string  |
| _v        | number  |