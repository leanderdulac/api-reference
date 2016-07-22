## Assinaturas

### Objeto subscription

Propriedade | Tipo | Descrição
---|---|---
`object` | `String` | Nome do tipo de objeto criado ou modificado.<br />**Valor retornado:** `subscription`
`plan` | `Object` | Objeto com os dados do plano que a assinatura está associada
`id` | `Integer` | Número do identificador do plano
`current_transaction` | `Object` | Objeto com os dados da ultima transação realizada pela assinatura
`postback_url` | `String` |Endpoint da aplicação integrada ao Pagar.me que irá receber os jsons de resposta a cada atualização dos processos
`payment_method` | `String` | Método de pagamento associado a essa assinatura
`current_period_start` | `String` | Início do periodo de cobrança da assinatura
`current_period_end` | `String` | Término do periodo de cobrança da assinatura
`charges` | `Integer` | Numero de cobranças que foram efetuadas na assinatura, **sem contar a cobrança inicial da assinatura no caso de cartão de crédito.**
`status` | `String` | Possíveis estados da transaçãov ou assinatura. <br />**Valores possíveis:** `trialing`, `paid`, `pending_payment`, `unpaid`, `canceled` e `ended`.
`date_created` | `String` | Data de criação da assinatura
`phone` | `Object` | Objeto com dados do telefone do cliente
`address` | `Object` | Objeto com dados do endereço do cliente
`custormer` | `Object` | Objeto com dados do cliente
`card` | `Object` | Objeto com dados do cartão do cliente
`metadata` | `Object` | Objeto com dados adicionais do cliente ou produto ou serviço vendido

**Lista de rotas**

* Criar assinatura: `POST https://api.pagar.me/1/subscriptions`
* Retornar uma assinatura `GET https://api.pagar.me/1/subscriptions/:id`
* Retornar todas as assinaturas `GET https://api.pagar.me/1/subscriptions`
* Atualizando uma assinatura `PUT https://api.pagar.me/1/subscriptions/:id`
* Cancelando uma transação `POST https://api.pagar.me/1/subscriptions/:id/cancel`
* Transações em uma assinatura `GET https://api.pagar.me/1/subscriptions/:id/transactions`
* Reenviando postback de uma assinatura `POST /subscriptions/:id/postbacks/:id/redeliver`

#### Exemplo do objeto

```json
{
  "object": "subscription",
  "plan": {
    "object": "plan",
    "id": 50487,
    "amount": 4500,
    "days": 30,
    "name": "Plano de teste",
    "trial_days": 0,
    "date_created": "2016-07-11T20:48:36.214Z",
    "payment_methods": [
      "boleto",
      "credit_card"
    ],
    "color": null,
    "charges": null,
    "installments": 1
  },
  "id": 73244,
  "current_transaction": {
    "object": "transaction",
    "status": "paid",
    "refuse_reason": null,
    "status_reason": "acquirer",
    "acquirer_response_code": "00",
    "acquirer_name": "pagarme",
    "authorization_code": "548774",
    "soft_descriptor": null,
    "tid": 568084,
    "nsu": 568084,
    "date_created": "2016-07-13T12:42:02.282Z",
    "date_updated": "2016-07-13T12:42:02.719Z",
    "amount": 4500,
    "authorized_amount": 4500,
    "paid_amount": 4500,
    "refunded_amount": 0,
    "installments": 1,
    "id": 568084,
    "cost": 50,
    "card_holder_name": "Jose",
    "card_last_digits": "1111",
    "card_first_digits": "411111",
    "card_brand": "visa",
    "postback_url": null,
    "payment_method": "credit_card",
    "capture_method": "ecommerce",
    "antifraud_score": null,
    "boleto_url": null,
    "boleto_barcode": null,
    "boleto_expiration_date": null,
    "referer": "api_key",
    "ip": "179.185.132.108",
    "subscription_id": 73244,
    "split_rules": null,
    "metadata": {},
    "antifraud_metadata": {}
  },
  "postback_url": null,
  "payment_method": "credit_card",
  "card_brand": "visa",
  "card_last_digits": "1111",
  "current_period_start": "2016-07-13T12:42:02.270Z",
  "current_period_end": "2016-08-12T12:42:02.270Z",
  "charges": 0,
  "status": "paid",
  "date_created": "2016-07-13T12:42:02.704Z",
  "phone": null,
  "address": {
    "object": "address",
    "street": null,
    "complementary": null,
    "street_number": null,
    "neighborhood": "Santo Amaro",
    "city": "São Paulo",
    "state": "SP",
    "zipcode": null,
    "country": "Brasil",
    "id": 37608
  },
  "customer": {
    "object": "customer",
    "document_number": "DOCUMENT-NUMBER",
    "document_type": "cpf",
    "name": "Paulo",
    "email": "jose@teste.teste",
    "born_at": null,
    "gender": "m",
    "date_created": "2016-07-01T18:58:09.991Z",
    "id": 77581
  },
  "card": {
    "object": "card",
    "id": "CARD-ID",
    "date_created": "2016-07-12T22:33:07.218Z",
    "date_updated": "2016-07-12T22:33:07.417Z",
    "brand": "visa",
    "holder_name": "Jose",
    "first_digits": "411111",
    "last_digits": "1111",
    "country": "US",
    "fingerprint": "JRdPyXSK6jHe",
    "valid": true,
    "expiration_date": "1029"
  },
  "metadata": null
  }

```

### Criar uma assinatura

Para efetivamente cobrar seu cliente de forma recorrente, você deve criar uma **assinatura**, que atrelada a um **plano**, conterá os dados de cobrança.

A criação de uma `subscription` (assinatura) é parecida com a criação de uma transação. Veja mais detalhes sobre como cobrar seu cliente de forma recorrente [aqui](https://pagar.me/docs/subscriptions-subscriptions/#criando-uma-assinatura).

Parâmetro | Tipo | Descrição
---|---|---
`api_Key`<br /> **Obrigatório** | `String` | Chave de API. Disponivel na Dashboard
`plan_id`<br /> **Obrigatório** | `Integer` | Id do plano a ser associado a assinatura
`card_hash`<br /> **Obrigatório** | `String` | Dados encriptados do cartão do cliente. você também pode usar o `card_id` no lugar do `card_hash`
`postback_url` | `String` | URL para onde nosso sistema irá enviar as requisições informando cada alteração de status da assinatura em questão.
`customer[email]`<br /> **Obrigatório** | `String` | Email do cliente
`customer[name]`<br /> **Obrigatório com antifraude ativado** | `String` | Nome completo ou razão social do cliente que está realizando a transação
`customer[document_number]`<br /> **Obrigatório com antifraude ativado** | `String` | CPF ou CNPJ do cliente, sem pontos ou traços.
`customer[address][street]`<br /> **Obrigatório com antifraude ativado** | `String` | logradouro do cliente
`customer[address][street_number]` <br /> **Obrigatório com antifraude ativado** | `String` | Número da residência/estabelecimento do cliente
`customer[address][complementary]` | `String` | complemento do endereço do cliente
`customer[address][neighborhood]`<br /> **Obrigatório com antifraude ativado** | `String` | bairro de localização do cliente
`customer[address][zipcode]`<br /> **Obrigatório com antifraude ativado** | `Integer` | CEP do imóvel do cliente, sem separadores
`customer[phone][ddd]`<br /> **Obrigatório com antifraude ativado**  | `Integer` | DDD do telefone do cliente
`customer[phone][number]`<br /> **Obrigatório com antifraude ativado** | `Integer` |número de telefone do cliente
`customer[sex]`<br /> `M` ou `F` em maiúculas | `String` | Sexo do Cliente
`customer[born_at]`<br /> Formato: `MM-DD-AAAA` | `String` | Data de nascimento do cliente
`metadata` | JSON | Você pode passar dados adicionais na criação da transação para posteriormente filtrar estas na nossa dashboard.<br /> Ex.: metadata[ idProduto] = 13933139

**Atenção**

**Você pode passar os objetos `customer` e `metadata` na criação de uma assinatura, assim como feito na criação de uma transação. A diferença é que a propriedade `customer[email]` é obrigatória na criação da assinatura.**

**As transações criadas pelas assinaturas não passam pelo antifraude, devido a ocorrência de fraudes nesse tipo de serviço serem praticamente nulas.**

```endpoint
POST /subscriptions
```

#### Exemplo de requisição

```curl
# Criando uma subscription
curl -X POST https://api.pagar.me/1/subscriptions \
-d 'api_key=ak_test_TSgC3nrsdidfHAas24shu43HUhurw9' \
-d 'customer[email]=api@test.com' \
-d 'plan_id=12783' \
-d 'card_id=card_ci234fx8rr649rt16rtb11132' \
-d 'postback_url=http://requestb.in/zyn5obzy' \
-d 'payment_method=boleto'
```

```ruby
# Criando uma subscription
require 'pagarme'

PagarMe.api_key = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH"

subscription = PagarMe::Subscription.new({
	payment_methods: 'credit_card',
	card: PagarMe::Card.new({
		number: "4242424242424242",
		holder_name: "José",
		expiration_month:"09",
		expiration_year:"19",
		cvv:"312"
	}),
	pastback_url: "SuaUrl.aqui",
	customer: PagarMe::Customer.new({
		email: "api@test.com"
	})
})

subscription.plan = plan

subscription.create
```

```php
// Criando um plano
<?php

require("pagarme-php/Pagarme.php");

Pagarme::setApiKey("ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH");

$subscription = new PagarMe_Subscription(array(
	'payment_method'=>'credit_card',
	'card'=>array(
		'number'=>'4242424242424242',
		'holder_name'=>'Jose',
		'expiration_month'=>'10',
		'expiration_year'=>'18',
		'cvv'=>'123'
	),
	'postback_url'=>'SuaUrl.aqui',
	'customer'=>array(
		'email'=>'test@api.com'
	)
));

$subscrition->create();
```

```csharp
// Criando uma subscrition 
PagarMeService.DefaultApiKey = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH";

Subscription subs = new Subscription(){
	CardNumber = "4111111111111111",
	CardHolderName = "José",
	CardExpirationDate = "1019",
	CardCvv = "123"
};

Customer customer = new Customer();
customer.email = "api@test.com";
subs.Customer = customer;

subs.Save();
```

#### Exemplo de resposta

```json
{
  "object": "subscription",
  "plan": {
    "object": "plan",
    "id": 52957,
    "amount": 4990,
    "days": 15,
    "name": "boleto",
    "trial_days": 0,
    "date_created": "2016-07-20T13:34:30.070Z",
    "payment_methods": [
      "boleto",
      "credit_card"
    ],
    "color": null,
    "charges": null,
    "installments": 1
  },
  "id": 76046,
  "current_transaction": {
    "object": "transaction",
    "status": "paid",
    "refuse_reason": null,
    "status_reason": "acquirer",
    "acquirer_response_code": "00",
    "acquirer_name": "pagarme",
    "authorization_code": "390293",
    "soft_descriptor": null,
    "tid": 579995,
    "nsu": 579995,
    "date_created": "2016-07-20T16:15:32.042Z",
    "date_updated": "2016-07-20T16:15:32.500Z",
    "amount": 4990,
    "authorized_amount": 4990,
    "paid_amount": 4990,
    "refunded_amount": 0,
    "installments": 1,
    "id": 579995,
    "cost": 50,
    "card_holder_name": "Jose",
    "card_last_digits": "1111",
    "card_first_digits": "411111",
    "card_brand": "visa",
    "postback_url": null,
    "payment_method": "credit_card",
    "capture_method": "ecommerce",
    "antifraud_score": null,
    "boleto_url": null,
    "boleto_barcode": null,
    "boleto_expiration_date": null,
    "referer": "api_key",
    "ip": "179.185.132.108",
    "subscription_id": 76046,
    "split_rules": null,
    "metadata": {},
    "antifraud_metadata": {}
  },
  "postback_url": null,
  "payment_method": "credit_card",
  "card_brand": "visa",
  "card_last_digits": "1111",
  "current_period_start": "2016-07-20T16:15:32.019Z",
  "current_period_end": "2016-08-04T16:15:32.019Z",
  "charges": 0,
  "status": "paid",
  "date_created": "2016-07-20T16:15:32.474Z",
  "phone": {
    "object": "phone",
    "ddi": "55",
    "ddd": "11",
    "number": "55442233",
    "id": 38800
  },
  "address": {
    "object": "address",
    "street": RUA_AQUI,
    "complementary": null,
    "street_number": "181",
    "neighborhood": "Santo Amaro",
    "city": "São Paulo",
    "state": "SP",
    "zipcode": CEP_AQUI,
    "country": "Brasil",
    "id": 37608
  },
  "customer": {
    "object": "customer",
    "document_number": "DOC_AQUI",
    "document_type": "cpf",
    "name": "Paulo",
    "email": "jose@teste.teste",
    "born_at": null,
    "gender": "m",
    "date_created": "2016-07-01T18:58:09.991Z",
    "id": 77581
  },
  "card": {
    "object": "card",
    "id": "card_ciqk1ahsi00s56z6d5hh71aqj",
    "date_created": "2016-07-12T22:33:07.218Z",
    "date_updated": "2016-07-12T22:33:07.417Z",
    "brand": "visa",
    "holder_name": "Jose",
    "first_digits": "411111",
    "last_digits": "1111",
    "country": "US",
    "fingerprint": "JRdPyXSK6jHe",
    "valid": true,
    "expiration_date": "1029"
  },
  "metadata": null
}
```

### Retornando uma assinatura

Essa rota é utilizada para retornar os dados de uma determinada assinatura

Parâmetro | Tipo | Descrição
---|---|---
`api_key` | `String` | Chave de API, disponível no seu dashboard
`id` | `Integer` | Id da assinatura

```endpoint
GET /subscriptions/id
```

#### Exemplo de requisição

```curl
curl -X GET https://api.pagar.me/1/subscriptions/14858 \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```Ruby
require 'pagarme'

PagarMe.api_key = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0"

subscription = PagarMe::Subscription.find_by_id("14858")
```

```php
<?php
    require("pagarme-php/Pagarme.php");

    Pagarme::setApiKey("ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0");

    $subscription = PagarMe_Subscription::findById(14858);
Essa rota é utilizada para retornar os dados de uma determinada assinatura.
```

```csharp
PagarMeService.DefaultApiKey = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0";

var subscription = PagarMeService.GetDefaultService().Subscriptions.Find("14858");
```

#### Exemplo de resposta

```json
{
    "object": "subscription",
    "plan": {
      "object": "plan",
      "id": 52957,
      "amount": 4990,
      "days": 15,
      "name": "boleto",
      "trial_days": 0,
      "date_created": "2016-07-20T13:34:30.070Z",
      "payment_methods": [
        "boleto",
        "credit_card"
      ],
      "color": null,
      "charges": null,
      "installments": 1
    },
    "id": 76104,
    "current_transaction": {
      "object": "transaction",
      "status": "waiting_payment",
      "refuse_reason": null,
      "status_reason": "acquirer",
      "acquirer_response_code": null,
      "acquirer_name": "pagarme",
      "authorization_code": null,
      "soft_descriptor": null,
      "tid": 580259,
      "nsu": 580259,
      "date_created": "2016-07-20T17:48:12.395Z",
      "date_updated": "2016-07-20T17:48:12.643Z",
      "amount": 4990,
      "authorized_amount": 4990,
      "paid_amount": 0,
      "refunded_amount": 0,
      "installments": 1,
      "id": 580259,
      "cost": 0,
      "card_holder_name": null,
      "card_last_digits": null,
      "card_first_digits": null,
      "card_brand": null,
      "postback_url": null,
      "payment_method": "boleto",
      "capture_method": "ecommerce",
      "antifraud_score": null,
      "boleto_url": "https://pagar.me",
      "boleto_barcode": "1234 5678",
      "boleto_expiration_date": "2016-07-27T17:48:12.376Z",
      "referer": "api_key",
      "ip": "179.185.132.108",
      "subscription_id": 76104,
      "split_rules": null,
      "metadata": {},
      "antifraud_metadata": {}
    },
    "postback_url": null,
    "payment_method": "boleto",
    "card_brand": null,
    "card_last_digits": null,
    "current_period_start": null,
    "current_period_end": null,
    "charges": 0,
    "status": "unpaid",
    "date_created": "2016-07-20T17:48:12.634Z",
    "phone": {
      "object": "phone",
      "ddi": "55",
      "ddd": "11",
      "number": "55442233",
      "id": 38800
    },
    "address": {
      "object": "address",
      "street": "RUA_AQUI",
      "complementary": null,
      "street_number": "",
      "neighborhood": "Santo Amaro",
      "city": "São Paulo",
      "state": "SP",
      "zipcode": "CEP_AQUI",
      "country": "Brasil",
      "id": 37608
    },
    "customer": {
      "object": "customer",
      "document_number": "DOCUMENTO_AQUI",
      "document_type": "cpf",
      "name": "Paulo",
      "email": "jose@teste.teste",
      "born_at": null,
      "gender": "m",
      "date_created": "2016-07-01T18:58:09.991Z",
      "id": 77581
    },
    "card": null,
    "metadata": null
}
```

### Retornando assinaturas

Essa rota é utilizada para retornar os dados de todas as assinaturas.

Parâmetros | Tipo | Descrição
---|---|---
`api_key` | `String` | Chave da API, disponível no seu dashboard
`count` | `Integer` | Quantidade de itens a serem mostrados por página de retorno
`page` | `Integer` | Número da página de retorno

```endpoint
GET https://api.pagar.me/1/subscriptions
```

#### Exemplo de requisição

```curl
curl -X GET https://api.pagar.me/1/subscriptions \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' \
-d 'page=1' \
-d 'count=2'
```

```ruby
require 'pagarme'

PagarMe.api_key = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0"
# all(page,count)
subscriptions = PagarMe::Subscription.all(1, 2)
```

```php
<?php
require("pagarme-php/Pagarme.php");

Pagarme::setApiKey("ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0");

$subscription = PagarMe_Subscription::findById(14858);
```

```csharp
PagarMeService.DefaultApiKey = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0";

var subscription = PagarMeService.GetDefaultService().Subscriptions.Find("14858");
```

#### Exemplo de resposta

```json
{  
   "object":"subscription",
   "plan":{  
      "object":"plan",
      "id":52957,
      "amount":4990,
      "days":15,
      "name":"boleto",
      "trial_days":0,
      "date_created":"2016-07-20T13:34:30.070Z",
      "payment_methods":[  
         "boleto",
         "credit_card"
      ],
      "color":null,
      "charges":null,
      "installments":1
   },
   "id":76104,
   "current_transaction":{  
      "object":"transaction",
      "status":"waiting_payment",
      "refuse_reason":null,
      "status_reason":"acquirer",
      "acquirer_response_code":null,
      "acquirer_name":"pagarme",
      "authorization_code":null,
      "soft_descriptor":null,
      "tid":580259,
      "nsu":580259,
      "date_created":"2016-07-20T17:48:12.395Z",
      "date_updated":"2016-07-20T17:48:12.643Z",
      "amount":4990,
      "authorized_amount":4990,
      "paid_amount":0,
      "refunded_amount":0,
      "installments":1,
      "id":580259,
      "cost":0,
      "card_holder_name":null,
      "card_last_digits":null,
      "card_first_digits":null,
      "card_brand":null,
      "postback_url":null,
      "payment_method":"boleto",
      "capture_method":"ecommerce",
      "antifraud_score":null,
      "boleto_url":"https://pagar.me",
      "boleto_barcode":"1234 5678",
      "boleto_expiration_date":"2016-07-27T17:48:12.376Z",
      "referer":"api_key",
      "ip":"179.185.132.108",
      "subscription_id":76104,
      "split_rules":null,
      "metadata":{  

      },
      "antifraud_metadata":{  

      }
   },
   "postback_url":null,
   "payment_method":"boleto",
   "card_brand":null,
   "card_last_digits":null,
   "current_period_start":null,
   "current_period_end":null,
   "charges":0,
   "status":"unpaid",
   "date_created":"2016-07-20T17:48:12.634Z",
   "phone":{  
      "object":"phone",
      "ddi":"55",
      "ddd":"11",
      "number":"55442233",
      "id":38800
   },
   "address":{  
      "object":"address",
      "street":"Rua ",
      "complementary":null,
      "street_number":"",
      "neighborhood":"Santo Amaro",
      "city":"São Paulo",
      "state":"SP",
      "zipcode":"01234567",
      "country":"Brasil",
      "id":37608
   },
   "customer":{  
      "object":"customer",
      "document_number":"12345678911",
      "document_type":"cpf",
      "name":"Paulo",
      "email":"jose@teste.teste",
      "born_at":null,
      "gender":"m",
      "date_created":"2016-07-01T18:58:09.991Z",
      "id":77581
   },
   "card":null,
   "metadata":null
}
```

### Atualizando uma assinatura

Após criar uma assinatura, você pode atualizar os dados do método do pagamento e o plano que essa assinatura está atrelada.

Parâmetro                                    | Tipo      | Descrição
---                                          | ---       | ---
`api_key`                                    | `String`  | Chave da API , disponível em seu dashboard
`plan_id`                                    | `Integer` | Id do novo plano atrelado a assinatura
`payment_method`                             | `String`  | Método de pagamento utilizado na assinatura.<br /> Valores possíveis: **credit_card**, **boleto**
`card_id`                                    | `String`  | Identificador dos dados de um cartão previamente salvo na nossa base de dados
`card_hash`                                  | `String`  | Dados encriptados de um cartão de crédito
`card_number`                                | `Strign`  | Número de um cartão de crédito. Usado quando o cartão a ser configurado na assinatura ainda não está salvo no nosso banco de dados
`card_holder_name`                           | `String`  | Nome do portador do cartão. Usado quando o cartão a ser configurado na assinatura ainda não está salvo no nosso banco de dados
`card_expiration_date` <br /> Formato: MM/YY | `String`  | Data de expiração do cartão. <br /> **Ex.:** 0518 (Maio de 2018)


```endpoint
PUT https://api.pagar.me/1/subscriptions/:id/
```

#### Exemplo de requisição

```curl
curl -X PUT https://api.pagar.me/1/subscriptions/14858 \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' \
-d 'plan_id=12830' \
-d 'payment_method=credit_card' \
-d 'card_id=card_ci6y37hc00030a416wrxsmzyi'
```

```ruby
require 'pagarme'

PagarMe.api_key = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0"
subscription = PagarMe::Subscription.find_by_id(14858)
subscription.payment_method = 'boleto'

subscription.save
```

```php
<?php
    require("pagarme-php/Pagarme.php");

    Pagarme::setApiKey("ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0");

    $subscription = PagarMe_Subscription::findById(14858);
    $subscription->setPaymentMethod("boleto");

    $subscription->save();
```

```csharp
PagarMeService.DefaultApiKey = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0";
Subscriptions model =  PagarMeService.GetDefaultService ().Subscriptions.Find (76032);
model.PaymentMethod = PaymentMethod.Boleto;
model.PostbackUrl = "http://www.aledsz.com.br/validateRequest.php";
model.Save();
```

#### Exemplo de resposta
```json
{  
   "object":"subscription",
   "plan_id":"52957",
   "id":76046,
   "current_transaction_id":"584105",
   "postback_url":null,
   "payment_method":"boleto",
   "card_brand":null,
   "card_last_digits":null,
   "current_period_start":"2016-07-20T16:15:32.019Z",
   "current_period_end":"2016-08-04T16:15:32.019Z",
   "charges":0,
   "status":"paid",
   "date_created":"2016-07-20T16:15:32.474Z",
   "phone":{  
      "object":"phone",
      "ddi":"55",
      "ddd":"11",
      "number":"55442233",
      "id":38800
   },
   "address":{  
      "object":"address",
      "street":"Rua batata",
      "complementary":null,
      "street_number":"181",
      "neighborhood":"Santo Amaro",
      "city":"São Paulo",
      "state":"SP",
      "zipcode":"1234567",
      "country":"Brasil",
      "id":37608
   },
   "customer":{  
      "object":"customer",
      "document_number":"12345678911",
      "document_type":"cpf",
      "name":"Paulo",
      "email":"jose@teste.teste",
      "born_at":null,
      "gender":"m",
      "date_created":"2016-07-01T18:58:09.991Z",
      "id":77581
   },
   "card_id":"card_ciqk1ahsi00s56z6d5hh71aqj",
   "metadata":null
}
```

### Cancelando uma assinatura

Você pode cancelar uma assinatura.

Parâmetro | Tipo | Descrição
---|---|---
`api_key` <br /> **Obrigatório** | `String` | chave de API, disponível em seu Dashboard
`id` <br /> **Obrigatório** | `Integer` | Id da assinatura a ser cancelada


```endpoint
POST https://api.pagar.me/1/subscriptions/:id/cancel
```

#### Exemplo de requisição

```curl
curl -X POST https://api.pagar.me/1/subscriptions/76046/cancel \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
require 'pagarme'

PagarMe.api_key = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0"
subscription = PagarMe::Subscription.find_by_id("1234")
subscription.cancel
```

```php
<?php
    require("pagarme-php/Pagarme.php");

    Pagarme::setApiKey("ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0");

    $subscription = PagarMe_Subscription::findById(14858);
    $subscription->cancel();
```

```csharp
PagarMeService.DefaultApiKey = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0";
Subscriptions model =  PagarMeService.GetDefaultService ().Subscriptions.Find (76046);
model.Cancel();
```

#### Exemplo de resposta
```json
{  
   "object":"subscription",
   "plan_id":"52957",
   "id":76104,
   "current_transaction_id":"580259",
   "postback_url":null,
   "payment_method":"boleto",
   "card_brand":null,
   "card_last_digits":null,
   "current_period_start":null,
   "current_period_end":null,
   "charges":0,
   "status":"canceled",
   "date_created":"2016-07-20T17:48:12.634Z",
   "phone":{  
      "object":"phone",
      "ddi":"55",
      "ddd":"11",
      "number":"55442233",
      "id":38800
   },
   "address":{  
      "object":"address",
      "street":"Rua batata",
      "complementary":null,
      "street_number":"181",
      "neighborhood":"Santo Amaro",
      "city":"São Paulo",
      "state":"SP",
      "zipcode":"1234567",
      "country":"Brasil",
      "id":37608
   },
   "customer":{  
      "object":"customer",
      "document_number":"12345678911",
      "document_type":"cpf",
      "name":"Paulo",
      "email":"jose@teste.teste",
      "born_at":null,
      "gender":"m",
      "date_created":"2016-07-01T18:58:09.991Z",
      "id":77581
   },
   "card":null,
   "metadata":null
}
	
```

### Transações de uma assinatura

Retorna um array de objetos `transaction` contendo as transações feitas a partir de uma assinatura.

Parâmetro                        | Tipo      | Descrição
---|---|---
`api_key` <br /> **Obrigatório** | `String`  | chave de API, disponível em seu Dashboard
`id` <br /> **Obrigatório**      | `Integer` | Id da assinatura a desejada

```endpoint
GET https://api.pagar.me/1/subscriptions/:id/transactions
```

#### Exemplo de requisição

```curl
curl -X GET https://api.pagar.me/1/subscriptions/14858/transactions \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
sem exemplo
```

```php
sem exemplo
```

```csharp
sem exemplo
```

#### Exemplo de resposta

```json
[  
   {  
      "object":"transaction",
      "status":"waiting_payment",
      "refuse_reason":null,
      "status_reason":"acquirer",
      "acquirer_response_code":null,
      "acquirer_name":"pagarme",
      "authorization_code":null,
      "soft_descriptor":null,
      "tid":580259,
      "nsu":580259,
      "date_created":"2016-07-20T17:48:12.395Z",
      "date_updated":"2016-07-20T17:48:12.643Z",
      "amount":4990,
      "authorized_amount":4990,
      "paid_amount":0,
      "refunded_amount":0,
      "installments":1,
      "id":580259,
      "cost":0,
      "card_holder_name":null,
      "card_last_digits":null,
      "card_first_digits":null,
      "card_brand":null,
      "postback_url":null,
      "payment_method":"boleto",
      "capture_method":"ecommerce",
      "antifraud_score":null,
      "boleto_url":"https://pagar.me",
      "boleto_barcode":"1234 5678",
      "boleto_expiration_date":"2016-07-27T17:48:12.376Z",
      "referer":"api_key",
      "ip":"179.185.132.108",
      "subscription_id":76104,
      "phone":{  
         "object":"phone",
         "ddi":"55",
         "ddd":"11",
         "number":"55442233",
         "id":38800
      },
      "address":{  
         "object":"address",
         "street":"Rua juari",
         "complementary":null,
         "street_number":"181",
         "neighborhood":"Santo Amaro",
         "city":"São Paulo",
         "state":"SP",
         "zipcode":"04446160",
         "country":"Brasil",
         "id":37608
      },
      "customer":{  
         "object":"customer",
         "document_number":"41027023851",
         "document_type":"cpf",
         "name":"Paulo",
         "email":"jose@teste.teste",
         "born_at":null,
         "gender":"m",
         "date_created":"2016-07-01T18:58:09.991Z",
         "id":77581
      },
      "card":null,
      "split_rules":null,
      "antifraud_metadata":{  

      },
      "metadata":{  

      }
   }
]
```
