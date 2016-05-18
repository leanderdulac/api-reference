## Cartões

Sempre que você faz uma requisição através da nossa API nós guardamos as informações do portador do cartão, para que, futuramente, você possa utilizar essas informações para novas cobranças, ou implementação de features como one-click-buy.

### Objeto card

Propriedade | Tipo | Descrição
---|---|---
`brand` | `string` | Bandeira do cartão
`country` | `string` | País do cartão
`customer` | `object` | Cliente associado ao cartão
`date_created` | `string` | Data de criação do cartão no formato ISODate
`date_updated` | `string` | Data de atualização cartão no formato ISODate
`fingerprint` | `string` | Identificador do cartão na nossa base
`first_digits` | `string` | Primeiros digitos do cartão
`holder_name` | `string` | Nome do portador do cartão
`id` | `string` | Id do cartão
`last_digits` | `string` | Últimos digitos do cartão
`object` | `string` | Nome do tipo do objeto criado/modificado.
`valid` | `boolean` | Indicador de cartão válido

#### Exemplo do objeto

```json
{
    "brand": "visa",
    "country": "US",
    "customer": null,
    "date_created": "2016-03-23T03:38:57.890Z",
    "date_updated": "2016-03-23T03:52:59.435Z",
    "fingerprint": "VpmCgO7Ub/rS",
    "first_digits": "424242",
    "holder_name": "Richard Deschamps",
    "id": "card_cim4aweld001po96d8blu6prb",
    "last_digits": "4242",
    "object": "card",
    "valid": true
}
```

### Criar um cartão

Você pode armazenar os dados do cartão do seu cliente através da rota `/cards`, assim você poderá usar o `id` do objeto gerado para realizar futuras transações, no lugar do `card_hash`.

Parâmetro | Descrição
---|---
`card_number` (**Obrigatório sem card_hash**) | Número do cartão
`card_holder_name` (**Obrigatório sem card_hash**) | Nome escrito no cartão
`card_expiration_date` (**Obrigatório sem card_hash**) | Data de expiração do cartão no formato `MMYY`
---|---
`card_hash` | Dados do cartão criptografados.
---|---
`customer_id` | Id do cliente para associar ao cartão

```endpoint
POST /cards
```

#### Exemplo de requisição

```curl
# Criando um cartão
curl -X POST https://api.pagar.me/1/cards \
-u "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH:x" \
-d "card_number=4242424242424242" \
-d "card_holder_name=Richard Deschamps" \
-d "card_expiration_date=0818" \
-d "customer_id=64912"

# Criando um cartão com card_hash
curl -X POST https://api.pagar.me/1/cards \
-u "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH:x" \
-d "card_hash=preencha_aqui" \
-d "customer_id=64912"
```

```ruby
# Criando um cartão
require 'pagarme'

PagarMe.api_key = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH"

card = PagarMe::Card.new({
    "card_number" => "4242424242424242",
    "card_holder_name" => "Richard Deschamps",
    "card_expiration_month" => "08",
    "card_expiration_year" => "18"
})

card.create
```

```php
// Criando um cartão
<?php

require("pagarme-php/Pagarme.php");

Pagarme::setApiKey("ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH");

$card = new PagarMe_Card(array(
	"card_number" => "4242424242424242",
    "card_holder_name" => "Richard Deschamps",
    "card_expiration_month" => "08",
    "card_expiration_year" => "18"
));

$card->create();
```

```csharp
// Criando um cartão
PagarMeService.DefaultApiKey = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH";

Card card = new Card();
card.Number = "4242424242424242";
card.HolderName = "Richard Deschamps";
card.ExpirationDate = "0818";

card.Create();
```

#### Exemplo de resposta

```json
{
    "brand": "visa",
    "country": "US",
    "customer": null,
    "date_created": "2016-05-17T20:58:49.046Z",
    "date_updated": "2016-05-17T20:58:49.277Z",
    "fingerprint": "oumREH8fvtXY",
    "first_digits": "424242",
    "holder_name": "Richard Deschamps",
    "id": "card_ciobx9il100c3306ev0hmuxvx",
    "last_digits": "4242",
    "object": "card",
    "valid": true
}
```

### Retornar um cartão

Use a rota `/cards/:id` para retornar os dados de um cartão previamente salvo.

Parâmetro | Descrição
---|---
`id` (**Obrigatório**) | Id do cartão

```endpoint
GET /cards/{id}
```

#### Exemplo de requisição

```curl
# Retornando um cartão
curl -X GET https://api.pagar.me/1/cards/card_ciobx9il100c3306ev0hmuxvx \
-u "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH:x"
```

```ruby
# Retornando um cartão
require 'pagarme'

PagarMe.api_key = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH"

card = PagarMe::Card.find_by_id("card_ciobx9il100c3306ev0hmuxvx")
```

```php
// Retornando um cartão
<?php

require("pagarme-php/Pagarme.php");

Pagarme::setApiKey("ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH");

$card = PagarMe_Card::findById("card_ciobx9il100c3306ev0hmuxvx");
```

```csharp
// Retornando um cartão
PagarMeService.DefaultApiKey = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH";

var card = PagarMeService.GetDefaultService().Cards.Find("card_ciobx9il100c3306ev0hmuxvx");
```

#### Exemplo de resposta

```json
{
    "brand": "visa",
    "country": "US",
    "customer": null,
    "date_created": "2016-05-17T20:58:49.046Z",
    "date_updated": "2016-05-17T20:58:49.277Z",
    "fingerprint": "oumREH8fvtXY",
    "first_digits": "424242",
    "holder_name": "Richard Deschamps",
    "id": "card_ciobx9il100c3306ev0hmuxvx",
    "last_digits": "4242",
    "object": "card",
    "valid": true
}
```

