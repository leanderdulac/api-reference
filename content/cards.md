## Cartões

Sempre que você faz uma requisição através da nossa API nós guardamos as informações do portador do cartão, para que, futuramente, você possa utilizar essas informações para novas cobranças, ou implementação de features como one-click-buy.

### Objeto card

Propriedade | Tipo | Descrição
---|---|---
`object` | `string` | Nome do tipo do objeto criado/modificado.
`id` | `string` | Id do cartão
`date_created` | `string` | Data de criação do cartão no formato ISODate
`date_updated` | `string` | Data de atualização cartão no formato ISODate
`brand` | `string` | Bandeira do cartão
`holder_name` | `string` | Nome do portador do cartão
`first_digits` | `string` | Primeiros digitos do cartão
`last_digits` | `string` | Últimos digitos do cartão
`country` | `string` | País do cartão
`customer` | `object` | Cliente associado ao cartão
`fingerprint` | `string` | Identificador do cartão na nossa base
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
    "holder_name": "José",
    "id": "card_cim4aweld001po96d8blu6prb",
    "last_digits": "4242",
    "object": "card",
    "valid": true
}
```

### Criar um cartão

Você pode armazenar os dados do cartão do seu cliente através da rota `/cards`, assim você poderá usar o `id` do objeto gerado para realizar futuras transações, no lugar do `card_hash`.

Parâmetro | Tipo | Descrição
---|---|---
`api_key` <br /> **Obrigatório** | `String` | Chave da API, pode ser encontrado em sua dashboard
`card_number` <br /> **Obrigatório sem Card_hash** | `String` | Número do cartão
`card_holder_name` <br /> **Obrigatório sem Card_hash** | `String` | Nome escrito no cartão
`card_expiration_date` <br /> **Obrigatório sem Card_hash** | `String` | Data de expiração do cartão no formato `MMYY`
`card_hash` | `String` | Dados do cartão criptografados.
`customer_id` <br /> **Obrigatório** | `String` | Id do cliente para associar ao cartão

```endpoint
POST /cards
```

#### Exemplo de requisição

```curl
# Criando um cartão
curl -X POST https://api.pagar.me/1/cards \
-u "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH:x" \
-d "card_number=4242424242424242" \
-d "card_holder_name=José" \
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
    :card_number => '4242424242424242',
    :card_holder_name => 'Jose da Silva II',
    :card_expiration_month => '10',
    :card_expiration_year => '18',
    :card_cvv => '134'
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
    "card_holder_name" => "José",
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
card.HolderName = "José";
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
    "holder_name": "José",
    "id": "card_ciobx9il100c3306ev0hmuxvx",
    "last_digits": "4242",
    "object": "card",
    "valid": true
}
```

### Retornar um cartão

Use a rota `/cards/:id` para retornar os dados de um cartão previamente salvo.

Parâmetro | Tipo| Descrição
---|---|---
`api_key` <br /> **Obrigatório** | `String` | Chave da API, pode ser encontrado em sua dashboard
`id` <br /> **Obrigatório** | `String` | Id do cartão

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
    "holder_name": "José",
    "id": "card_ciobx9il100c3306ev0hmuxvx",
    "last_digits": "4242",
    "object": "card",
    "valid": true
}
```

### Retornar todos os cartões

Use a rota `/cards` para retornar os dados de todos os cartões previamente salvos. <br /> **Obs.:** O retorno é paginado.

Parâmetro | Tipo | Descrição
---|---|---
`api_key` <br /> **Obrigatório** | `String` | Chave da API, pode ser encontrado em sua dashboard
`page` <br /> **Obrigatório** | `Integer` | O numero da pagina que você quer receber
`count` <br /> **Obrigatório** | `Integer` | A quantidade de itens por pagína que você quer receber

```endpoint
GET /cards
```

#### Exemplo de requisição

```curl
# Retornando um cartão
curl -X GET https://api.pagar.me/1/cards \
-u "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH:x" \
-d "page=1" \
-d "count=1"
```

```ruby
# Retornando todas os cartões
require 'pagarme'

PagarMe.api_key = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH"

account = PagarMe::Card.all(1, 1)
```

```php
// Retornando todas as contas bancárias
<?php

require("pagarme-php/Pagarme.php");

Pagarme::setApiKey("ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH");

$account = PagarMe_Card::all(1, 1);
```

```csharp
// Retornando todas os cartões
PagarMeService.DefaultApiKey = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH";

var account = PagarMeService.GetDefaultService().Card.FindAll(1, 1);
```

#### Exemplo de resposta

```json
[
  {
    "object": "card",
    "id": "card_cism17quf000tdk6d5bocbdvm",
    "date_created": "2016-09-02T17:25:56.010Z",
    "date_updated": "2016-09-02T17:25:56.386Z",
    "brand": "visa",
    "holder_name": "Jose",
    "first_digits": "424242",
    "last_digits": "4242",
    "country": "US",
    "fingerprint": "d0BMujK+aqRx",
    "customer": null,
    "valid": true,
    "expiration_date": "0219"
  },
  {
    "object": "card",
    "id": "card_cirqv0cfc00uadz6de3k91o81",
    "date_created": "2016-08-11T21:51:21.578Z",
    "date_updated": "2016-08-11T21:51:21.777Z",
    "brand": "visa",
    "holder_name": "jose",
    "first_digits": "424242",
    "last_digits": "4242",
    "country": "US",
    "fingerprint": "0vgDr03pBjGQ",
    "customer": null,
    "valid": true,
    "expiration_date": "1020"
  }
]
```
