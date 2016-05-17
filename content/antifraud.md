## Análise antifraude

Objeto retornado após a análise antifraude feita em uma transação. Toda vez que uma transação é criada e você está com seu sistema de antifraude ativo, ela passa pela análise antifraude de todos antifraudes ativos para sua empresa, para cada análise dessa, um novo objeto `antifraud_analysis` é criado.

### Objeto antifraud_analysis

Propriedade | Tipo | Descrição
---|---|---
`cost` | `string` | Custo da análise antifraude
`date_created` | `string` | Data de criação da análise no formato ISODate
`date_updated` | `string` | Data de atualização da análise no formato ISODate
`id` | `integer` | Id do análise
`name` | `string` | Nome do antifraude utilizado
`object` | `string` | Nome do tipo do objeto criado/modificado. **Valor retornado:** `antifraud_analysis`
`score` | `string` | Pontuação de 0 a 100 da probabilidade de fraude na transação realizada
`status` | `string` | Status da análise antifraude. **Valores possíveis:** `processing`, `approved`, `refused` e `failed`

#### Exemplo do objeto

```json
{
    "cost": 0,
    "date_created": "2016-05-06T05:35:34.315Z",
    "date_updated": "2016-05-06T05:35:34.331Z",
    "id": 11106,
    "name": "development",
    "object": "antifraud_analysis",
    "score": null,
    "status": "failed"
}
```

### Retornar uma análise

Retorna uma análise antifraude de uma transação.

Parâmetro | Descrição
---|---
`id` (**Obrigatório**) | Id da análise
`transaction_id` (**Obrigatório**) | Id da transação

```endpoint
GET /transactions/{transaction_id}/antifraud_analyses/{id}
```

#### Exemplo de requisição

```curl
curl -X GET https://api.pagar.me/1/transactions/479099/antifraud_analyses/11106 \
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
    "cost": 0,
    "date_created": "2016-05-06T05:35:34.315Z",
    "date_updated": "2016-05-06T05:35:34.331Z",
    "id": 11106,
    "name": "development",
    "object": "antifraud_analysis",
    "score": null,
    "status": "failed"
}
```

### Retornar todas as análises antifraude

Retorna todas as análises antifraude de uma transação.

Parâmetro | Descrição
---|---
`transaction_id` (**Obrigatório**) | Id da transação

```endpoint
GET /transactions/{transaction_id}/antifraud_analyses
```

#### Exemplo de requisição

```curl
curl -X GET https://api.pagar.me/1/transactions/479099/antifraud_analyses \
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
        "cost": 0,
        "date_created": "2016-05-06T05:35:34.315Z",
        "date_updated": "2016-05-06T05:35:34.331Z",
        "id": 11106,
        "name": "development",
        "object": "antifraud_analysis",
        "score": null,
        "status": "failed"
    }
]
```
