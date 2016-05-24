## Saldo

### Objeto balance

Propriedade | Tipo | Descrição
---|---|---
`avaiable` **=>** | `object` | Objeto contendo saldo disponível
`amount` | `integer` | Valor em centavos que você tem disponível em sua conta Pagar.me
`object` | `string` | Nome do tipo do objeto criado/modificado.
`transferred` **=>** | `object` | Objeto contendo saldo já transferido
`amount` | `integer` | Valor em centavos que você já transferiu para sua conta bancária (quanto já recebeu efetivamente)
`waiting_funds` **=>** | `object` | Objeto contendo saldo a receber
`amount` | `integer` | Valor em centavos que você tem a receber do Pagar.me

#### Exemplo do objeto

```json
{
    "available": {
        "amount": 508
    },
    "object": "balance",
    "transferred": {
        "amount": 0
    },
    "waiting_funds": {
        "amount": 85310
    }
}
```
### Retornar saldo geral

Retorna o saldo geral das operações da sua conta Pagar.me.

```endpoint
GET /balance
```

#### Exemplo de requisição

```curl
# Retornando o saldo geral
curl -X GET https://api.pagar.me/1/balance \
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
    "available": {
        "amount": 508
    },
    "object": "balance",
    "transferred": {
        "amount": 0
    },
    "waiting_funds": {
        "amount": 85310
    }
}
```
