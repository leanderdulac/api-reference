## Transações

Através da rota `/transactions` e suas derivadas, você pode criar transações, estornar, capturar, dentre outras atividades relacionadas a estas.

### Objeto transaction

Ao criar ou atualizar uma transação, este será o objeto que você irá receber como resposta em cada etapa do processo de efetivação da transação.

Propriedade | Tipo | Descrição
---|---|---
`object` | `String` | Nome do tipo do objeto criado/modificado.<br />**Valor retornado: **`transaction`
`status` | `String` | Para cada atualização no processamento da transação, esta propriedade será alterada, e o objeto transaction retornado como resposta através da sua URL de postback ou após o término do processamento da ação atual.<br />**Valores possíveis:** `processing`, `authorized`, `paid`, `refunded`, `waiting_payment`, `pending_refund`, `refused`
`refuse_reason` | `String` | Motivo/agente responsável pela validação ou anulação da transação.<br />**Valores possíveis: **`acquirer`, `antifraud`, `internal_error`, `no_acquirer`, `acquirer_timeout`
`status_reason` | `String` | Adquirente responsável pelo processamento da transação.<br />**Valores possíveis: **`development` (em ambiente de testes), `pagarme` (adquirente Pagar.me), `stone`, `cielo`, `rede`, `mundipagg`
`acquirer_response_code` | `String` | Mensagem de resposta do adquirente referente ao status da transação.
`authorization_code` | `String` | Código de autorização retornado pela bandeira.
`soft_descriptor` | `String` | Texto que irá aparecer na fatura do cliente depois do nome da loja.<br />**OBS: **Limite de 13 caracteres, apenas letras e números.
`tid` | `Ìnteger` | Código que identifica a transação no adquirente.
`nsu` | `Ìnteger` | Código que identifica a transação no adquirente.
`date_created` | `String` | Data de criação da transação no formato ISODate
`date_updated` | `String` | Data de última atualização da transação no formato ISODate
`amount` | `Integer` | Valor em centados do que foi pago
`installments` | `Integer` | Número de parcelas/prestações a serem cobradas
`id` | `Integer` | Código de identificação da transação
`postback_url` | `String` | URL para onde são enviadas as notificações de alteração de status
`payment_method` | `String` | Método de pagamento possíveis: `credit_card` e `boleto`
`boleto_url` | `String` | URL do boleto para ser impresso
`boleto_barcode` | `String` | Código de barras do boleto gerado na transação
`boleto_expiration_date` | `String` | Data de vencimento do boleto no formato ISODate
`referer` | `String` | Mostra de onde a transação foi criada.**Valores :**`api_key` ou `encryption_key`.
`ip` | `String` | IP de origem que criou a transção, podendo ser ou do seu cliente (quando criado via checkout ou utilizando card_hash) ou do servidor.
`subscription_id` | `Integer` | Código da assinatura
`phone` | `Object` | Objeto do tipo `phone`.<br />Mais informações em: [Phone](/#phone) 
`address` | `Object` | Objeto do tipo `address`.<br />Mais informações em: [Address](/#address) 
`customer` | `Object` | Objeto do tipo `customer`.<br />Mais informações em: [Customer](/#clientes) 
`card` | `Object` | Objeto do tipo `card`.<br />Mais informações em: [Card](/#cartões) 
`metadata` | `Object` | Objeto do tipo `metadata`.<br />Mais informações em: [Metadata](/#metadata)

#### Exemplo:

```json
{
	"object": "transaction",
	"status": "processing",
	"refuse_reason": null,
	"status_reason": "acquirer",
	"acquirer_response_code": null,
	"authorization_code": null,
	"soft_descriptor": "ApiPagarMe",
	"tid": null,
	"nsu": null,
	"date_created": "2015-02-25T21:54:56.000Z",
	"date_updated": "2015-02-25T21:54:56.000Z",
	"amount": 310000,
	"installments": 5,
	"id": 184220,
	"cost": 0,
	"postback_url": "http://requestb.in/pkt7pgpk",
	"payment_method": "credit_card",
	"antifraud_score": null,
	"boleto_url": null,
	"boleto_barcode": null,
	"boleto_expiration_date": null,
	"referer": "api_key",
	"ip": "189.8.94.42",
	"subscription_id": null,
	"phone": null,
	"address": null,
	"customer": null,
	"card": {
		"object": "card",
		"id": "card_ci6l9fx8f0042rt16rtb477gj",
		"date_created": "2015-02-25T21:54:56.000Z",
		"date_updated": "2015-02-25T21:54:56.000Z",
		"brand": "mastercard",
		"holder_name": "Teste PagarMe",
		"first_digits": "548045",
		"last_digits": "3123",
		"fingerprint": "HSiLJan2nqwn",
		"valid": null
	},
	"metadata": {
		"nome": "Teste PagarMe",
		"id": 13
	}
}
```

### Criando uma transação

Para fazer uma cobrança, você deve usar a rota `/transactions` para criar sua transação, que pode ser feita por cartão de crédito ou por boleto bancário.

Propriedade | Tipo | Descrição
---|---|---
`api_key`<br />**obrigatório** | `String` | Chave da API
`amount`<br />**obrigatório** | `Integer` | Valor a ser cobrado. Deve ser passado em centavos.<br />**Ex: **R$ 10,00 = 1000
`card_hash`<br />**obrigatório** | `String` | String com informações do cartão do cliente criptografadas.<br />**OBS: **Apenas em transações de **cartão de crédito** você deve passar ou o `card_hash` ou o `card_id`
`card_id`<br />**obrigatório** | `String` | Identificação de um cartão.<br />Ao realizar uma transação, retornamos o `card_id` do cartão para que nas próximas transações desse cartão possa ser utilizado esse identificador ao invés do `card_hash`
`payment_method` | `String` | Aceita dois tipos de pagamentos/valores: `credit_card` e `boleto`.<br />**Valor padrão: **`credit_card`
`postback_url` | `String` | URL para onde são enviadas as notificações de alteração de status
`async` | `Boolean` | Utilize `false` caso queira utilizar POSTbacks e manter o processamento síncrono de uma transação.<br />**Valor padrão:** `false` ou `true` caso `postback_url` tenha sido informado.
`installment` | `Integer` | Se `payment_method` for `boleto`, o valor padrão será 1.<br />**Valor mínimo: **1<br />**Valor máximo: **12
`boleto_expiration_date` | `String` | Prazo limite para pagamento do boleto em formato ISODate.<br />**Valor padrão: **Data atual + 7 dias
`soft_descriptor` | `String` | Descrição que aparecerá na fatura depois do nome da loja.<br />**OBS: **Limite de 13 caracteres, apenas letras e números.
`capture` | `Boolean` | Após a autorização de uma transação, você pode escolher se irá capturar ou adiar a captura do valor. Caso opte por postergar a captura, atribuir o valor `false`.<br />**Valor padrão: **`true`
`metadata` | `Object` | Você pode passar dados adicionais na criação da transação para posteriormente filtrar estas na nossa dashboard.<br />**Exemplo: **`metadata[idProduto]=13933139`
`customer[name]`<br />**obrigatório (com antifraude)** | `String` | Nome completo ou razão social do cliente que está realizando a transação
`customer[document_number]`<br />**obrigatório (com antifraude)** | `String` | CPF ou CNPJ do cliente, sem separadores
`customer[email]`<br />**obrigatório (com antifraude)** | `String` | E-mail do cliente
`customer[address][street]`<br />**obrigatório (com antifraude)** | `String` | Logradouro (Rua, Avenida, etc) do cliente
`customer[address][street_number]`<br />**obrigatório (com antifraude)** | `String` | Número da residência/estabelecimento do cliente
`customer[address][complementary]` | `String` | Complemento do endereço do cliente
`customer[address][neighborhood]`<br />**obrigatório (com antifraude)** | `String` | Bairro de localização do cliente
`customer[address][zipcode]`<br />**obrigatório (com antifraude)** | `String` | CEP do imóvel do cliente, sem separadores
`customer[phone][ddd]`<br />**obrigatório (com antifraude)** | `String` | DDD do telefone do cliente
`customer[phone][number]`<br />**obrigatório (com antifraude)** | `String` | Número de telefone do cliente
`customer[sex]` | `String` | Sexo do cliente.<br />**Valores possíveis: **M ou F (letras maiúsculas)
`customer[born_at]` | `String` | Data de nascimento do cliente.<br />**Formato: **`MM-DD-AAAA`<br />**Exemplo: **11-02-1985
`split_rules` | `Array` | Esse parâmetro é um `Array` que irá conter as regras da divisão do valor transacionado.<br />**OBS: **Caso você deseje incluir mais regras, passe os parâmetros abaixo alterando o índice em +1 para cada nova regra/recebedor
`split_rules[n][recipient_id]` | `String` | Identificador do recebedor.<br />Mais informações sobre [Recebedor](#recebedores)
`split_rules[n][charge_processing_fee]` | `Boolean` | Indica se o recebedor vinculado a essa regra de divisão será cobrado pelas taxas da transação.<br />**Valor padrão: **`true`
`split_rules[n][liable]` | `Boolean` | Indica se o recebedor vinculado a essa regra de divisão assumirá o risco da transação, ou seja, possíveis estornos (chargeback).<br />**Valor padrão: **`true`
`split_rules[n][percentage]`<br />**obrigatório** | `Double` | Define a porcentagem a ser recebida pelo recebedor configurado na regra.<br />**OBS: se for utilizado a propriedade percentage, a propriedade amount não será necessária**
`split_rules[n][amount]`<br />**obrigatório** | `Integer` | Define o valor a ser recebido pelo recebedor configurado na regra.<br />**OBS: se for utilizado a propriedade amount, a propriedade percentage não será necessária**
**OBS: Caso você vá usar o recurso antifraude, é obrigatório passar os dados do cliente na hora da criação da transação, como explicado nesse link: https://pagar.me/docs/transactions/#customer-data.**


```endpoint
POST /transactions
```

#### Exemplo de requisição:
```curl
curl -X POST https://api.pagar.me/1/transactions \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' \
-d 'amount=3100' \
-d 'card_id=card_ci6l9fx8f0042rt16rtb477gj' \
-d 'postback_url=http://requestb.in/pkt7pgpk' \
-d 'metadata[idProduto]=13933139'
```

```ruby
require "pagarme"

PagarMe.api_key = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH"

transaction = PagarMe::Transaction.new({
	amount: 3100,
	card_id: "card_ci6l9fx8f0042rt16rtb477gj",
	postback_url: "http://requestb.in/pkt7pgpk",
	metadata: {
		idProduto: 13933139
	}
})
transaction.create()
```

```php
require("pagarme-php/Pagarme.php");

PagarMe::setApiKey("ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH");

$transaction = new PagarMe_Transaction(array(
	"amount" => 3100,
	"card_id" => "card_ci6l9fx8f0042rt16rtb477gj",
	"postback_url" =>  "http://requestb.in/pkt7pgpk",
	"metadata" => array(
		"idProduto" => 13933139
	)
));
$transaction->create();
```

```csharp
using PagarMe;

PagarMeService.DefaultApiKey = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH";

Transaction transaction = new Transaction()
{
	Amount = 3100,
	CardId = "card_ci6l9fx8f0042rt16rtb477gj",
	PostbackUrl = "http://requestb.in/pkt7pgpk",
	Metadata = new AbstractModel(PagarMeService.GetDefaultService())
	{
		["idProduto"] = 13933139
	}
};
transaction.Save();
```

#### Exemplo de resposta:

```json
{
  "object": "transaction",
  "status": "processing",
  "refuse_reason": null,
  "status_reason": "acquirer",
  "acquirer_response_code": null,
  "authorization_code": null,
  "soft_descriptor": "testeDeAPI",
  "tid": null,
  "nsu": null,
  "date_created": "2015-02-25T21:54:56.000Z",
  "date_updated": "2015-02-25T21:54:56.000Z",
  "amount": 310000,
  "installments": 5,
  "id": 184220,
  "cost": 0,
  "postback_url": "http://requestb.in/pkt7pgpk",
  "payment_method": "credit_card",
  "antifraud_score": null,
  "boleto_url": null,
  "boleto_barcode": null,
  "boleto_expiration_date": null,
  "referer": "api_key",
  "ip": "189.8.94.42",
  "subscription_id": null,
  "phone": null,
  "address": null,
  "customer": null,
  "card": {
    "object": "card",
    "id": "card_ci6l9fx8f0042rt16rtb477gj",
    "date_created": "2015-02-25T21:54:56.000Z",
    "date_updated": "2015-02-25T21:54:56.000Z",
    "brand": "mastercard",
    "holder_name": "Api Customer",
    "first_digits": "548045",
    "last_digits": "3123",
    "fingerprint": "HSiLJan2nqwn",
    "valid": null
  },
  "metadata": {
    "idProduto": "13933139"
  }
}
```

### Retornando uma transação

Retorna os dados de uma transação realizada.

Propriedade | Tipo | Descrição
---|---|---
`api_key` | `String` | Chave da API
`{id}` | `String` | id da transação previamente criada

```endpoint
GET /transactions/{id}
```

#### Exemplo de requisição
```curl
# Retornando uma transação
curl -X GET https://api.pagar.me/1/transactions/184270 \
-u "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH:x"
```

```ruby
require "pagarme"

PagarMe.api_key = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH"

transaction = PagarMe::Transaction.find_by_id("184270")
```

```php
require("pagarme-php/Pagarme.php");

PagarMe::setApiKey("ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH");

$transaction = PagarMe_Transaction->findById("184270");
```

```csharp
using PagarMe;

PagarMeService.DefaultApiKey = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH";

Transaction transaction = PagarMeService.GetDefaultService().Transactions.Find("184270");
```

#### Exemplo de resposta 
```json
{
    "object": "transaction",
    "status": "paid",
    "refuse_reason": null,
    "status_reason": "acquirer",
    "acquirer_response_code": null,
    "acquirer_name": "development",
    "authorization_code": null,
    "soft_descriptor": null,
    "tid": null,
    "nsu": null,
    "date_created": "2015-02-26T15:35:32.000Z",
    "date_updated": "2015-02-26T15:35:47.000Z",
    "amount": 25000,
    "installments": 1,
    "id": 184270,
    "cost": 115,
    "postback_url": null,
    "payment_method": "boleto",
    "antifraud_score": null,
    "boleto_url": "https://pagar.me",
    "boleto_barcode": "1234 5678",
    "boleto_expiration_date": "2015-03-02T03:00:00.000Z",
    "referer": "session_id",
    "ip": "189.8.94.42",
    "subscription_id": null,
    "phone": null,
    "address": null,
    "customer": null,
    "card": null,
	"metadata": {}
}
```

### Retornando transações

Retorna um `array` contendo objetos de transações, ordenadas a partir da transação realizada mais recente

Propriedade | Tipo | Descrição
---|---|---
`api_key` | `String` | Chave da API
`count` | `Integer` | Retorna `n` objetos de transação.<br />**Valor padrão: **`10`
`page` | `Integer` | Útil para implementação de uma paginação de resultados.<br />**Valor padrão: **`1`

**OBS: Você pode passar qualquer propriedade e valor presentes nos objetos `transaction` como parâmetro de busca/filtro nesta rota. Ex: `card_last_digits=4242`**

```endpoint
PUT /transactions/{id}
```

#### Exemplo de requisição
```curl
# Retornando uma transação
curl -X GET https://api.pagar.me/1/transactions \
-u "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH:x" \
-u "count=3" \
-u "page=3"
```

```ruby
require "pagarme"

PagarMe.api_key = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH"

transaction = PagarMe::Transaction.all(3, 3)
```

```php
require("pagarme-php/Pagarme.php");

PagarMe::setApiKey("ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH");

$transaction = PagarMe_Transaction->all(3, 3);
```

```csharp
using PagarMe;

PagarMeService.DefaultApiKey = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH";

List<Transaction> transactions = PagarMeService.GetDefaultService().Transactions.FindAll();
```

#### Exemplo de resposta 
```json
{
    "object": "transaction",
    "status": "paid",
    "refuse_reason": null,
    "status_reason": "acquirer",
    "acquirer_response_code": null,
    "acquirer_name": "development",
    "authorization_code": null,
    "soft_descriptor": null,
    "tid": null,
    "nsu": null,
    "date_created": "2015-02-26T15:35:32.000Z",
    "date_updated": "2015-02-26T15:35:47.000Z",
    "amount": 25000,
    "installments": 1,
    "id": 184270,
    "cost": 115,
    "postback_url": null,
    "payment_method": "boleto",
    "antifraud_score": null,
    "boleto_url": "https://pagar.me",
    "boleto_barcode": "1234 5678",
    "boleto_expiration_date": "2015-03-02T03:00:00.000Z",
    "referer": "session_id",
    "ip": "189.8.94.42",
    "subscription_id": null,
    "phone": null,
    "address": null,
    "customer": null,
    "card": null,
	"metadata": {}
}
```

### Gerando uma nova chave para encriptação do `card_hash`

Caso você queira/precise criar o `card_hash` manualmente, essa rota deverá ser utilizada para obtenção de uma chave pública de encriptação dos dados do cartão de seu cliente.

Saiba mais sobre como criar um `card_hash` [aqui](https://pagar.me/docs/capturing-card-data/#capturando-os-dados-em-uma-pagina-web).

**Atenção: Utilizar apenas em ambiente de teste!!!**

```endpoint
GET /transactions/card_hash_key
```

Propriedade | Tipo | Descrição
---|---|---
`encryption_key`<br />**obrigatório** | `String` | Chave de criptografia

#### Exemplo de requisição:

```curl
curl -X GET https://api.pagar.me/1/transactions/card_hash_key \
-d 'encryption_key=ek_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
require "pagarme"

// Getting response
card_hash_key = PagarMe::Transaction.generate_card_hash('ek_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0')

print(card_hash_key) 
```

```php
require('pagarme-php/Pagarme.php');

$transaction = new PagarMe_Transaction(array(
	 "amount" => 3100,
     "card_id" => "card_ci6l9fx8f0042rt16rtb477gj",
     "postback_url" => "http://requestb.in/1ahq78t1",
     "metadata" => array(
     	"idProduto" => 13933139
	 )
));

// Getting public_key Property
$card_hash_key = $transaction->generateCardHash();

var_dump($card_hash_key);
```

```csharp
using PagarMe;

PagarMeService.DefaultEncryptionKey = "ek_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0";

CardHash cardHash = new CardHash()
{
	CardNumber = "4242424242424242",
    CardExpirationDate = "0933",
    CardHolderName = "Teste PagarMe",
    CardCvv = "123"
};

// Getting public_key Property
String key = cardHash.Generate();

Console.Write(key);
```

#### Exemplo de resposta:
```json
{
    "date_created": "2015-02-27T15:44:26.000Z",
    "id": 111111,
    "ip": "000.0.00.00",
    "public_key": "-----BEGIN PUBLIC KEY-----\ -----END PUBLIC KEY-----\ "
}
```

### Retornando as regras de divisão de uma transação

Retorna os dados das regras de divisão do valor transacionado.

```endpoint
GET /transactions/{transaction_id}/split_rules
```

Propriedade | Tipo | Descrição
---|---|---
`api_key`<br />**obrigatório** | `String` | Chave da api
`transaction_id`<br />**obrigatório** | `Integer` | Id da transação previamente criada

#### Exemplo de requisição:

```curl
curl -X GET https://api.pagar.me/1/transactions/189164/split_rules \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
require "pagarme"

PagarMe.api_key = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0"

transaction = PagarMe::Transaction.find_by_id(189164)
split_rules = transaction.split_rules()

print(split_rules)
```

```php
<?php

require("pagarme-php/Pagarme.php");

PagarMe::setApiKey("ak_test_qtDOZfF5K0VDn17k04NxnQPIZ3r5wV");

$TransactionCommon = new PagarMe_TransactionCommon();
$split_rules = $TransactionCommon->getSplitRules(543065);

print_r($split_rules);

?>
```

```csharp
```

#### Exemplo de retorno:

```json
[{
    "object": "split_rule",
    "id": "sr_ci7ntawl1001s2m164zrbp7tz",
    "recipient_id": "re_ci7nhf1ay0007n016wd5t22nl",
    "charge_processing_fee": true,
    "liable": true,
    "percentage": 30,
    "amount": null,
    "date_created": "2015-03-24T21:26:09.000Z",
    "date_updated": "2015-03-24T21:26:09.000Z"
}, {
    "object": "split_rule",
    "id": "sr_ci7ntawl1001t2m1606u3e0uw",
    "recipient_id": "re_ci7nheu0m0006n016o5sglg9t",
    "charge_processing_fee": true,
    "liable": false,
    "percentage": 70,
    "amount": null,
    "date_created": "2015-03-24T21:26:09.000Z",
    "date_updated": "2015-03-24T21:26:09.000Z"
}]
```

### Retornando uma regra de divisão específica

Retorna os dados de uma regra de divisão de uma determinada transaçào.

```endpoint
GET /transactions/{transaction_id}/split_rules/{id}
```

Propriedade | Tipo | Descrição
---|---|---
`api_key`<br />**obrigatório** | `String` | Chave da api
`transaction_id`<br />**obrigatório** | `Integer` | Id da transação previamente criada
`id`<br />**obrigatório** | `Integer` | Id da regra de split previamente criada

#### Exemplo de requisição:

```curl
curl -X GET https://api.pagar.me/1/transactions/189164/split_rules/sr_ci7ntawl1001s2m164zrbp7tz \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
```

```php
```

```csharp
```

#### Exemplo de resposta:

```json
{
    "object": "split_rule",
    "id": "sr_ci7ntawl1001s2m164zrbp7tz",
    "recipient_id": "re_ci7nhf1ay0007n016wd5t22nl",
    "charge_processing_fee": true,
    "liable": true,
    "percentage": 30,
    "amount": null,
    "date_created": "2015-03-24T21:26:09.000Z",
    "date_updated": "2015-03-24T21:26:09.000Z"
}
```

### Retornando pagamentos da transação

```endpoint
GET /transactions/{transaction_id}/payables
```

Propriedade | Tipo | Descrição
---|---|---
`api_key`<br />**obrigatório** | `String` | Chave da api
`transaction_id`<br />**obrigatório** | `Integer` | Id da transação previamente criada

#### Exemplo de requisição:

```curl
curl -X GET https://api.pagar.me/1/transactions/192669/payables \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
```

```php
```

```csharp
```

#### Exemplo de resposta:

```json
[{
    "object": "payable",
    "id": 1485,
    "status": "paid",
    "amount": 39000,
    "fee": 115,
    "installment": null,
    "transaction_id": 192669,
    "split_rule_id": "sr_ci87hce8o00083016bkniqems",
    "payment_date": "2015-04-07T03:00:00.000Z",
    "type": "credit",
    "payment_method": "boleto",
    "date_created": "2015-04-07T15:47:48.000Z"
}, {
    "object": "payable",
    "id": 1486,
    "status": "paid",
    "amount": 91000,
    "fee": 0,
    "installment": null,
    "transaction_id": 192669,
    "split_rule_id": "sr_ci87hce8o00093016fin8p6ll",
    "payment_date": "2015-04-07T03:00:00.000Z",
    "type": "credit",
    "payment_method": "boleto",
    "date_created": "2015-04-07T15:47:48.000Z"
}]
```

### Retornando um pagamento da transação

Retorna um objeto `payable` informando os dados de um pagamento referente a uma determinada transação.

```endpoint
GET /transactions/{transaction_id}/payables/{id}
```

Propriedade | Tipo | Descrição
---|---|---
`api_key`<br />**obrigatório** | `String` | Chave da api
`transaction_id`<br />**obrigatório** | `Integer` | Id da transação previamente criada
`id`<br />**obrigatório** | `Integer` | Identificador do objeto `payable`

#### Exemplo de requisição:

```curl
curl -X GET https://api.pagar.me/1/transactions/192669/payables/1485 \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
```

```php
```

```csharp
```

#### Exemplo de resposta:

```json
{
    "object": "payable",
    "id": 1485,
    "status": "paid",
    "amount": 39000,
    "fee": 115,
    "installment": null,
    "transaction_id": 192669,
    "split_rule_id": "sr_ci87hce8o00083016bkniqems",
    "payment_date": "2015-04-07T03:00:00.000Z",
    "type": "credit",
    "payment_method": "boleto",
    "date_created": "2015-04-07T15:47:48.000Z"
}
```

### Retornando todas as análises antifraude

Retorna todas as análises antifraude realizadas em uma transação.

```endpoint
GET /transactions/{transaction_id}/antifraud_analyses
```

Propriedade | Tipo | Descrição
---|---|---
`api_key`<br />**obrigatório** | `String` | Chave da api
`transaction_id`<br />**obrigatório** | `Integer` | Id da transação previamente criada

#### Exemplo de requisição:

```curl
curl -X GET https://api.pagar.me/1/transactions/314578/antifraud_analyses \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
```

```php
```

```csharp
```

#### Exemplo de resposta:

```json
[{
    "object": "antifraud_analysis",
    "name": "name",
    "score": "score",
    "cost": "cost",
    "status": "status",
    "date_created": "date_created",
    "date_updated": "date_updated",
    "id": "id"
}]
```
### Retornando uma análise antifraude

Retorna uma análise antifraude específica realizada em uma transação.

```endpoint
GET /transactions/{transaction_id}/antifraud_analyses/{id}
```

Propriedade | Tipo | Descrição
---|---|---
`api_key`<br />**obrigatório** | `String` | Chave da api
`transaction_id`<br />**obrigatório** | `Integer` | Id da transação previamente criada
`id`<br />**obrigatório** | `Integer` | Id da análise previamente feita

#### Exemplo de requisição:

```curl
curl -X GET https://api.pagar.me/1/transactions/314578/antifraud_analyses/913456 \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
```

```php
```

```csharp
```

#### Exemplo de resposta:

```json
{
    "object": "antifraud_analysis",
    "name": "name",
    "score": "score",
    "cost": "cost",
    "status": "status",
    "date_created": "date_created",
    "date_updated": "date_updated",
    "id": "id"
}
```

### Retornando todos os POSTbacks

Retorna todos os POSTbacks enviados relacionados a transação.

```endpoint
GET /transactions/{transaction_id}/postbacks
```

Propriedade | Tipo | Descrição
---|---|---
`api_key`<br />**obrigatório** | `String` | Chave da api
`transaction_id`<br />**obrigatório** | `Integer` | Id da transação previamente criada

#### Exemplo de requisição:

```curl
curl -X GET https://api.pagar.me/1/transactions/314578/postbacks \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
```

```php
```

```csharp
```

#### Exemplo de resposta:

```json
[{
	"date_created": "2015-06-12T05:41:57.000Z", 
	"date_updated": "2015-06-12T05:42:07.000Z", 
	"deliveries":
	[
		{
			 "date_created": "2015-06-12T05:42:06.000Z", 
	         "date_updated": "2015-06-12T05:42:07.000Z", 
	         "id": "pd_ciat6szv2002yk06nyhacqmr4", 
	         "object": "postback_delivery", 
	         "response_body": "", 
	         "response_headers": "{\"cache-control\":\"no-cache\",\"pragma\":\"no-cache\",\"content-length\":\"0\",\"expires\":\"-1\",\"server\":\"Microsoft-IIS/8.0\",\"x-aspnet-version\":\"4.0.30319\",\"x-powered-by\":\"ASP.NET\",\"set-cookie\":[\"ARRAffinity=663d85223525d21e72aebd941082ca482841f5719c27124196939b3de6204504;Path=/;Domain=requestb.in\"],\"date\":\"Fri, 12 Jun 2015 05:42:06 GMT\",\"connection\":\"close\"}", 
	         "response_time": 516, 
	         "status": "success", 
	         "status_code": "200", 
	         "status_reason": "http_status_code"
		}
	], 
	"headers": "{\"Content-Type\":\"application/x-www-form-urlencoded\",\"X-PagarMe-Event\":\"transaction_status_changed\",\"X-Hub-Signature\":\"sha1=d825b60eee7f3034484be584ccca20d3f7bb8c5b\",\"User-Agent\":\"PagarMe-Hookshot/1.0\"}", 
	"id": "po_ciat6ssga0022k06ng8vxg", 
	"model": "transaction", 
	"model_id": "674579", 
	"next_retry": null, 
	"object": "postback", 
	"payload": "id=674579&fingerprint=05112b2b5d756a1501d994027c95d3202c7b&event=transaction_status_changed&old_status=authorized&desired_status=paid&current_status=refused&object=transaction", 
	"request_url": "http://requestb.in/1azqnq81?inspect", 
	"retries": 0, 
	"signature": "d825b60eee7f3034484be584d3f7bb8c5b", 
	"status": "success"
}]
```
### Retornando um POSTback

Retorna um POSTback específico enviado relacionado a transação.

```endpoint
GET /transactions/{transaction_id}/postbacks/{id}
```

Propriedade | Tipo | Descrição
---|---|---
`api_key`<br />**obrigatório** | `String` | Chave da api
`transaction_id`<br />**obrigatório** | `Integer` | Id da transação previamente criada
`id`<br />**obrigatório** | `Integer` | id do POSTback

#### Exemplo de requisição:

```curl
curl -X GET https://api.pagar.me/1/transactions/314578/postbacks/po_ciat6ssga0022k06ng8vxg \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
```

```php
```

```csharp
```

#### Exemplo de resposta:

```json
{
	"date_created": "2015-06-12T05:41:57.000Z", 
	"date_updated": "2015-06-12T05:42:07.000Z", 
	"deliveries":
	[
		{
			 "date_created": "2015-06-12T05:42:06.000Z", 
	         "date_updated": "2015-06-12T05:42:07.000Z", 
	         "id": "pd_ciat6szv2002yk06nyhacqmr4", 
	         "object": "postback_delivery", 
	         "response_body": "", 
	         "response_headers": "{\"cache-control\":\"no-cache\",\"pragma\":\"no-cache\",\"content-length\":\"0\",\"expires\":\"-1\",\"server\":\"Microsoft-IIS/8.0\",\"x-aspnet-version\":\"4.0.30319\",\"x-powered-by\":\"ASP.NET\",\"set-cookie\":[\"ARRAffinity=663d85223525d21e72aebd941082ca482841f5719c27124196939b3de6204504;Path=/;Domain=requestb.in\"],\"date\":\"Fri, 12 Jun 2015 05:42:06 GMT\",\"connection\":\"close\"}", 
	         "response_time": 516, 
	         "status": "success", 
	         "status_code": "200", 
	         "status_reason": "http_status_code"
		}
	], 
	"headers": "{\"Content-Type\":\"application/x-www-form-urlencoded\",\"X-PagarMe-Event\":\"transaction_status_changed\",\"X-Hub-Signature\":\"sha1=d825b60eee7f3034484be584ccca20d3f7bb8c5b\",\"User-Agent\":\"PagarMe-Hookshot/1.0\"}", 
	"id": "po_ciat6ssga0022k06ng8vxg", 
	"model": "transaction", 
	"model_id": "674579", 
	"next_retry": null, 
	"object": "postback", 
	"payload": "id=674579&fingerprint=05112b2b5d756a1501d994027c95d3202c7b&event=transaction_status_changed&old_status=authorized&desired_status=paid&current_status=refused&object=transaction", 
	"request_url": "http://requestb.in/1azqnq81?inspect", 
	"retries": 0, 
	"signature": "d825b60eee7f3034484be584d3f7bb8c5b", 
	"status": "success"
}
```

### Retornando todos os eventos de uma transação

Retorna todos os eventos já criados dentro de uma transação. 
**Ex: **mudanças de status.

```endpoint
GET /transactions/{transaction_id}/events
```

Propriedade | Tipo | Descrição
---|---|---
`api_key`<br />**obrigatório** | `String` | Chave da api
`transaction_id`<br />**obrigatório** | `Integer` | Id da transação previamente criada

#### Exemplo de requisição:

```curl
curl -X GET https://api.pagar.me/1/transactions/314578/events \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
```

```php
```

```csharp
```

#### Exemplo de resposta:

```json
[
	{
		"id": "ev_cift4mmt800t7z55z343v6xto", 
      	"model": "transaction", 
       	"model_id": "314578", 
       	"name": "transaction_status_changed", 
       	"object": "event", 
       	"payload":
	   	{
	   		"current_status": "paid", 
       		"desired_status": "paid", 
       		"old_status": "processing"
       	}
	}, 
	{
		"id": "ev_cift4nz1200t8zda33zh7zilzkt", 
		"model": "transaction", 
		"model_id": "314578", 
		"name": "transaction_status_changed", 
		"object": "event", 
		"payload":
		{
			"current_status": "refunded", 
			"desired_status": "refunded", 
			"old_status": "paid"
		}
	}
]
```

### Retornando todo histórico de uma transação

Retorna todo o histórico de uma transaçnao, ou seja, toda e qualquer operação que já aconteceu com ela.

**Ex: **autorização, análise antifraude, captura, estorno, chargeback, emissão de boleto, conciliação, etc.

```endpoint
GET /transactions/{transaction_id}/operations
```

Propriedade | Tipo | Descrição
---|---|---
`api_key`<br />**obrigatório** | `String` | Chave da api
`transaction_id`<br />**obrigatório** | `Integer` | Id da transação previamente criada

#### Exemplo de requisição:

```curl
curl -X GET https://api.pagar.me/1/transactions/314578/operations \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
```

```php
```

```csharp
```

#### Exemplo de resposta:

```json
[
	{
		"date_created": "2015-10-16T03:59:40.000Z", 
		"date_updated": "2015-10-16T03:59:42.000Z", 
		"ended_at": 1444967982134, 
		"fail_reason": null, 
		"group_id": "gog_cift4ml505xsfce3ff9o8xgyv", 
		"id": "go_cift4ml505xsece3fqltn2ok0", 
		"metadata":
		{
		    "environment": {}
		}, 
		"model": "transaction", 
		"model_id": "314578", 
		"next_group_id": "gog_cift4nxyp5mj9on3ehfthtxiy", 
		"processor": "pagarme", 
		"processor_response_code": null, 
		"request_id": "gr_cift4ml3c5xsdce3fistg0u6q", 
		"rollbacked": false, 
		"started_at": 1444967981743, 
		"status": "success", 
		"type": "capture"
	}, 
	{
		"date_created": "2015-10-16T03:59:40.000Z", 
		"date_updated": "2015-10-16T03:59:41.000Z", 
		"ended_at": 1444967981722, 
		"fail_reason": null, 
		"group_id": "gog_cift4ml5k5xshce3fqqjaeijr", 
		"id": "go_cift4ml5k5xsgce3fjelkr3c6", 
		"metadata":
		{
		    "environment": {
		        "authorization_code": "07482", 
		        "nsu": "314578", 
		        "response_code": "0000", 
		        "tid": "314578"
		    }
		}, 
		"model": "transaction", 
		"model_id": "314578", 
		"next_group_id": "gog_cift4ml505xsfce3ff9o8xgyv", 
		"processor": "pagarme", 
		"processor_response_code": "0000", 
		"request_id": "gr_cift4ml3c5xsdce3fistg0u6q", 
		"rollbacked": false, 
		"started_at": 1444967980241, 
		"status": "success", 
		"type": "authorize"
	}, 
	{
		"date_created": "2015-10-16T04:00:43.000Z", 
		"date_updated": "2015-10-16T04:00:44.000Z", 
		"ended_at": 1444968044662, 
		"fail_reason": null, 
		"group_id": "gog_cift4nxyp5mj9on3ehfthtxiy", 
		"id": "go_cift4nxyp5mj8on3e6e2k1d6t", 
		"metadata":
		{
		    "environment": {}
		}, 
		"model": "transaction", 
		"model_id": "314578", 
		"next_group_id": null, 
		"processor": "pagarme", 
		"processor_response_code": null, 
		"request_id": "gr_cift4nxy15mj7on3edu9sf4fj", 
		"rollbacked": false, 
		"started_at": 1444968043510, 
		"status": "success", 
		"type": "refund"
	}
]
```

#### Notificando cliente sobre boleto a ser pago

Envia o link de um boleto pendente para o cliente.

**OBS: **Essa rota não funciona em ambiente de testes.

```endpoint
POST /transactions/{id}/collect_payment
```

Propriedade | Tipo | Descrição
---|---|---
`api_key`<br />**obrigatório** | `String` | Chave da api
`id`<br />**obrigatório** | `Integer` | Id da transação previamente criada
`email`<br />**obrigatório** | `String` | Email a ser enviado o link do boleto

#### Exemplo de requisição:
```curl
curl -X POST https://api.pagar.me/1/transactions/314578/collect_payment \
-d 'api_key=ak_live_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' \
-d 'email=seu@email.com'
```

```ruby
```

```php
```

```csharp
```

#### Exemplo de resposta
```json
{}
```

### Capturando uma transação posteriormente

Você pode capturar o valor de uma transação após a autorização desta, no prazo máximo de 5 dias após a autorização.

Propriedade | Tipo | Descrição
---|---|---
`api_key`<br />**obrigatório** | `String` | Chave da api
`id`<br />**obrigatório** | `Integer` | Id da transação previamente criada

#### Exemplo de requisição:
```curl
curl -X POST https://api.pagar.me/1/transactions/314578/capture \
-d 'api_key=ak_live_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' \
-d 'email=seu@email.com'
```

```ruby
require 'pagarme'

PagarMe.api_key = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0"

transaction = PagarMe::Transaction.find_by_id("1234")

transaction.capture({:amount => 1000})
```

```php
<?php
    require("pagarme-php/Pagarme.php");

    Pagarme::setApiKey("ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0");

    $t = new PagarMe_Transaction(array(
      "amount" => 3100,
      "card_id" => "card_ci6l9fx8f0042rt16rtb477gj",
      "postback_url" => "http://requestb.in/1ahq78t1",
      "capture" => "false",
      "metadata" => array(
        "idProduto" => 13933139
      )
    ));

    $t->charge();

    $t->capture(3100);
?>
```

```csharp
PagarMeService.DefaultApiKey = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0";

Transaction transaction = new Transaction();

transaction.Amount = 3100;
transaction.CardId = "card_ci6l9fx8f0042rt16rtb477gj";
transaction.PostbackUrl = "http://requestb.in/pkt7pgpk";
transaction.Metadata = new AbstractModel(PagarMeService.GetDefaultService())
{
	["IdProduto"] = 13933139
};
transaction.Save();

transaction.Capture(3100);
```

#### Exemplo de resposta
```json
{
	"object": "transaction",
	"status": "authorized",
	"refuse_reason": null,
	"status_reason": "acquirer",
	"acquirer_response_code": "00",
	"acquirer_name": "development",
	"authorization_code": "132534",
	"soft_descriptor": "testeDeApi",
	"tid": "1425302906112",
	"nsu": "1425302906112",
	"date_created": "2015-03-02T13:28:25.000Z",
	"date_updated": "2015-03-02T13:28:26.000Z",
	"amount": 130000,
	"installments": 1,
	"id": 184622,
	"cost": 0,
	"postback_url": "http://requestb.in/pkt7pgpk",
	"payment_method": "credit_card",
	"antifraud_score": null,
	"boleto_url": null,
	"boleto_barcode": null,
	"boleto_expiration_date": null,
	"referer": "api_key",
	"ip": "189.8.94.42",
	"subscription_id": null,
	"phone": null,
	"address": null,
	"customer": null,
	"card":
	{
		"object": "card",
		"id": "card_ci6l9fx8f0042rt16rtb477gj",
		"date_created": "2015-02-25T21:54:56.000Z",
		"date_updated": "2015-02-25T21:54:57.000Z",
		"brand": "mastercard",
		"holder_name": "Api Customer",
		"first_digits": "548045",
		"last_digits": "3123",
		"fingerprint": "HSiLJan2nqwn",
		"valid": true
	},
	"metadata":
	{
		"nomeData": "API Doc test",
		"idData": "13"
	}
}
```

