## POSTback

Ao criar uma transação ou uma assinatura, você tem a opção de passar o parâmetro `postback_url` na requisição com a informação da URL do seu sistema que irá receber as notificações a cada alteração de status dessas transações/assinaturas.

**Atenção**

**Você deve validar os postbacks para garantir que eles foram enviados pela Pagar.me.
Para isso existe o cabeçalho HTTP `X-Hub-Signature`.** [Saiba mais](https://docs.pagar.me/advanced#validando-a-origem-de-um-postback).

**O formato usado para enviar o POSTback é:** `application/x-www-form-urlencoded`

### POSTback de transações

Sempre que uma **transação** tiver seu estado alterado, uma notificação será enviada caso tenha sido atribuída uma `postback_url` na criação desta transação.

Propriedade | Tipo | Descrição
---|---|---
`object` | `string` | Nome do tipo do objeto. **Valores possíveis:** `transaction`
`old_status` | `string` | Status anterior desta transação. **Valores possíveis:** `processing`, `authorized`, `waiting_payment`, `pending_refund`
`fingerprint` | `string` | **Deprecado**
`event` | `string` | Nome do evento. **Valores possíveis:** `transaction_status_changed`
`current_status` | `string` | Status atual da transação. **Valores possíveis:** `authorized`, `paid`, `refunded`, `waiting_payment`, `pending_refund`, `refused`
`desired_status` | `string` | Status desejado desta transação se todo o fluxo for respeitado. **Valores possíveis:** `paid`
`id` | `integer` | Id da transação
`transaction` | `object` | Objeto contendo informações da transação

#### Exemplo da resposta de um POSTback

```http
transaction[card][id]: card_cim4aweld001po96d8blu6prb
transaction[capture_method]: ecommerce
transaction[card_holder_name]: Longbob Longsen
transaction[ip]: 179.185.132.108
transaction[date_updated]: 2016-05-17T02:46:56.020Z
transaction[acquirer_name]: pagarme
transaction[nsu]: 487720
transaction[antifraud_score]: null
transaction[card][country]: US
transaction[paid_amount]: 3100
transaction[soft_descriptor]: null
transaction[card][customer]: undefined
object: transaction
transaction[address]: null
transaction[card][object]: card
transaction[card_first_digits]: 424242
transaction[referer]: api_key
transaction[authorized_amount]: 3100
transaction[subscription_id]: null
old_status: processing
transaction[status]: paid
transaction[payment_method]: credit_card
transaction[phone]: null
fingerprint: ce7034e068693e10b58e1668fc958963dd1ed8af
transaction[card][valid]: true
transaction[postback_url]: http://requestb.in/15yixlx1
transaction[installments]: 1
transaction[cost]: 50
transaction[card_last_digits]: 4242
transaction[card][date_created]: 2016-03-23T03:38:57.890Z
event: transaction_status_changed
transaction[authorization_code]: 287311
current_status: paid
transaction[card][last_digits]: 4242
transaction[card][brand]: visa
transaction[boleto_expiration_date]: null
transaction[status_reason]: acquirer
desired_status: paid
transaction[refuse_reason]: null
transaction[card][first_digits]: 424242
transaction[boleto_barcode]: null
transaction[id]: 487720
transaction[card_brand]: visa
transaction[refunded_amount]: 0
transaction[card][holder_name]: Richard Deschamps
id: 487720
transaction[amount]: 3100
transaction[card][date_updated]: 2016-03-23T03:52:59.435Z
transaction[boleto_url]: null
transaction[tid]: 487720
transaction[date_created]: 2016-05-17T02:46:55.754Z
transaction[customer]: null
transaction[acquirer_response_code]: 0
transaction[object]: transaction
transaction[card][fingerprint]: VpmCgO7Ub/rS
```

### POSTback de assinaturas

Sempre que uma **assinatura** tiver seu estado alterado, uma notificação será enviada caso tenha sido atribuída uma `postback_url` na criação desta transação.

Propriedade | Tipo | Descrição
---|---|---
`object` | `string` | Nome do tipo do objeto. **Valores possíveis:** `subscription`
`old_status` | `string` | Status anterior desta assinatura. **Valores possíveis:** `trialing`, `unpaid`, `paid`, `pending_payment`
`fingerprint` | `string` | **Deprecado**
`event` | `string` | Nome do evento. **Valores possíveis:** `subscription_status_changed`
`current_status` | `string` | Status atual da assinatura. **Valores possíveis:** `trialing`, `unpaid`, `paid`, `pending_payment`, `canceled`, `ended`
`desired_status` | `string` | Status desejado desta assinatura se todo o fluxo for respeitado. **Valores possíveis:** `paid`
`id` | `integer` | Id da assinatura
`subscription` | `object` | Objeto contendo informações da assinatura

#### Exemplo da resposta de um POSTback

```http
fingerprint: 59145c7f288f47ae658645d4d66956dd24b47ee9
subscription[plan][date_created]: 2016-05-17T04:42:19.144Z
subscription[current_transaction][acquirer_name]: pagarme
subscription[current_transaction][postback_url]: null
subscription[current_transaction][authorized_amount]: 0
subscription[current_transaction][id]: 487741
subscription[current_transaction][refuse_reason]: null
subscription[postback_url]: http://requestb.in/10bhb4b1
subscription[current_transaction][acquirer_response_code]: null
subscription[plan][id]: 39901
subscription[date_created]: 2016-05-17T04:45:30.495Z
subscription[phone]: null
subscription[current_transaction][card_last_digits]: null
subscription[plan][days]: 30
subscription[current_period_end]: 2016-06-16T04:45:52.748Z
subscription[id]: 57158
subscription[address]: null
subscription[current_transaction][antifraud_score]: null
subscription[current_transaction][date_updated]: 2016-05-17T04:45:52.938Z
subscription[customer][born_at]: 1970-01-01T00:38:12.015Z
subscription[current_transaction][status]: waiting_payment
subscription[current_transaction][object]: transaction
subscription[current_transaction][card]: undefined
current_status: paid
event: subscription_status_changed
subscription[object]: subscription
subscription[current_transaction][referer]: null
subscription[customer][document_number]: 80802694594
subscription[current_transaction][subscription_id]: 57158
subscription[customer][name]: Richard Deschamps
subscription[current_transaction][boleto_barcode]: 1234 5678
subscription[current_transaction][boleto_expiration_date]: 2016-06-16T04:45:52.748Z
subscription[plan][name]: Basic Plan
subscription[current_transaction][phone]: undefined
subscription[current_transaction][soft_descriptor]: null
subscription[current_transaction][customer]: undefined
subscription[plan][amount]: 888
subscription[metadata]: null
subscription[current_transaction][amount]: 888
subscription[current_transaction][refunded_amount]: 0
old_status: unpaid
subscription[current_transaction][card_brand]: null
subscription[current_transaction][cost]: 0
subscription[payment_method]: boleto
subscription[card_last_digits]: null
subscription[current_transaction][payment_method]: boleto
subscription[current_transaction][date_created]: 2016-05-17T04:45:52.750Z
subscription[customer][object]: customer
desired_status: paid
subscription[current_transaction][address]: undefined
subscription[charges]: 1
subscription[current_transaction][boleto_url]: https://pagar.me
subscription[customer][gender]: M
id: 57158
object: subscription
subscription[current_transaction][status_reason]: acquirer
subscription[status]: paid
subscription[customer][date_created]: 2016-05-16T21:07:43.748Z
subscription[current_transaction][card_holder_name]: null
subscription[current_transaction][capture_method]: ecommerce
subscription[current_period_start]: 2016-05-17T04:45:52.745Z
subscription[plan][installments]: 1
subscription[plan][color]: null
subscription[current_transaction][paid_amount]: 0
subscription[current_transaction][ip]: null
subscription[plan][charges]: null
subscription[card]: null
subscription[plan][trial_days]: 0
subscription[current_transaction][card_first_digits]: null
subscription[current_transaction][nsu]: 487741
subscription[customer][id]: 64913
subscription[customer][email]: richard.deschamps@example.com
subscription[plan][object]: plan
subscription[plan][payment_methods]: boleto
subscription[card_brand]: null
subscription[current_transaction][authorization_code]: null
subscription[customer][document_type]: cpf
subscription[current_transaction][installments]: 1
subscription[current_transaction][tid]: 487741
```

### Retornar um POSTback de uma transação

Retorna um POSTback específico relacionado a transação.

Parâmetro | Descrição
---|---
`id` (**Obrigatório**) | Id do POSTback
`transaction_id` (**Obrigatório**) | Id da transação

```endpoint
GET /transactions/{transaction_id}/postbacks/{id}
```

#### Exemplo de requisição

```curl
# Retornando um POSTback de uma transação
curl -X GET https://api.pagar.me/1/transactions/487720/postbacks/po_cioau9cfw0sdchs73o338jl41 \
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
    "date_created": "2016-05-17T02:46:56.060Z",
    "date_updated": "2016-05-17T02:46:56.163Z",
    "deliveries": [
        {
            "date_created": "2016-05-17T02:46:56.083Z",
            "date_updated": "2016-05-17T02:46:56.151Z",
            "id": "pd_cioau9cgj0t0ehi73sv5mgefw",
            "object": "postback_delivery",
            "response_body": "ok",
            "response_headers": "{\"connection\":\"close\",\"server\":\"gunicorn/19.3.0\",\"date\":\"Tue, 17 May 2016 02:46:56 GMT\",\"content-type\":\"text/html; charset=utf-8\",\"content-length\":\"2\",\"sponsored-by\":\"https://www.runscope.com\",\"via\":\"1.1 vegur\"}",
            "response_time": 62,
            "status": "success",
            "status_code": "200",
            "status_reason": "http_status_code"
        }
    ],
    "headers": "{\"Content-Type\":\"application/x-www-form-urlencoded\",\"X-PagarMe-Event\":\"transaction_status_changed\",\"X-Hub-Signature\":\"sha1=7dffc1fe969de039f473f716b0657c7e976f74c4\",\"User-Agent\":\"PagarMe-Hookshot/1.0\"}",
    "id": "po_cioau9cfw0sdchs73o338jl41",
    "model": "transaction",
    "model_id": "487720",
    "next_retry": null,
    "object": "postback",
    "payload": "id=487720&fingerprint=ce7034e068693e10b58e1668fc958963dd1ed8af&event=transaction_status_changed&old_status=processing&desired_status=paid&current_status=paid&object=transaction&transaction[object]=transaction&transaction[status]=paid&transaction[refuse_reason]=null&transaction[status_reason]=acquirer&transaction[acquirer_response_code]=0&transaction[acquirer_name]=pagarme&transaction[authorization_code]=287311&transaction[soft_descriptor]=null&transaction[tid]=487720&transaction[nsu]=487720&transaction[date_created]=2016-05-17T02:46:55.754Z&transaction[date_updated]=2016-05-17T02:46:56.020Z&transaction[amount]=3100&transaction[authorized_amount]=3100&transaction[paid_amount]=3100&transaction[refunded_amount]=0&transaction[installments]=1&transaction[id]=487720&transaction[cost]=50&transaction[card_holder_name]=Longbob Longsen&transaction[card_last_digits]=4242&transaction[card_first_digits]=424242&transaction[card_brand]=visa&transaction[postback_url]=http://requestb.in/15yixlx1&transaction[payment_method]=credit_card&transaction[capture_method]=ecommerce&transaction[antifraud_score]=null&transaction[boleto_url]=null&transaction[boleto_barcode]=null&transaction[boleto_expiration_date]=null&transaction[referer]=api_key&transaction[ip]=179.185.132.108&transaction[subscription_id]=null&transaction[phone]=null&transaction[address]=null&transaction[customer]=null&transaction[card][object]=card&transaction[card][id]=card_cim4aweld001po96d8blu6prb&transaction[card][date_created]=2016-03-23T03:38:57.890Z&transaction[card][date_updated]=2016-03-23T03:52:59.435Z&transaction[card][brand]=visa&transaction[card][holder_name]=Richard Deschamps&transaction[card][first_digits]=424242&transaction[card][last_digits]=4242&transaction[card][country]=US&transaction[card][fingerprint]=VpmCgO7Ub/rS&transaction[card][customer]=undefined&transaction[card][valid]=true",
    "request_url": "http://requestb.in/15yixlx1",
    "retries": 0,
    "signature": "sha1=7dffc1fe969de039f473f716b0657c7e976f74c4",
    "status": "success"
}
```

### Reenviar um POSTback de uma transação

Com essa rota você pode reenviar qualquer POSTback que já foi enviado de uma transação. Lembrando que caso o envio de um POSTback falhe ou seu servidor não o receba, nós o retentamos diversas vezes (com um total de 31 vezes).

Parâmetro | Descrição
---|---
`id` (**Obrigatório**) | Id do POSTback
`transaction_id` (**Obrigatório**) | Id da transação

```endpoint
POST /transactions/{transaction_id}/postbacks/{id}/redeliver
```

#### Exemplo de requisição

```curl
# Reenviando um POSTback de uma transação
curl -X POST https://api.pagar.me/1/transactions/487720/postbacks/po_cioau9cfw0sdchs73o338jl41/redeliver \
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
    "date_created": "2016-05-17T02:46:56.060Z",
    "date_updated": "2016-05-17T05:35:24.842Z",
    "deliveries": [
        {
            "date_created": "2016-05-17T02:46:56.083Z",
            "date_updated": "2016-05-17T02:46:56.151Z",
            "id": "pd_cioau9cgj0t0ehi73sv5mgefw",
            "object": "postback_delivery",
            "response_body": "ok",
            "response_headers": "{\"connection\":\"close\",\"server\":\"gunicorn/19.3.0\",\"date\":\"Tue, 17 May 2016 02:46:56 GMT\",\"content-type\":\"text/html; charset=utf-8\",\"content-length\":\"2\",\"sponsored-by\":\"https://www.runscope.com\",\"via\":\"1.1 vegur\"}",
            "response_time": 62,
            "status": "success",
            "status_code": "200",
            "status_reason": "http_status_code"
        },
        {
            "date_created": "2016-05-17T05:35:00.782Z",
            "date_updated": "2016-05-17T05:35:00.812Z",
            "id": "pd_ciob09hv20sk4hs73p4384urx",
            "object": "postback_delivery",
            "response_body": "ok",
            "response_headers": "{\"connection\":\"close\",\"server\":\"gunicorn/19.3.0\",\"date\":\"Tue, 17 May 2016 05:35:00 GMT\",\"content-type\":\"text/html; charset=utf-8\",\"content-length\":\"2\",\"sponsored-by\":\"https://www.runscope.com\",\"via\":\"1.1 vegur\"}",
            "response_time": 24,
            "status": "success",
            "status_code": "200",
            "status_reason": "http_status_code"
        }
    ],
    "headers": "{\"Content-Type\":\"application/x-www-form-urlencoded\",\"X-PagarMe-Event\":\"transaction_status_changed\",\"X-Hub-Signature\":\"sha1=7dffc1fe969de039f473f716b0657c7e976f74c4\",\"User-Agent\":\"PagarMe-Hookshot/1.0\"}",
    "id": "po_cioau9cfw0sdchs73o338jl41",
    "model": "transaction",
    "model_id": "487720",
    "next_retry": null,
    "object": "postback",
    "payload": "id=487720&fingerprint=ce7034e068693e10b58e1668fc958963dd1ed8af&event=transaction_status_changed&old_status=processing&desired_status=paid&current_status=paid&object=transaction&transaction[object]=transaction&transaction[status]=paid&transaction[refuse_reason]=null&transaction[status_reason]=acquirer&transaction[acquirer_response_code]=0&transaction[acquirer_name]=pagarme&transaction[authorization_code]=287311&transaction[soft_descriptor]=null&transaction[tid]=487720&transaction[nsu]=487720&transaction[date_created]=2016-05-17T02:46:55.754Z&transaction[date_updated]=2016-05-17T02:46:56.020Z&transaction[amount]=3100&transaction[authorized_amount]=3100&transaction[paid_amount]=3100&transaction[refunded_amount]=0&transaction[installments]=1&transaction[id]=487720&transaction[cost]=50&transaction[card_holder_name]=Longbob Longsen&transaction[card_last_digits]=4242&transaction[card_first_digits]=424242&transaction[card_brand]=visa&transaction[postback_url]=http://requestb.in/15yixlx1&transaction[payment_method]=credit_card&transaction[capture_method]=ecommerce&transaction[antifraud_score]=null&transaction[boleto_url]=null&transaction[boleto_barcode]=null&transaction[boleto_expiration_date]=null&transaction[referer]=api_key&transaction[ip]=179.185.132.108&transaction[subscription_id]=null&transaction[phone]=null&transaction[address]=null&transaction[customer]=null&transaction[card][object]=card&transaction[card][id]=card_cim4aweld001po96d8blu6prb&transaction[card][date_created]=2016-03-23T03:38:57.890Z&transaction[card][date_updated]=2016-03-23T03:52:59.435Z&transaction[card][brand]=visa&transaction[card][holder_name]=Richard Deschamps&transaction[card][first_digits]=424242&transaction[card][last_digits]=4242&transaction[card][country]=US&transaction[card][fingerprint]=VpmCgO7Ub/rS&transaction[card][customer]=undefined&transaction[card][valid]=true",
    "request_url": "http://requestb.in/15yixlx1",
    "retries": 1,
    "signature": "sha1=7dffc1fe969de039f473f716b0657c7e976f74c4",
    "status": "pending_retry"
}
```

### Retornar todos os POSTbacks de uma transação

Retorna todos os POSTbacks enviados relacionados a transação.

Parâmetro | Descrição
---|---
`transaction_id` (**Obrigatório**) | Id da transação

```endpoint
GET /transactions/{transaction_id}/postbacks
```

#### Exemplo de requisição

```curl
# Retornando todos os POSTbacks de uma transação
curl -X GET https://api.pagar.me/1/transactions/487720/postbacks \
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
        "date_created": "2016-05-17T02:46:56.060Z",
        "date_updated": "2016-05-17T05:35:24.985Z",
        "deliveries": [
            {
                "date_created": "2016-05-17T02:46:56.083Z",
                "date_updated": "2016-05-17T02:46:56.151Z",
                "id": "pd_cioau9cgj0t0ehi73sv5mgefw",
                "object": "postback_delivery",
                "response_body": "ok",
                "response_headers": "{\"connection\":\"close\",\"server\":\"gunicorn/19.3.0\",\"date\":\"Tue, 17 May 2016 02:46:56 GMT\",\"content-type\":\"text/html; charset=utf-8\",\"content-length\":\"2\",\"sponsored-by\":\"https://www.runscope.com\",\"via\":\"1.1 vegur\"}",
                "response_time": 62,
                "status": "success",
                "status_code": "200",
                "status_reason": "http_status_code"
            },
            {
                "date_created": "2016-05-17T05:35:00.782Z",
                "date_updated": "2016-05-17T05:35:00.812Z",
                "id": "pd_ciob09hv20sk4hs73p4384urx",
                "object": "postback_delivery",
                "response_body": "ok",
                "response_headers": "{\"connection\":\"close\",\"server\":\"gunicorn/19.3.0\",\"date\":\"Tue, 17 May 2016 05:35:00 GMT\",\"content-type\":\"text/html; charset=utf-8\",\"content-length\":\"2\",\"sponsored-by\":\"https://www.runscope.com\",\"via\":\"1.1 vegur\"}",
                "response_time": 24,
                "status": "success",
                "status_code": "200",
                "status_reason": "http_status_code"
            },
            {
                "date_created": "2016-05-17T05:35:24.955Z",
                "date_updated": "2016-05-17T05:35:24.979Z",
                "id": "pd_ciob0a0ij0t7phi73prjet0e5",
                "object": "postback_delivery",
                "response_body": "ok",
                "response_headers": "{\"connection\":\"close\",\"server\":\"gunicorn/19.3.0\",\"date\":\"Tue, 17 May 2016 05:35:24 GMT\",\"content-type\":\"text/html; charset=utf-8\",\"content-length\":\"2\",\"sponsored-by\":\"https://www.runscope.com\",\"via\":\"1.1 vegur\"}",
                "response_time": 17,
                "status": "success",
                "status_code": "200",
                "status_reason": "http_status_code"
            }
        ],
        "headers": "{\"Content-Type\":\"application/x-www-form-urlencoded\",\"X-PagarMe-Event\":\"transaction_status_changed\",\"X-Hub-Signature\":\"sha1=7dffc1fe969de039f473f716b0657c7e976f74c4\",\"User-Agent\":\"PagarMe-Hookshot/1.0\"}",
        "id": "po_cioau9cfw0sdchs73o338jl41",
        "model": "transaction",
        "model_id": "487720",
        "next_retry": null,
        "object": "postback",
        "payload": "id=487720&fingerprint=ce7034e068693e10b58e1668fc958963dd1ed8af&event=transaction_status_changed&old_status=processing&desired_status=paid&current_status=paid&object=transaction&transaction[object]=transaction&transaction[status]=paid&transaction[refuse_reason]=null&transaction[status_reason]=acquirer&transaction[acquirer_response_code]=0&transaction[acquirer_name]=pagarme&transaction[authorization_code]=287311&transaction[soft_descriptor]=null&transaction[tid]=487720&transaction[nsu]=487720&transaction[date_created]=2016-05-17T02:46:55.754Z&transaction[date_updated]=2016-05-17T02:46:56.020Z&transaction[amount]=3100&transaction[authorized_amount]=3100&transaction[paid_amount]=3100&transaction[refunded_amount]=0&transaction[installments]=1&transaction[id]=487720&transaction[cost]=50&transaction[card_holder_name]=Longbob Longsen&transaction[card_last_digits]=4242&transaction[card_first_digits]=424242&transaction[card_brand]=visa&transaction[postback_url]=http://requestb.in/15yixlx1&transaction[payment_method]=credit_card&transaction[capture_method]=ecommerce&transaction[antifraud_score]=null&transaction[boleto_url]=null&transaction[boleto_barcode]=null&transaction[boleto_expiration_date]=null&transaction[referer]=api_key&transaction[ip]=179.185.132.108&transaction[subscription_id]=null&transaction[phone]=null&transaction[address]=null&transaction[customer]=null&transaction[card][object]=card&transaction[card][id]=card_cim4aweld001po96d8blu6prb&transaction[card][date_created]=2016-03-23T03:38:57.890Z&transaction[card][date_updated]=2016-03-23T03:52:59.435Z&transaction[card][brand]=visa&transaction[card][holder_name]=Richard Deschamps&transaction[card][first_digits]=424242&transaction[card][last_digits]=4242&transaction[card][country]=US&transaction[card][fingerprint]=VpmCgO7Ub/rS&transaction[card][customer]=undefined&transaction[card][valid]=true",
        "request_url": "http://requestb.in/15yixlx1",
        "retries": 2,
        "signature": "sha1=7dffc1fe969de039f473f716b0657c7e976f74c4",
        "status": "success"
    }
]
```

### Retornar um POSTback de uma assinatura

Retorna um POSTback específico relacionado a assinatura.

Parâmetro | Descrição
---|---
`id` (**Obrigatório**) | Id do POSTback
`subscription_id` (**Obrigatório**) | Id da assinatura

```endpoint
GET /subscriptions/{subscription_id}/postbacks/{id}
```

#### Exemplo de requisição

```curl
# Retornando um POSTback de uma assinatura
curl -X GET https://api.pagar.me/1/subscriptions/57158/postbacks/po_cioayibct0si1hs73nzbfhmqm \
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
    "date_created": "2016-05-17T04:45:53.021Z",
    "date_updated": "2016-05-17T04:45:53.100Z",
    "deliveries": [
        {
            "date_created": "2016-05-17T04:45:53.052Z",
            "date_updated": "2016-05-17T04:45:53.094Z",
            "id": "pd_cioayibdo0si2hs73lf0x76v8",
            "object": "postback_delivery",
            "response_body": "ok",
            "response_headers": "{\"connection\":\"close\",\"server\":\"gunicorn/19.3.0\",\"date\":\"Tue, 17 May 2016 04:45:53 GMT\",\"content-type\":\"text/html; charset=utf-8\",\"content-length\":\"2\",\"sponsored-by\":\"https://www.runscope.com\",\"via\":\"1.1 vegur\"}",
            "response_time": 35,
            "status": "success",
            "status_code": "200",
            "status_reason": "http_status_code"
        }
    ],
    "headers": "{\"Content-Type\":\"application/x-www-form-urlencoded\",\"X-PagarMe-Event\":\"subscription_status_changed\",\"X-Hub-Signature\":\"sha1=e046f362d8dc4aa3730cdd65892d9e28e51106d1\",\"User-Agent\":\"PagarMe-Hookshot/1.0\"}",
    "id": "po_cioayibct0si1hs73nzbfhmqm",
    "model": "subscription",
    "model_id": "57158",
    "next_retry": null,
    "object": "postback",
    "payload": "id=57158&fingerprint=59145c7f288f47ae658645d4d66956dd24b47ee9&event=subscription_status_changed&old_status=unpaid&desired_status=paid&current_status=paid&object=subscription&subscription[object]=subscription&subscription[plan][object]=plan&subscription[plan][id]=39901&subscription[plan][amount]=888&subscription[plan][days]=30&subscription[plan][name]=Basic Plan&subscription[plan][trial_days]=0&subscription[plan][date_created]=2016-05-17T04:42:19.144Z&subscription[plan][payment_methods]=boleto&subscription[plan][color]=null&subscription[plan][charges]=null&subscription[plan][installments]=1&subscription[id]=57158&subscription[current_transaction][object]=transaction&subscription[current_transaction][status]=waiting_payment&subscription[current_transaction][refuse_reason]=null&subscription[current_transaction][status_reason]=acquirer&subscription[current_transaction][acquirer_response_code]=null&subscription[current_transaction][acquirer_name]=pagarme&subscription[current_transaction][authorization_code]=null&subscription[current_transaction][soft_descriptor]=null&subscription[current_transaction][tid]=487741&subscription[current_transaction][nsu]=487741&subscription[current_transaction][date_created]=2016-05-17T04:45:52.750Z&subscription[current_transaction][date_updated]=2016-05-17T04:45:52.938Z&subscription[current_transaction][amount]=888&subscription[current_transaction][authorized_amount]=0&subscription[current_transaction][paid_amount]=0&subscription[current_transaction][refunded_amount]=0&subscription[current_transaction][installments]=1&subscription[current_transaction][id]=487741&subscription[current_transaction][cost]=0&subscription[current_transaction][card_holder_name]=null&subscription[current_transaction][card_last_digits]=null&subscription[current_transaction][card_first_digits]=null&subscription[current_transaction][card_brand]=null&subscription[current_transaction][postback_url]=null&subscription[current_transaction][payment_method]=boleto&subscription[current_transaction][capture_method]=ecommerce&subscription[current_transaction][antifraud_score]=null&subscription[current_transaction][boleto_url]=https://pagar.me&subscription[current_transaction][boleto_barcode]=1234 5678&subscription[current_transaction][boleto_expiration_date]=2016-06-16T04:45:52.748Z&subscription[current_transaction][referer]=null&subscription[current_transaction][ip]=null&subscription[current_transaction][subscription_id]=57158&subscription[current_transaction][phone]=undefined&subscription[current_transaction][address]=undefined&subscription[current_transaction][customer]=undefined&subscription[current_transaction][card]=undefined&subscription[postback_url]=http://requestb.in/10bhb4b1&subscription[payment_method]=boleto&subscription[card_brand]=null&subscription[card_last_digits]=null&subscription[current_period_start]=2016-05-17T04:45:52.745Z&subscription[current_period_end]=2016-06-16T04:45:52.748Z&subscription[charges]=1&subscription[status]=paid&subscription[date_created]=2016-05-17T04:45:30.495Z&subscription[phone]=null&subscription[address]=null&subscription[customer][object]=customer&subscription[customer][document_number]=80802694594&subscription[customer][document_type]=cpf&subscription[customer][name]=Richard Deschamps&subscription[customer][email]=richard.deschamps@example.com&subscription[customer][born_at]=1970-01-01T00:38:12.015Z&subscription[customer][gender]=M&subscription[customer][date_created]=2016-05-16T21:07:43.748Z&subscription[customer][id]=64913&subscription[card]=null&subscription[metadata]=null",
    "request_url": "http://requestb.in/10bhb4b1",
    "retries": 0,
    "signature": "sha1=e046f362d8dc4aa3730cdd65892d9e28e51106d1",
    "status": "success"
}
```

### Reenviar um POSTback de uma assinatura

Com essa rota você pode reenviar qualquer POSTback que já foi enviado de uma assinatura. Lembrando que caso o envio de um POSTback falhe ou seu servidor não o receba, nós o retentamos diversas vezes (com um total de 31 vezes).

Parâmetro | Descrição
---|---
`id` (**Obrigatório**) | Id do POSTback
`subscription_id` (**Obrigatório**) | Id da assinatura

```endpoint
POST /subscriptions/{transaction_id}/postbacks/{id}/redeliver
```

#### Exemplo de requisição

```curl
# Reenviando um POSTback de uma assinatura
curl -X POST https://api.pagar.me/1/subscriptions/57158/postbacks/po_cioayibct0si1hs73nzbfhmqm/redeliver \
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
    "date_created": "2016-05-17T04:45:53.021Z",
    "date_updated": "2016-05-17T05:50:19.804Z",
    "deliveries": [
        {
            "date_created": "2016-05-17T04:45:53.052Z",
            "date_updated": "2016-05-17T04:45:53.094Z",
            "id": "pd_cioayibdo0si2hs73lf0x76v8",
            "object": "postback_delivery",
            "response_body": "ok",
            "response_headers": "{\"connection\":\"close\",\"server\":\"gunicorn/19.3.0\",\"date\":\"Tue, 17 May 2016 04:45:53 GMT\",\"content-type\":\"text/html; charset=utf-8\",\"content-length\":\"2\",\"sponsored-by\":\"https://www.runscope.com\",\"via\":\"1.1 vegur\"}",
            "response_time": 35,
            "status": "success",
            "status_code": "200",
            "status_reason": "http_status_code"
        },
        {
            "date_created": "2016-05-17T05:50:15.466Z",
            "date_updated": "2016-05-17T05:50:15.511Z",
            "id": "pd_ciob0t3my0skmhs7369cgf9il",
            "object": "postback_delivery",
            "response_body": "ok",
            "response_headers": "{\"connection\":\"close\",\"server\":\"gunicorn/19.3.0\",\"date\":\"Tue, 17 May 2016 05:50:15 GMT\",\"content-type\":\"text/html; charset=utf-8\",\"content-length\":\"2\",\"sponsored-by\":\"https://www.runscope.com\",\"via\":\"1.1 vegur\"}",
            "response_time": 38,
            "status": "success",
            "status_code": "200",
            "status_reason": "http_status_code"
        }
    ],
    "headers": "{\"Content-Type\":\"application/x-www-form-urlencoded\",\"X-PagarMe-Event\":\"subscription_status_changed\",\"X-Hub-Signature\":\"sha1=e046f362d8dc4aa3730cdd65892d9e28e51106d1\",\"User-Agent\":\"PagarMe-Hookshot/1.0\"}",
    "id": "po_cioayibct0si1hs73nzbfhmqm",
    "model": "subscription",
    "model_id": "57158",
    "next_retry": null,
    "object": "postback",
    "payload": "id=57158&fingerprint=59145c7f288f47ae658645d4d66956dd24b47ee9&event=subscription_status_changed&old_status=unpaid&desired_status=paid&current_status=paid&object=subscription&subscription[object]=subscription&subscription[plan][object]=plan&subscription[plan][id]=39901&subscription[plan][amount]=888&subscription[plan][days]=30&subscription[plan][name]=Basic Plan&subscription[plan][trial_days]=0&subscription[plan][date_created]=2016-05-17T04:42:19.144Z&subscription[plan][payment_methods]=boleto&subscription[plan][color]=null&subscription[plan][charges]=null&subscription[plan][installments]=1&subscription[id]=57158&subscription[current_transaction][object]=transaction&subscription[current_transaction][status]=waiting_payment&subscription[current_transaction][refuse_reason]=null&subscription[current_transaction][status_reason]=acquirer&subscription[current_transaction][acquirer_response_code]=null&subscription[current_transaction][acquirer_name]=pagarme&subscription[current_transaction][authorization_code]=null&subscription[current_transaction][soft_descriptor]=null&subscription[current_transaction][tid]=487741&subscription[current_transaction][nsu]=487741&subscription[current_transaction][date_created]=2016-05-17T04:45:52.750Z&subscription[current_transaction][date_updated]=2016-05-17T04:45:52.938Z&subscription[current_transaction][amount]=888&subscription[current_transaction][authorized_amount]=0&subscription[current_transaction][paid_amount]=0&subscription[current_transaction][refunded_amount]=0&subscription[current_transaction][installments]=1&subscription[current_transaction][id]=487741&subscription[current_transaction][cost]=0&subscription[current_transaction][card_holder_name]=null&subscription[current_transaction][card_last_digits]=null&subscription[current_transaction][card_first_digits]=null&subscription[current_transaction][card_brand]=null&subscription[current_transaction][postback_url]=null&subscription[current_transaction][payment_method]=boleto&subscription[current_transaction][capture_method]=ecommerce&subscription[current_transaction][antifraud_score]=null&subscription[current_transaction][boleto_url]=https://pagar.me&subscription[current_transaction][boleto_barcode]=1234 5678&subscription[current_transaction][boleto_expiration_date]=2016-06-16T04:45:52.748Z&subscription[current_transaction][referer]=null&subscription[current_transaction][ip]=null&subscription[current_transaction][subscription_id]=57158&subscription[current_transaction][phone]=undefined&subscription[current_transaction][address]=undefined&subscription[current_transaction][customer]=undefined&subscription[current_transaction][card]=undefined&subscription[postback_url]=http://requestb.in/10bhb4b1&subscription[payment_method]=boleto&subscription[card_brand]=null&subscription[card_last_digits]=null&subscription[current_period_start]=2016-05-17T04:45:52.745Z&subscription[current_period_end]=2016-06-16T04:45:52.748Z&subscription[charges]=1&subscription[status]=paid&subscription[date_created]=2016-05-17T04:45:30.495Z&subscription[phone]=null&subscription[address]=null&subscription[customer][object]=customer&subscription[customer][document_number]=80802694594&subscription[customer][document_type]=cpf&subscription[customer][name]=Richard Deschamps&subscription[customer][email]=richard.deschamps@example.com&subscription[customer][born_at]=1970-01-01T00:38:12.015Z&subscription[customer][gender]=M&subscription[customer][date_created]=2016-05-16T21:07:43.748Z&subscription[customer][id]=64913&subscription[card]=null&subscription[metadata]=null",
    "request_url": "http://requestb.in/10bhb4b1",
    "retries": 1,
    "signature": "sha1=e046f362d8dc4aa3730cdd65892d9e28e51106d1",
    "status": "pending_retry"
}
```

### Retornar todos os POSTbacks de uma assinatura

Retorna todos os POSTbacks enviados relacionados a assinatura.

Parâmetro | Descrição
---|---
`subscription_id` (**Obrigatório**) | Id da assinatura

```endpoint
GET /subscriptions/{subscription_id}/postbacks
```

#### Exemplo de requisição

```curl
# Retornando todos os POSTbacks de uma assinatura
curl -X GET https://api.pagar.me/1/subscriptions/57158/postbacks \
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
        "date_created": "2016-05-17T04:45:53.021Z",
        "date_updated": "2016-05-17T05:50:19.876Z",
        "deliveries": [
            {
                "date_created": "2016-05-17T04:45:53.052Z",
                "date_updated": "2016-05-17T04:45:53.094Z",
                "id": "pd_cioayibdo0si2hs73lf0x76v8",
                "object": "postback_delivery",
                "response_body": "ok",
                "response_headers": "{\"connection\":\"close\",\"server\":\"gunicorn/19.3.0\",\"date\":\"Tue, 17 May 2016 04:45:53 GMT\",\"content-type\":\"text/html; charset=utf-8\",\"content-length\":\"2\",\"sponsored-by\":\"https://www.runscope.com\",\"via\":\"1.1 vegur\"}",
                "response_time": 35,
                "status": "success",
                "status_code": "200",
                "status_reason": "http_status_code"
            },
            {
                "date_created": "2016-05-17T05:50:15.466Z",
                "date_updated": "2016-05-17T05:50:15.511Z",
                "id": "pd_ciob0t3my0skmhs7369cgf9il",
                "object": "postback_delivery",
                "response_body": "ok",
                "response_headers": "{\"connection\":\"close\",\"server\":\"gunicorn/19.3.0\",\"date\":\"Tue, 17 May 2016 05:50:15 GMT\",\"content-type\":\"text/html; charset=utf-8\",\"content-length\":\"2\",\"sponsored-by\":\"https://www.runscope.com\",\"via\":\"1.1 vegur\"}",
                "response_time": 38,
                "status": "success",
                "status_code": "200",
                "status_reason": "http_status_code"
            },
            {
                "date_created": "2016-05-17T05:50:19.843Z",
                "date_updated": "2016-05-17T05:50:19.871Z",
                "id": "pd_ciob0t70j0t8bhi73hj1zpqhj",
                "object": "postback_delivery",
                "response_body": "ok",
                "response_headers": "{\"connection\":\"close\",\"server\":\"gunicorn/19.3.0\",\"date\":\"Tue, 17 May 2016 05:50:19 GMT\",\"content-type\":\"text/html; charset=utf-8\",\"content-length\":\"2\",\"sponsored-by\":\"https://www.runscope.com\",\"via\":\"1.1 vegur\"}",
                "response_time": 22,
                "status": "success",
                "status_code": "200",
                "status_reason": "http_status_code"
            }
        ],
        "headers": "{\"Content-Type\":\"application/x-www-form-urlencoded\",\"X-PagarMe-Event\":\"subscription_status_changed\",\"X-Hub-Signature\":\"sha1=e046f362d8dc4aa3730cdd65892d9e28e51106d1\",\"User-Agent\":\"PagarMe-Hookshot/1.0\"}",
        "id": "po_cioayibct0si1hs73nzbfhmqm",
        "model": "subscription",
        "model_id": "57158",
        "next_retry": null,
        "object": "postback",
        "payload": "id=57158&fingerprint=59145c7f288f47ae658645d4d66956dd24b47ee9&event=subscription_status_changed&old_status=unpaid&desired_status=paid&current_status=paid&object=subscription&subscription[object]=subscription&subscription[plan][object]=plan&subscription[plan][id]=39901&subscription[plan][amount]=888&subscription[plan][days]=30&subscription[plan][name]=Basic Plan&subscription[plan][trial_days]=0&subscription[plan][date_created]=2016-05-17T04:42:19.144Z&subscription[plan][payment_methods]=boleto&subscription[plan][color]=null&subscription[plan][charges]=null&subscription[plan][installments]=1&subscription[id]=57158&subscription[current_transaction][object]=transaction&subscription[current_transaction][status]=waiting_payment&subscription[current_transaction][refuse_reason]=null&subscription[current_transaction][status_reason]=acquirer&subscription[current_transaction][acquirer_response_code]=null&subscription[current_transaction][acquirer_name]=pagarme&subscription[current_transaction][authorization_code]=null&subscription[current_transaction][soft_descriptor]=null&subscription[current_transaction][tid]=487741&subscription[current_transaction][nsu]=487741&subscription[current_transaction][date_created]=2016-05-17T04:45:52.750Z&subscription[current_transaction][date_updated]=2016-05-17T04:45:52.938Z&subscription[current_transaction][amount]=888&subscription[current_transaction][authorized_amount]=0&subscription[current_transaction][paid_amount]=0&subscription[current_transaction][refunded_amount]=0&subscription[current_transaction][installments]=1&subscription[current_transaction][id]=487741&subscription[current_transaction][cost]=0&subscription[current_transaction][card_holder_name]=null&subscription[current_transaction][card_last_digits]=null&subscription[current_transaction][card_first_digits]=null&subscription[current_transaction][card_brand]=null&subscription[current_transaction][postback_url]=null&subscription[current_transaction][payment_method]=boleto&subscription[current_transaction][capture_method]=ecommerce&subscription[current_transaction][antifraud_score]=null&subscription[current_transaction][boleto_url]=https://pagar.me&subscription[current_transaction][boleto_barcode]=1234 5678&subscription[current_transaction][boleto_expiration_date]=2016-06-16T04:45:52.748Z&subscription[current_transaction][referer]=null&subscription[current_transaction][ip]=null&subscription[current_transaction][subscription_id]=57158&subscription[current_transaction][phone]=undefined&subscription[current_transaction][address]=undefined&subscription[current_transaction][customer]=undefined&subscription[current_transaction][card]=undefined&subscription[postback_url]=http://requestb.in/10bhb4b1&subscription[payment_method]=boleto&subscription[card_brand]=null&subscription[card_last_digits]=null&subscription[current_period_start]=2016-05-17T04:45:52.745Z&subscription[current_period_end]=2016-06-16T04:45:52.748Z&subscription[charges]=1&subscription[status]=paid&subscription[date_created]=2016-05-17T04:45:30.495Z&subscription[phone]=null&subscription[address]=null&subscription[customer][object]=customer&subscription[customer][document_number]=80802694594&subscription[customer][document_type]=cpf&subscription[customer][name]=Richard Deschamps&subscription[customer][email]=richard.deschamps@example.com&subscription[customer][born_at]=1970-01-01T00:38:12.015Z&subscription[customer][gender]=M&subscription[customer][date_created]=2016-05-16T21:07:43.748Z&subscription[customer][id]=64913&subscription[card]=null&subscription[metadata]=null",
        "request_url": "http://requestb.in/10bhb4b1",
        "retries": 2,
        "signature": "sha1=e046f362d8dc4aa3730cdd65892d9e28e51106d1",
        "status": "success"
    }
]
```
