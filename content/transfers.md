## Transferências

### Objeto transfer

Propriedade              | Tipo      | Descrição
---                      | ---       | ---
`object`                 | `String`  | Nome do tipo do objeto criado/modificado
`id`                     | `Integer` | Id da transferência
`amount`                 | `Integer` | Valor em centavos transferido
`type`                   | `String`  | Tipo de transferência. <br /> **Valores possíveis:** `ted`, `doc` e `credito_em_conta`
`status`                 | `String`  | Estado da transferência.<br /> **Valores possíveis:** `pending_transfer`, `transferred`, `failed`, `processing` e `canceled`
`source_type`            | `String`  | O tipo de origem da qual irá ser transferido o valor
`source_id`              | `String`  | O id da origem da transferencia
`target_type`            | `String`  | O tipo de destino da transferencia
`target_id`              | `String`  | O id do destino da transferencia
`fee`                    | `Integer` | Taxa em centavos cobrada pela transferência
`funding_date`           | `String`  | Data ocorrência da transferência no formato ISODate
`funding_estimated_date` | `String`  | Data estimada para efetivação da transferência no formato ISODate
`transaction_id`         | `Integer` | Id da transação estornada no caso de estorno de boleto
`date_created`           | `String`  | Data de criação da transferência no formato ISODate
`bank_account`           | `Object`  | Objeto da conta bancária. [Saiba mais](/#objeto-bank_account)

#### Exemplo do objeto

```json
{
  "object": "transfer",
  "id": 7118,
  "amount": 100,
  "type": "ted",
  "status": "pending_transfer",
  "source_type": "recipient",
  "source_id": "re_cir2eay5b005hij6dkbhkmnlh",
  "target_type": "bank_account",
  "target_id": "15236764",
  "fee": 367,
  "funding_date": null,
  "funding_estimated_date": "2016-07-26T03:00:00.000Z",
  "transaction_id": null,
  "date_created": "2016-07-25T19:49:03.232Z",
  "bank_account": {
    "object": "bank_account",
    "id": 15236764,
    "bank_code": "341",
    "agencia": "0932",
    "agencia_dv": "1",
    "conta": "12345",
    "conta_dv": "1",
    "document_type": "cpf",
    "document_number": "26268738888",
    "legal_name": "API_BANK_ACCOUNT",
    "charge_transfer_fees": true,
    "date_created": "2016-07-25T18:51:57.491Z"
  }
}
```

### Criar uma transferência

Realiza uma transferência para uma conta bancária previamente criada.

Parâmetro | Tipo | Descrição
---|---|---
`api_key` | `String` | Chave da API, disponivel em seu Dashboard
`amount` <br /> **Obrigatório** | `Integer` | Valor em centavos a ser transferido para uma determinada conta bancária
`bank_account_id` | `String` | Id da conta bancária que irá receber a transferência. <br />**Obrigatório caso queira que o valor saia do saldo do recebedor padrão**
`recipient_id` | `String` | Id do recebedor de onde o valor da transferência sairá. <br />**Obrigatório caso queira que o valor saia do saldo do recebedor associado a esse id**

```endpoint
POST /transfers
```

#### Exemplo de requisição

```curl
# Criando uma transferência a partir do recebedor padrão
curl -X POST https://api.pagar.me/1/transfers \
-u "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH:x" \
-d "amount=100" \
-d "bank_account_id=13709856"

# Criando uma transferência a partir de um recebedor específico
curl -X POST https://api.pagar.me/1/transfers \
-u "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH:x" \
-d "amount=100" \
-d "recipient_id=re_cim2ikkfy000hyg6dsfa3uotl"
```

```ruby
# Sem exemplo
```

```php
 Sem exemplo
```

```csharp
// Sem exemplo
```

#### Exemplo de resposta

```json
{
  "object": "transfer",
  "id": 7118,
  "amount": 100,
  "type": "ted",
  "status": "pending_transfer",
  "source_type": "recipient",
  "source_id": "re_cir2eay5b005hij6dkbhkmnlh",
  "target_type": "bank_account",
  "target_id": "15236764",
  "fee": 367,
  "funding_date": null,
  "funding_estimated_date": "2016-07-26T03:00:00.000Z",
  "transaction_id": null,
  "date_created": "2016-07-25T19:49:03.232Z",
  "bank_account": {
    "object": "bank_account",
    "id": 15236764,
    "bank_code": "341",
    "agencia": "0932",
    "agencia_dv": "1",
    "conta": "12345",
    "conta_dv": "1",
    "document_type": "cpf",
    "document_number": "26268738888",
    "legal_name": "API_BANK_ACCOUNT",
    "charge_transfer_fees": true,
    "date_created": "2016-07-25T18:51:57.491Z"
  }
}
```

### Criar uma transferencia entre recebedores

Realiza uma transferência do saldo de um `source` para o saldo de um `target`, com a condição de que um deles **deve** ser o recebedor padrão de sua company.

Parâmetro | Tipo | Descrição
---|---|---
`api_key` <br /> **Obrigatório** | `String` | Chave da API, disponível em seu Dashboard
`amout` <br /> **Obrigatório** | `Integer` | Valor, em centavos, a ser transferido
`source_id`<br /> **Obrigatório** | `String` | Identificador do recebedor origem da transferencia
`target_id` <br /> **Obrigatório** | `String` | Identificador do destino da transferencia

```endpoint
POST https://api.pagar.me/1/transfers
```


#### Exemplo de requisição

```curl
#curl -X POST https://api.pagar.me/1/transfers \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' \
-d 'amount=13000' \
-d 'source_id=re_cimcpc2qc002za46d9dt4vfok' \
-d 'target_id=re_cimedz85n000xw56eor49cwk7' Criando uma transferência a partir do recebedor padrão
```

```ruby
# Sem exemplo
```

```php
// Sem exemplo
```

```csharp
// Sem exemplo
```

#### Exemplo de resposta

```json
{
  "object": "transfer",
  "id": 7119,
  "amount": 4000,
  "type": "inter_recipient",
  "status": "transferred",
  "source_type": "recipient",
  "source_id": "re_cio7ypzbp01d1y76e178xp42y",
  "target_type": "recipient",
  "target_id": "re_cir2eay5b005hij6dkbhkmnlh",
  "fee": 0,
  "funding_date": "2016-07-25T21:00:10.834Z",
  "funding_estimated_date": "2016-07-25T21:00:10.834Z",
  "transaction_id": null,
  "date_created": "2016-07-25T21:00:10.834Z",
  "recipient": {
    "object": "recipient",
    "id": "re_cir2eay5b005hij6dkbhkmnlh",
    "transfer_enabled": false,
    "last_transfer": null,
    "transfer_interval": "weekly",
    "transfer_day": 5,
    "automatic_anticipation_enabled": false,
    "anticipatable_volume_percentage": 0,
    "date_created": "2016-07-25T18:57:14.598Z",
    "date_updated": "2016-07-25T18:57:14.598Z",
    "bank_account": {
      "object": "bank_account",
      "id": 15236764,
      "bank_code": "341",
      "agencia": "0932",
      "agencia_dv": "1",
      "conta": "12345",
      "conta_dv": "1",
      "document_type": "cpf",
      "document_number": "26268738888",
      "legal_name": "API_BANK_ACCOUNT",
      "charge_transfer_fees": true,
      "date_created": "2016-07-25T18:51:57.491Z"
    }
  }
}
```

### Retornar uma transferência

Retorna uma transferência específica

Parâmetro | Tipo | Descrição
---|---|---
`api_key` <br /> **Obrigatório** | `Integer` | Chave da API, disponível em seu Dashboard
`id` <br /> **Obrigatório** | `Ìnteger` | Id da transferência

```endpoint
GET /transfers/{id}
```

#### Exemplo de requisição

```curl
# Retornando uma transferência
curl -X GET https://api.pagar.me/1/transfers/7118 \
-u "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH:x"
```

```ruby
# Sem exemplo
```

```php
// Sem exemplo
```

```csharp
// Sem exemplo
```

#### Exemplo de resposta

```json
{
  "object": "transfer",
  "id": 7118,
  "amount": 100,
  "type": "ted",
  "status": "pending_transfer",
  "source_type": "recipient",
  "source_id": "re_cir2eay5b005hij6dkbhkmnlh",
  "target_type": "bank_account",
  "target_id": "15236764",
  "fee": 367,
  "funding_date": null,
  "funding_estimated_date": "2016-07-26T03:00:00.000Z",
  "transaction_id": null,
  "date_created": "2016-07-25T19:49:03.232Z",
  "bank_account": {
    "object": "bank_account",
    "id": 15236764,
    "bank_code": "341",
    "agencia": "0932",
    "agencia_dv": "1",
    "conta": "12345",
    "conta_dv": "1",
    "document_type": "cpf",
    "document_number": "26268738888",
    "legal_name": "API_BANK_ACCOUNT",
    "charge_transfer_fees": true,
    "date_created": "2016-07-25T18:51:57.491Z"
  }
}
```

### Retornar todas as transferências

Retorna todas as transferências.

Parâmetro | Tipo | Descrição
---|---|---
`api_key` <br /> **Obrigatório** | `String` | Chave da API, disponível em seu dashboard
`page` <br /> **Padrão: 1** | `Integer` | Útil para implementação de uma paginação de resultados
`count` <br /> **Padrão: 10** | `Integer` | Retorna `n` objetos de `transfer`

```endpoint
GET /transfers
```

#### Exemplo de requisição

```curl
# Retornando todas as transferências
curl -X GET https://api.pagar.me/1/transfers \
-u "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH:x" \
-d "page=1" \
-d "count=2"
```

```ruby
# Sem exemplo
```

```php
// Sem exemplo
```

```csharp
// Sem exemplo
```

#### Exemplo de resposta

```json
[
  {
    "object": "transfer",
    "id": 7118,
    "amount": 100,
    "type": "ted",
    "status": "pending_transfer",
    "source_type": "recipient",
    "source_id": "re_cir2eay5b005hij6dkbhkmnlh",
    "target_type": "bank_account",
    "target_id": "15236764",
    "fee": 367,
    "funding_date": null,
    "funding_estimated_date": "2016-07-26T03:00:00.000Z",
    "transaction_id": null,
    "date_created": "2016-07-25T19:49:03.232Z",
    "bank_account": {
      "object": "bank_account",
      "id": 15236764,
      "bank_code": "341",
      "agencia": "0932",
      "agencia_dv": "1",
      "conta": "12345",
      "conta_dv": "1",
      "document_type": "cpf",
      "document_number": "26268738888",
      "legal_name": "API_BANK_ACCOUNT",
      "charge_transfer_fees": true,
      "date_created": "2016-07-25T18:51:57.491Z"
    }
  },
  {
    "object": "transfer",
    "id": 7114,
    "amount": 4000,
    "type": "inter_recipient",
    "status": "transferred",
    "source_type": "recipient",
    "source_id": "re_cio7ypzbp01d1y76e178xp42y",
    "target_type": "recipient",
    "target_id": "re_cir2eay5b005hij6dkbhkmnlh",
    "fee": 0,
    "funding_date": "2016-07-25T19:39:50.239Z",
    "funding_estimated_date": "2016-07-25T19:39:50.239Z",
    "transaction_id": null,
    "date_created": "2016-07-25T19:39:50.239Z",
    "recipient": {
      "object": "recipient",
      "id": "re_cir2eay5b005hij6dkbhkmnlh",
      "transfer_enabled": false,
      "last_transfer": null,
      "transfer_interval": "weekly",
      "transfer_day": 5,
      "automatic_anticipation_enabled": false,
      "anticipatable_volume_percentage": 0,
      "date_created": "2016-07-25T18:57:14.598Z",
      "date_updated": "2016-07-25T18:57:14.598Z",
      "bank_account": {
        "object": "bank_account",
        "id": 15236764,
        "bank_code": "341",
        "agencia": "0932",
        "agencia_dv": "1",
        "conta": "12345",
        "conta_dv": "1",
        "document_type": "cpf",
        "document_number": "26268738888",
        "legal_name": "API_BANK_ACCOUNT",
        "charge_transfer_fees": true,
        "date_created": "2016-07-25T18:51:57.491Z"
      }
    }
  }
]
```

### Cancelar uma transferência

Cancela uma transferência específica

Parâmetro | Tipo | Descrição
---|---|---
`api_key` <br /> **Obrigatório** | `String` | Chave da API, disponível em seu dashboard
`id` <br /> **Obrigatório** | `Integer` | Id da transferência

```endpoint
POST /transfers/{id}/cancel
```

#### Exemplo de requisição

```curl
# Cancelando uma transferência
curl -X POST https://api.pagar.me/1/transfers/3050/cancel \
-u "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH:x"
```

```ruby
# Sem exemplo
```

```php
// Sem exemplo
```

```csharp
// Sem exemplo
```

#### Exemplo de resposta

```json
{
  "object": "transfer",
  "id": 7118,
  "amount": 100,
  "type": "ted",
  "status": "canceled",
  "source_type": "recipient",
  "source_id": "re_cir2eay5b005hij6dkbhkmnlh",
  "target_type": "bank_account",
  "target_id": "15236764",
  "fee": 367,
  "funding_date": null,
  "funding_estimated_date": "2016-07-26T03:00:00.000Z",
  "transaction_id": null,
  "date_created": "2016-07-25T19:49:03.232Z",
  "bank_account": {
    "object": "bank_account",
    "id": 15236764,
    "bank_code": "341",
    "agencia": "0932",
    "agencia_dv": "1",
    "conta": "12345",
    "conta_dv": "1",
    "document_type": "cpf",
    "document_number": "26268738888",
    "legal_name": "API_BANK_ACCOUNT",
    "charge_transfer_fees": true,
    "date_created": "2016-07-25T18:51:57.491Z"
  }
}
```
