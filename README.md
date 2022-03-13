# Problem Description
https://docs.google.com/document/d/1HpUM6t8XHjPs-eZwdAgr3ScCR7lYMCeeubuSycDhY48/edit?usp=sharing

# Features:
- API integration tests (partial coverage)
- Sequelize as ORM
- DB seeds (see below in scripts)

# environment valuables

```
PORT=3050
AIRTABLE_KEY="keyku8PCIbe7ZDG77"
AIRTABLE_BASE="app4TdSuvtfSTRAah"
```

# scripts
`yarn dev` watch changes in development

`npm test` run unit tests

`yarn db:init` initialize DB and seeds


# endpoints
POST `/product`  create a product
```
{
	"price": 1000,
	"name": "Galaxy S21",
	"merchant_id": 1,
	"status": "IN_STOCK"
}
```

GET `/product`  list products

GET `/order/products/:order-id`  get products list in an order

POST `/order`  create order
```
{
	"userId": 1,
	"items": [
		{"productId": 1},
		{"productId": 2},
		{"productId": 3},
		{"productId": 4}
	]
}
```

PATCH `/order/:id` add item to order
```
{
	"productId": 3
}
```

GET `/meta` get app current version/info
