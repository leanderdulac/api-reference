## Transferências

### Objeto transfer

Propriedade | Tipo | Descrição
---|---|---
`amount` | `integer` | Valor em centavos transferido
`bank_account` | `object` | Objeto da conta bancária. [Saiba mais](/#objeto-bank_account)
`date_created` | `string` | Data de criação da transferência no formato ISODate
`fee` | `integer` | Taxa em centavos cobrada pela transferência
`funding_date` | `string` | Data ocorrência da transferência no formato ISODate
`funding_estimated_date` | `string` | Data estimada para efetivação da transferência no formato ISODate
`id` | `integer` | Id da transferência
`object` | `string` | Nome do tipo do objeto criado/modificado
`status` | `string` | Estado da transferência. **Valores possíveis:** `pending_transfer`, `transferred`, `failed`, `processing` e `canceled`
`transaction_id` | `integer` | Id da transação estornada no caso de estorno de boleto
`type` | `string` | Tipo de transferência. **Valores possíveis:** `ted`, `doc` e `credito_em_conta`

#### Exemplo do objeto

```json
{
    "anticipatable_volume_percentage": 0,
    "automatic_anticipation_enabled": false,
    "bank_account": {
        "agencia": "0808",
        "agencia_dv": "8",
        "bank_code": "184",
        "charge_transfer_fees": true,
        "conta": "08808",
        "conta_dv": "8",
        "date_created": "2016-05-27T17:47:03.531Z",
        "document_number": "00000000000000",
        "document_type": "cnpj",
        "id": 13709856,
        "legal_name": "RICHARD DESCHAMPS",
        "object": "bank_account"
    },
    "date_created": "2016-03-21T21:38:10.175Z",
    "date_updated": "2016-05-27T17:47:54.204Z",
    "id": "re_cim2ikkfy000hyg6dsfa3uotl",
    "last_transfer": null,
    "object": "recipient",
    "transfer_day": null,
    "transfer_enabled": false,
    "transfer_interval": null
}
```

### Criar uma transferência

Realiza uma transferência para uma conta bancária previamente criada.

Parâmetro | Descrição
---|---
`amount` (**Obrigatório**) | Valor em centavos a ser transferido para uma determinada conta bancária
`bank_account_id` | Id da conta bancária que irá receber a transferência. **Obrigatório caso queira que o valor saia do saldo do recebedor padrão**
`recipient_id` | Id do recebedor de onde o valor da transferência sairá. **Obrigatório caso queira que o valor saia do saldo do recebedor associado a esse id**

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
// Sem exemplo
```

```csharp
// Sem exemplo
```

#### Exemplo de resposta

```json
{
    "amount": 100,
    "bank_account": {
        "agencia": "0808",
        "agencia_dv": "8",
        "bank_code": "184",
        "charge_transfer_fees": true,
        "conta": "08808",
        "conta_dv": "8",
        "date_created": "2016-05-27T17:47:03.531Z",
        "document_number": "00000000000000",
        "document_type": "cnpj",
        "id": 13709856,
        "legal_name": "RICHARD DESCHAMPS",
        "object": "bank_account"
    },
    "date_created": "2016-05-27T17:49:49.145Z",
    "fee": 367,
    "funding_date": null,
    "funding_estimated_date": "2016-05-28T03:00:00.000Z",
    "id": 3050,
    "object": "transfer",
    "status": "pending_transfer",
    "transaction_id": null,
    "type": "ted"
}
```

### Retornar uma transferência

Retorna uma transferência específica

Parâmetro | Descrição
---|---
`id` (**Obrigatório**) | Id da transferência

```endpoint
GET /transfers/{id}
```

#### Exemplo de requisição

```curl
# Retornando uma transferência
curl -X GET https://api.pagar.me/1/transfers/3050 \
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
    "amount": 100,
    "bank_account": {
        "agencia": "0808",
        "agencia_dv": "8",
        "bank_code": "184",
        "charge_transfer_fees": true,
        "conta": "08808",
        "conta_dv": "8",
        "date_created": "2016-05-27T17:47:03.531Z",
        "document_number": "00000000000000",
        "document_type": "cnpj",
        "id": 13709856,
        "legal_name": "RICHARD DESCHAMPS",
        "object": "bank_account"
    },
    "date_created": "2016-05-27T17:49:49.145Z",
    "fee": 367,
    "funding_date": null,
    "funding_estimated_date": "2016-05-28T03:00:00.000Z",
    "id": 3050,
    "object": "transfer",
    "status": "pending_transfer",
    "transaction_id": null,
    "type": "ted"
}
```

### Retornar todas as transferências

Retorna todas as transferências.

Parâmetro | Descrição
---|---
`page` (**Padrão: 1**) | Útil para implementação de uma paginação de resultados
`count` (**Padrão: 10**) | Retorna `n` objetos de `transfer`

```endpoint
GET /transfers
```

#### Exemplo de requisição

```curl
# Retornando todas as transferências
curl -X GET https://api.pagar.me/1/transfers \
-u "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH:x" \
-d "page=1" \
-d "count=1"
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
        "amount": 100,
        "bank_account": {
            "agencia": "0808",
            "agencia_dv": "8",
            "bank_code": "184",
            "charge_transfer_fees": true,
            "conta": "08808",
            "conta_dv": "8",
            "date_created": "2016-05-27T17:47:03.531Z",
            "document_number": "00000000000000",
            "document_type": "cnpj",
            "id": 13709856,
            "legal_name": "RICHARD DESCHAMPS",
            "object": "bank_account"
        },
        "date_created": "2016-05-27T17:49:49.145Z",
        "fee": 367,
        "funding_date": null,
        "funding_estimated_date": "2016-05-28T03:00:00.000Z",
        "id": 3050,
        "object": "transfer",
        "status": "pending_transfer",
        "transaction_id": null,
        "type": "ted"
    }
]
```

### Cancelar uma transferência

Cancela uma transferência específica

Parâmetro | Descrição
---|---
`id` (**Obrigatório**) | Id da transferência

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
    "amount": 100,
    "bank_account": {
        "agencia": "0808",
        "agencia_dv": "8",
        "bank_code": "184",
        "charge_transfer_fees": true,
        "conta": "08808",
        "conta_dv": "8",
        "date_created": "2016-05-27T17:47:03.531Z",
        "document_number": "00000000000000",
        "document_type": "cnpj",
        "id": 13709856,
        "legal_name": "RICHARD DESCHAMPS",
        "object": "bank_account"
    },
    "date_created": "2016-05-27T17:49:49.145Z",
    "fee": 367,
    "funding_date": null,
    "funding_estimated_date": "2016-05-28T03:00:00.000Z",
    "id": 3050,
    "object": "transfer",
    "status": "canceled",
    "transaction_id": null,
    "type": "ted"
}
```
