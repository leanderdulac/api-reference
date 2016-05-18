## Eventos

### Objeto events

Propriedade | Tipo | Descrição
---|---|---
`id` | `string` | Id do evento
`model` | `string` | Objeto associado a esse evento
`model_id` | `string` | Id do objeto associado a esse evento
`name` | `string` | Nome do evento
`object` | `string` | Nome do tipo do objeto criado/modificado.
`payload` | `object` | Objeto com status dos eventos

#### Exemplo do objeto

```json
{
    "id": "ev_cioau9cf60t0dhi73sqgecqd0",
    "model": "transaction",
    "model_id": "487720",
    "name": "transaction_status_changed",
    "object": "event",
    "payload": {
        "current_status": "paid",
        "desired_status": "paid",
        "old_status": "processing"
    }
}
```

### Retornar um evento de uma transação

Retorna um evento já criado dentro de uma transação. 
**Ex:** mudança de status.

Parâmetro | Descrição
---|---
`id` (**Obrigatório**) | Id do evento
`transaction_id` (**Obrigatório**) | Id da transação

```endpoint
GET /transactions/{transaction_id}/events/{id}
```

#### Exemplo de requisição

```curl
# Retornando um evento de uma transação
curl -X GET https://api.pagar.me/1/transactions/487720/events/ev_cioau9cf60t0dhi73sqgecqd0 \
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
    "id": "ev_cioau9cf60t0dhi73sqgecqd0",
    "model": "transaction",
    "model_id": "487720",
    "name": "transaction_status_changed",
    "object": "event",
    "payload": {
        "current_status": "paid",
        "desired_status": "paid",
        "old_status": "processing"
    }
}
```

### Retornar todos os eventos de uma transação

Retorna todos os eventos já criados dentro de uma transação. 
**Ex:** mudanças de status.

Parâmetro | Descrição
---|---
`transaction_id` (**Obrigatório**) | Id da transação

```endpoint
GET /transactions/{transaction_id}/events
```

#### Exemplo de requisição

```curl
# Retornando todos os eventos de uma transação
curl -X GET https://api.pagar.me/1/transactions/487720/events \
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
        "id": "ev_cioau9cf60t0dhi73sqgecqd0",
        "model": "transaction",
        "model_id": "487720",
        "name": "transaction_status_changed",
        "object": "event",
        "payload": {
            "current_status": "paid",
            "desired_status": "paid",
            "old_status": "processing"
        }
    }
]
```

### Retornar um evento de uma assinatura

Retorna um evento já criado dentro de uma assinatura. 
**Ex:** mudança de status.

Parâmetro | Descrição
---|---
`id` (**Obrigatório**) | Id do evento
`subscription_id` (**Obrigatório**) | Id da assinatura

```endpoint
GET /subscriptions/{subscription_id}/events/{id}
```

#### Exemplo de requisição

```curl
# Retornando um evento de uma assinatura
curl -X GET https://api.pagar.me/1/subscriptions/57158/events/ev_cioayibbn0si0hs73zf5h0exm \
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
    "id": "ev_cioayibbn0si0hs73zf5h0exm",
    "model": "subscription",
    "model_id": "57158",
    "name": "subscription_status_changed",
    "object": "event",
    "payload": {
        "current_status": "paid",
        "desired_status": "paid",
        "old_status": "unpaid"
    }
}
```

### Retornar todos os eventos de uma assinatura

Retorna todos os eventos já criados dentro de uma assinatura. 
**Ex:** mudanças de status.

Parâmetro | Descrição
---|---
`subscription_id` (**Obrigatório**) | Id da assinatura

```endpoint
GET /subscriptions/{subscription_id}/events
```

#### Exemplo de requisição

```curl
# Retornando todos os eventos de uma assinatura
curl -X GET https://api.pagar.me/1/subscriptions/57158/events \
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
        "id": "ev_cioayibbn0si0hs73zf5h0exm",
        "model": "subscription",
        "model_id": "57158",
        "name": "subscription_status_changed",
        "object": "event",
        "payload": {
            "current_status": "paid",
            "desired_status": "paid",
            "old_status": "unpaid"
        }
    }
]
```
