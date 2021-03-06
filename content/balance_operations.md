## Operações de saldo

### Objeto balance_operation

Propriedade | Tipo | Descrição
---|---|---
`amount` | `integer` | Valor em centavos transacionado para a conta
`balance_amount` | `integer` | **Deprecado**
`balance_old_amount` | `integer` | **Deprecado**
`date_created` | `string` | Data de criação da operação de saldo no formato ISODate
`fee` | `integer` | Valor em centavos que foi cobrado pela transação (taxa)
`id` | `integer` | Id da operação de saldo
`movement_object` | `object` | Objeto da origem da operação de saldo. [Saiba mais](/#objeto-payable)
`object` | `string` | Nome do tipo do objeto criado/modificado
`status` | `string` | Estado do saldo da conta. **Valores possíveis:** `waiting_funds`, `available` e `transferred`
`type` | `string` | Tipo de objeto que gerou a operação de saldo

#### Exemplo do objeto

```json
{
    "amount": 888,
    "balance_amount": 0,
    "balance_old_amount": null,
    "date_created": "2016-05-17T04:45:52.664Z",
    "fee": 380,
    "id": 49333,
    "movement_object": {
        "amount": 888,
        "anticipation_fee": 0,
        "bulk_anticipation_id": null,
        "date_created": "2016-05-17T04:45:52.590Z",
        "fee": 380,
        "id": 25786,
        "installment": null,
        "object": "payable",
        "original_payment_date": null,
        "payment_date": "2016-05-17T03:00:00.545Z",
        "payment_method": "boleto",
        "recipient_id": "re_cim2ikkfy000hyg6dsfa3uotl",
        "split_rule_id": null,
        "status": "paid",
        "transaction_id": 487740,
        "type": "credit"
    },
    "object": "balance_operation",
    "status": "available",
    "type": "payable"
}
```

### Retornar uma operação de saldo

Retorna uma operação de saldo específica

Parâmetro | Descrição
---|---
`id` (**Obrigatório**) | Id da operação de saldo

```endpoint
GET /balance/operations/{id}
```

#### Exemplo de requisição

```curl
# Retornando uma operação de saldo
curl -X GET https://api.pagar.me/1/balance/operations/49333 \
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
    "amount": 888,
    "balance_amount": 0,
    "balance_old_amount": null,
    "date_created": "2016-05-17T04:45:52.664Z",
    "fee": 380,
    "id": 49333,
    "movement_object": {
        "amount": 888,
        "anticipation_fee": 0,
        "bulk_anticipation_id": null,
        "date_created": "2016-05-17T04:45:52.590Z",
        "fee": 380,
        "id": 25786,
        "installment": null,
        "object": "payable",
        "original_payment_date": null,
        "payment_date": "2016-05-17T03:00:00.545Z",
        "payment_method": "boleto",
        "recipient_id": "re_cim2ikkfy000hyg6dsfa3uotl",
        "split_rule_id": null,
        "status": "paid",
        "transaction_id": 487740,
        "type": "credit"
    },
    "object": "balance_operation",
    "status": "available",
    "type": "payable"
}
```

### Retornar todas as operações de saldo

Retorna todas as operações de saldo.

Parâmetro | Descrição
---|---
`page` (**Padrão: 1**) | Útil para implementação de uma paginação de resultados
`count` (**Padrão: 10**) | Retorna `n` objetos de `balance_operation`

```endpoint
GET /balance/operations
```

#### Exemplo de requisição

```curl
# Retornando todas as operações de saldo
curl -X GET https://api.pagar.me/1/balance/operations \
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
        "amount": 888,
        "balance_amount": 0,
        "balance_old_amount": null,
        "date_created": "2016-05-17T04:45:52.664Z",
        "fee": 380,
        "id": 49333,
        "movement_object": {
            "amount": 888,
            "anticipation_fee": 0,
            "bulk_anticipation_id": null,
            "date_created": "2016-05-17T04:45:52.590Z",
            "fee": 380,
            "id": 25786,
            "installment": null,
            "object": "payable",
            "original_payment_date": null,
            "payment_date": "2016-05-17T03:00:00.545Z",
            "payment_method": "boleto",
            "recipient_id": "re_cim2ikkfy000hyg6dsfa3uotl",
            "split_rule_id": null,
            "status": "paid",
            "transaction_id": 487740,
            "type": "credit"
        },
        "object": "balance_operation",
        "status": "available",
        "type": "payable"
    }
]
```
