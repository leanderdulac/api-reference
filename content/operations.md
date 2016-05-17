## Operações

Objeto retornado após uma operação feita em uma transação. Toda vez que uma transação é criada, ela feita em etapas por várias operações, para cada operação dessa, um novo objeto `gateway_operation` é criado.

### Objeto gateway_operation

Propriedade | Tipo | Descrição
---|---|---
`date_created` | `string` | Data de criação da operação no formato ISODate
`date_updated` | `string` | Data de atualização da operação no formato ISODate
`ended_at` | `string` | Data de termíno do processamento da operação no formato Unix Timestamp
`fail_reason` | `string` | Motivo da falha da operação
`group_id` | `string` | Id do grupo de operações que essa operação pertence
`id` | `string` | Id da operação
`metadata` | `object` | Informações sobre o ambiente da operação
`model` | `string` | Modelo da operação
`model_id` | `string` | Id do modelo da transação
`next_group_id` | `string` | Id do próximo grupo de operações
`processor` | `string` | Adquirente que processou essa operação
`processor_response_code` | `string` | Código de resposta retornado pelo adquirente
`request_id` | `string` | Id da requisição interna que disparou essa operação
`rollbacked` | `boolean` | Indicador de operação desfeita
`start_at` | `string` | Data de início do processamento da operação no formato Unix Timestamp
`status` | `string` | Status da operação. **Valores possíveis:** `waiting`, `processing`, `deferred`, `failed`, `success`, `dropped`
`type` | `string` | Tipo da operação. **Valores possíveis:** `analyze`, `authorize`, `capture`, `issue`, `conciliate`, `refund`

#### Exemplo do objeto

```json
{
    "date_created": "2016-05-17T02:46:57.311Z",
    "date_updated": "2016-05-17T02:46:57.379Z",
    "ended_at": 1463453217379,
    "fail_reason": null,
    "group_id": "gog_cioau9den01ns633siub6q5fd",
    "id": "go_cioau9den01nr633s9hlg8t9y",
    "metadata": {
        "environment": {
            "authorization_code": "287311",
            "authorized_amount": 3100,
            "nsu": "487720",
            "response_code": "00",
            "tid": "487720"
        }
    },
    "model": "transaction",
    "model_id": "487720",
    "next_group_id": "gog_cioau9deg01nq633sytp2fjo9",
    "processor": "pagarme",
    "processor_response_code": "00",
    "request_id": "gr_cioau9de301no633sg4lf2vzu",
    "rollbacked": false,
    "started_at": 1463453217332,
    "status": "success",
    "type": "authorize"
}
```

### Retornar uma operação

Retorna uma operação que já aconteceu com uma transação.
**Ex:** autorização.

Parâmetro | Descrição
---|---
`id` (**Obrigatório**) | Id da operação
`transaction_id` (**Obrigatório**) | Id da transação

```endpoint
GET /transactions/{transaction_id}/operations/{id}
```

#### Exemplo de requisição

```curl
curl -X GET https://api.pagar.me/1/transactions/487720/operations/go_cioau9den01nr633s9hlg8t9y \
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
    "date_created": "2016-05-17T02:46:57.311Z",
    "date_updated": "2016-05-17T02:46:57.379Z",
    "ended_at": 1463453217379,
    "fail_reason": null,
    "group_id": "gog_cioau9den01ns633siub6q5fd",
    "id": "go_cioau9den01nr633s9hlg8t9y",
    "metadata": {
        "environment": {
            "authorization_code": "287311",
            "authorized_amount": 3100,
            "nsu": "487720",
            "response_code": "00",
            "tid": "487720"
        }
    },
    "model": "transaction",
    "model_id": "487720",
    "next_group_id": "gog_cioau9deg01nq633sytp2fjo9",
    "processor": "pagarme",
    "processor_response_code": "00",
    "request_id": "gr_cioau9de301no633sg4lf2vzu",
    "rollbacked": false,
    "started_at": 1463453217332,
    "status": "success",
    "type": "authorize"
}
```

### Retornar todas as operações

Retorna todo o histórico de uma transação, ou seja, toda e qualquer operação que já aconteceu com ela. 
**Ex:** autorização, análise antifraude, captura, estorno, chargeback, emissão de boleto, conciliação, etc.

Parâmetro | Descrição
---|---
`transaction_id` (**Obrigatório**) | Id da transação

```endpoint
GET /transactions/{transaction_id}/operations
```

#### Exemplo de requisição

```curl
curl -X GET https://api.pagar.me/1/transactions/487720/operations \
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
[
    {
        "date_created": "2016-05-17T02:46:57.304Z",
        "date_updated": "2016-05-17T02:46:57.472Z",
        "ended_at": 1463453217472,
        "fail_reason": null,
        "group_id": "gog_cioau9deg01nq633sytp2fjo9",
        "id": "go_cioau9deg01np633s6i8feu2l",
        "metadata": {
            "environment": {
                "captured_amount": 3100
            }
        },
        "model": "transaction",
        "model_id": "487720",
        "next_group_id": null,
        "processor": "pagarme",
        "processor_response_code": null,
        "request_id": "gr_cioau9de301no633sg4lf2vzu",
        "rollbacked": false,
        "started_at": 1463453217385,
        "status": "success",
        "type": "capture"
    },
    {
        "date_created": "2016-05-17T02:46:57.311Z",
        "date_updated": "2016-05-17T02:46:57.379Z",
        "ended_at": 1463453217379,
        "fail_reason": null,
        "group_id": "gog_cioau9den01ns633siub6q5fd",
        "id": "go_cioau9den01nr633s9hlg8t9y",
        "metadata": {
            "environment": {
                "authorization_code": "287311",
                "authorized_amount": 3100,
                "nsu": "487720",
                "response_code": "00",
                "tid": "487720"
            }
        },
        "model": "transaction",
        "model_id": "487720",
        "next_group_id": "gog_cioau9deg01nq633sytp2fjo9",
        "processor": "pagarme",
        "processor_response_code": "00",
        "request_id": "gr_cioau9de301no633sg4lf2vzu",
        "rollbacked": false,
        "started_at": 1463453217332,
        "status": "success",
        "type": "authorize"
    }
]
```
