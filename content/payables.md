## Recebíveis

Objeto contendo os dados de um recebível. O recebível (`payable`) é gerado automaticamente após uma transação ser paga, para cada parcela de uma transação é gerado um recebível, que também podem ser divididos por recebedor (no caso de um `split` ter sido feito).

**Ex:** Uma transação paga com 5 parcelas e 3 recebedores nas regras de split irá gerar 15 (5 x 3) recebíveis. Com isso você tem controle sobre a menor divisão possível de um pagamento.

### Objeto payable

Propriedade | Tipo | Descrição
---|---|---
`amount` | `integer` | Valor em centados do que foi pago
`anticipation_fee` | `integer` | Valor em centavos que foi cobrado pela antecipação (taxa)
`date_created` | `string` | Data de criação da operação no formato ISODate
`fee` | integer | Valor em centavos que foi cobrado pela transação (taxa)
`id` | `integer` | Id do recebível
`installment` | `integer` | Número da parcela
`object` | `string` | Nome do tipo do objeto criado/modificado
`original_payment_date` | `string` | Dia e hora da primeira data de pagamento no formato ISODate
`payment_date` | `string` | Dia e hora do pagamento no formato ISODate
`payment_method` | `string` | Forma de pagamento usada
`recipient_id` | `string` | Id do recebedor ao qual esse recebível pertence
`split_rule_id` | `string` | Id da regra de split, se houver alguma
`status` | `string` | Estado atual do recebível. **Valores possíveis:** `waiting_funds`, `paid` e `suspended`
`transaction_id` | `integer` | Id da transação desse recebível
`type` | `string` | Tipo do recebível. **Valores possíveis:** `credit`, `refund`, `chargeback` e `chargeback_refund`

#### Exemplo do objeto

```json
{
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
}
```

### Retornar um recebível

Retorna um recebível.

Parâmetro | Descrição
---|---
`id` (**Obrigatório**) | Id do recebível

```endpoint
GET /payables/{id}
```

#### Exemplo de requisição

```curl
# Retornando um recebível
curl -X GET https://api.pagar.me/1/payables/25786 \
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
}
```

### Retornar todos os recebíveis

Retorna todos os recebíveis.

`page` (**Padrão: 1**) | Útil para implementação de uma paginação de resultados
`count` (**Padrão: 10**) | Retorna `n` objetos de `payable`

```endpoint
GET /payables
```

#### Exemplo de requisição

```curl
# Retornando um recebível
curl -X GET https://api.pagar.me/1/payables \
-u "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH:x" \
-d "page=1" \
-d "count=10"
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
    {
        "amount": 3100,
        "anticipation_fee": 0,
        "bulk_anticipation_id": null,
        "date_created": "2016-05-17T02:46:57.447Z",
        "fee": 155,
        "id": 25781,
        "installment": 1,
        "object": "payable",
        "original_payment_date": null,
        "payment_date": "2016-06-16T03:00:00.000Z",
        "payment_method": "credit_card",
        "recipient_id": "re_cim2ikkfy000hyg6dsfa3uotl",
        "split_rule_id": null,
        "status": "waiting_funds",
        "transaction_id": 487720,
        "type": "credit"
    },
    {
        "amount": 1000,
        "anticipation_fee": 0,
        "bulk_anticipation_id": null,
        "date_created": "2016-05-06T05:35:42.754Z",
        "fee": 50,
        "id": 23505,
        "installment": 1,
        "object": "payable",
        "original_payment_date": null,
        "payment_date": "2016-06-07T03:00:00.000Z",
        "payment_method": "credit_card",
        "recipient_id": "re_cim2ikkfy000hyg6dsfa3uotl",
        "split_rule_id": null,
        "status": "waiting_funds",
        "transaction_id": 479106,
        "type": "credit"
    },
    {
        "amount": -1000,
        "anticipation_fee": 0,
        "bulk_anticipation_id": null,
        "date_created": "2016-05-06T05:35:39.118Z",
        "fee": -50,
        "id": 23504,
        "installment": null,
        "object": "payable",
        "original_payment_date": null,
        "payment_date": "2016-05-06T03:00:00.000Z",
        "payment_method": "credit_card",
        "recipient_id": "re_cim2ikkfy000hyg6dsfa3uotl",
        "split_rule_id": null,
        "status": "paid",
        "transaction_id": 479103,
        "type": "refund"
    },
    {
        "amount": 1000,
        "anticipation_fee": 0,
        "bulk_anticipation_id": null,
        "date_created": "2016-05-06T05:35:38.401Z",
        "fee": 50,
        "id": 23503,
        "installment": 1,
        "object": "payable",
        "original_payment_date": null,
        "payment_date": "2016-05-06T03:00:00.000Z",
        "payment_method": "credit_card",
        "recipient_id": "re_cim2ikkfy000hyg6dsfa3uotl",
        "split_rule_id": null,
        "status": "paid",
        "transaction_id": 479103,
        "type": "credit"
    },
    {
        "amount": 1000,
        "anticipation_fee": 0,
        "bulk_anticipation_id": null,
        "date_created": "2016-05-06T05:35:37.629Z",
        "fee": 50,
        "id": 23502,
        "installment": 1,
        "object": "payable",
        "original_payment_date": null,
        "payment_date": "2016-06-07T03:00:00.000Z",
        "payment_method": "credit_card",
        "recipient_id": "re_cim2ikkfy000hyg6dsfa3uotl",
        "split_rule_id": null,
        "status": "waiting_funds",
        "transaction_id": 479102,
        "type": "credit"
    },
    {
        "amount": 1000,
        "anticipation_fee": 0,
        "bulk_anticipation_id": null,
        "date_created": "2016-05-06T05:35:36.797Z",
        "fee": 50,
        "id": 23501,
        "installment": 1,
        "object": "payable",
        "original_payment_date": null,
        "payment_date": "2016-06-07T03:00:00.000Z",
        "payment_method": "credit_card",
        "recipient_id": "re_cim2ikkfy000hyg6dsfa3uotl",
        "split_rule_id": null,
        "status": "waiting_funds",
        "transaction_id": 479101,
        "type": "credit"
    },
    {
        "amount": 1000,
        "anticipation_fee": 0,
        "bulk_anticipation_id": null,
        "date_created": "2016-05-06T05:35:35.955Z",
        "fee": 50,
        "id": 23500,
        "installment": 1,
        "object": "payable",
        "original_payment_date": null,
        "payment_date": "2016-06-07T03:00:00.000Z",
        "payment_method": "credit_card",
        "recipient_id": "re_cim2ikkfy000hyg6dsfa3uotl",
        "split_rule_id": null,
        "status": "waiting_funds",
        "transaction_id": 479100,
        "type": "credit"
    },
    {
        "amount": 1000,
        "anticipation_fee": 0,
        "bulk_anticipation_id": null,
        "date_created": "2016-05-06T05:35:35.097Z",
        "fee": 50,
        "id": 23499,
        "installment": 1,
        "object": "payable",
        "original_payment_date": null,
        "payment_date": "2016-06-07T03:00:00.000Z",
        "payment_method": "credit_card",
        "recipient_id": "re_cim2ikkfy000hyg6dsfa3uotl",
        "split_rule_id": null,
        "status": "waiting_funds",
        "transaction_id": 479099,
        "type": "credit"
    },
    {
        "amount": 1000,
        "anticipation_fee": 0,
        "bulk_anticipation_id": null,
        "date_created": "2016-05-06T04:53:25.524Z",
        "fee": 50,
        "id": 23498,
        "installment": 1,
        "object": "payable",
        "original_payment_date": null,
        "payment_date": "2016-06-07T03:00:00.000Z",
        "payment_method": "credit_card",
        "recipient_id": "re_cim2ikkfy000hyg6dsfa3uotl",
        "split_rule_id": null,
        "status": "waiting_funds",
        "transaction_id": 479095,
        "type": "credit"
    }
]
```
