## Recebedores

### Objeto recipient

Propriedade | Tipo | Descrição
---|---|---
`anticipatable_volume_percentage` | `integer` | Porcentagem do valor passível de antecipação que será antecipado automaticamente
`automatic_anticipation_enabled` | `boolean` | Identifica se o recebedor está habilitado para receber automaticamente ou não o valor disponível para antecipação
`bank_account` | `object` | Objeto da conta bancária. [Saiba mais](/#objeto-bank_account)
`date_created` | `string` | Data de criação do recebedor no formato ISODate
`date_updated` | `string` | Data de atualização do recebedor no formato ISODate
`id` | `string` | Id do recebedor
`last_transfer` | `string` | Data da última transferência no formato ISODate
`object` | `string` | Nome do tipo do objeto criado/modificado
`transfer_day` | `integer` | Dia no qual o recebedor vai ser pago. Para cada `transfer_day`, existe uma faixa de pagamento possível. `weekly`: 1 a 5, onde 1 é segunda-feira e 5 é sexta-feira e `monthly`: 1 a 31
`transfer_enabled` | `boolean` | Identifica se o recebedor está habilitado para receber automaticamente ou não
`transfer_interval` | `string` | Frequência na qual o recebedor irá ser pago. **Valores possíveis:** `daily`, `weekly`, `monthly`

#### Exemplo do objeto

```json
{
    "anticipatable_volume_percentage": 0,
    "automatic_anticipation_enabled": false,
    "bank_account": {
        "agencia": "0000",
        "agencia_dv": null,
        "bank_code": "000",
        "charge_transfer_fees": true,
        "conta": "00000",
        "conta_dv": "0",
        "date_created": "2016-03-21T21:38:10.166Z",
        "document_number": "00000000000000",
        "document_type": "cnpj",
        "id": 12109080,
        "legal_name": "CONTA BANCARIA DE TESTES",
        "object": "bank_account"
    },
    "date_created": "2016-03-21T21:38:10.175Z",
    "date_updated": "2016-03-21T21:38:10.175Z",
    "id": "re_cim2ikkfy000hyg6dsfa3uotl",
    "last_transfer": null,
    "object": "recipient",
    "transfer_day": null,
    "transfer_enabled": false,
    "transfer_interval": null
}
```

### Criar um recebedor

Com essa rota você consegue criar um recebedor, definindo o período que ele irá receber os pagamentos e qual a conta bancária que será utilizada para envio dos pagamentos.

Parâmetro | Descrição
---|---
`transfer_interval` (**Obrigatório**) | Frequência na qual o recebedor irá ser pago. **Valores possíveis:** `daily`, `weekly` e `monthly`
`transfer_day` (**Obrigatório**) | Dia no qual o recebedor vai ser pago
`transfer_enabled` | Indica se o recebedor pode receber os pagamentos automaticamente
`bank_account_id` | Id de uma conta bancária previamente criada. Caso você não tenha essa informação, você pode passar os parâmetros necessários para [criação de uma conta bancária](/#criar-uma-conta-bancária)
`anticipatable_volume_percentage` | Valor em porcentagem do quanto é possível antecipar
`automatic_anticipation_enabled` | Indica se o recebedor irá antecipar automaticamente
---|---
`bank_account` | Objeto contendo os dados bancários do recebedor. Este objeto, e as suas respectivas propriedades, serão obrigatórios caso não seja informado um `bank_account_id`
`bank_account[bank_code]` | Código do banco
`bank_account[agencia]` | Agência bancária onde a conta foi criada
`bank_account[agencia_dv]` | Dígito verificador da agência bancária
`bank_account[conta]` | Número da conta bancária
`bank_account[conta_dv]` | Dígito verificador da conta bancária
`bank_account[document_number]` | Documento identificador do titular da conta (CPF ou CNPJ).
`bank_account[legal_name]` | Nome completo (se pessoa física) ou razão social (se pessoa jurídica)

```endpoint
POST /recipients
```

#### Exemplo de requisição

```curl
# Criando um recebedor com uma conta bancária existente
curl -X POST https://api.pagar.me/1/recipients \
-u "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH:x" \
-d "transfer_interval=monthly" \
-d "transfer_day=8" \
-d "transfer_enabled=true" \
-d "bank_account_id=13459415"

# Criando um recebedor com antecipação automática
curl -X POST https://api.pagar.me/1/recipients \
-u "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH:x" \
-d "transfer_interval=monthly" \
-d "transfer_day=8" \
-d "transfer_enabled=true" \
-d "bank_account_id=13459415" \
-d "automatic_anticipation_enabled=true" \
-d "anticipatable_volume_percentage=88"

# Criando um recebedor com uma conta bancária nova
curl -X POST https://api.pagar.me/1/recipients \
-u "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH:x" \
-d "transfer_interval=weekly" \
-d "transfer_day=1" \
-d "transfer_enabled=true" \
-d "bank_account[bank_code]=184" \
-d "bank_account[agencia]=0808" \
-d "bank_account[agencia_dv]=8" \
-d "bank_account[conta]=08808" \
-d "bank_account[conta_dv]=8" \
-d "bank_account[document_number]=80802694594" \
-d "bank_account[legal_name]=Richard Deschamps"
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
    "anticipatable_volume_percentage": 0,
    "automatic_anticipation_enabled": false,
    "bank_account": {
        "agencia": "0808",
        "agencia_dv": "8",
        "bank_code": "184",
        "charge_transfer_fees": true,
        "conta": "08808",
        "conta_dv": "8",
        "date_created": "2016-05-18T21:14:30.762Z",
        "document_number": "80802694594",
        "document_type": "cpf",
        "id": 13459415,
        "legal_name": "RICHARD DESCHAMPS",
        "object": "bank_account"
    },
    "date_created": "2016-05-25T21:57:26.764Z",
    "date_updated": "2016-05-25T21:57:26.764Z",
    "id": "re_cionevq7g003sxr6dbcngs1xe",
    "last_transfer": null,
    "object": "recipient",
    "transfer_day": 8,
    "transfer_enabled": true,
    "transfer_interval": "monthly"
}
```

### Retornar um recebedor

Retorna um recebedor específico

Parâmetro | Descrição
---|---
`id` (**Obrigatório**) | Id do recebedor

```endpoint
GET /recipients/{id}
```

#### Exemplo de requisição

```curl
# Retornando um recebedor
curl -X GET https://api.pagar.me/1/recipients/re_cionevq7g003sxr6dbcngs1xe \
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
    "anticipatable_volume_percentage": 0,
    "automatic_anticipation_enabled": false,
    "bank_account": {
        "agencia": "0808",
        "agencia_dv": "8",
        "bank_code": "184",
        "charge_transfer_fees": true,
        "conta": "08808",
        "conta_dv": "8",
        "date_created": "2016-05-18T21:14:30.762Z",
        "document_number": "80802694594",
        "document_type": "cpf",
        "id": 13459415,
        "legal_name": "RICHARD DESCHAMPS",
        "object": "bank_account"
    },
    "date_created": "2016-05-25T21:57:26.764Z",
    "date_updated": "2016-05-25T21:57:26.764Z",
    "id": "re_cionevq7g003sxr6dbcngs1xe",
    "last_transfer": null,
    "object": "recipient",
    "transfer_day": 8,
    "transfer_enabled": true,
    "transfer_interval": "monthly"
}
```

### Retornar todos os recebedores

Retorna todos os recebedores.

Parâmetro | Descrição
---|---
`page` (**Padrão: 1**) | Útil para implementação de uma paginação de resultados
`count` (**Padrão: 10**) | Retorna `n` objetos de `recipient`

```endpoint
GET /recipients
```

#### Exemplo de requisição

```curl
# Retornando todos os recebedores
curl -X GET https://api.pagar.me/1/recipients \
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
        "anticipatable_volume_percentage": 0,
        "automatic_anticipation_enabled": false,
        "bank_account": {
            "agencia": "0808",
            "agencia_dv": "8",
            "bank_code": "184",
            "charge_transfer_fees": true,
            "conta": "08808",
            "conta_dv": "8",
            "date_created": "2016-05-18T21:14:30.762Z",
            "document_number": "80802694594",
            "document_type": "cpf",
            "id": 13459415,
            "legal_name": "RICHARD DESCHAMPS",
            "object": "bank_account"
        },
        "date_created": "2016-05-25T22:02:00.518Z",
        "date_updated": "2016-05-25T22:02:00.518Z",
        "id": "re_cionf1lfp003h2s6e7t3yiiva",
        "last_transfer": null,
        "object": "recipient",
        "transfer_day": 1,
        "transfer_enabled": true,
        "transfer_interval": "weekly"
    }
]
```

### Atualizar um recebedor

Após criar um recebedor, você pode atualizar todas as configurações do mesmo.

Parâmetro | Descrição
---|---
`id` (**Obrigatório**) | Id do recebedor
`transfer_interval` | Frequência na qual o recebedor irá ser pago. **Valores possíveis:** `daily`, `weekly` e `monthly`
`transfer_day` | Dia no qual o recebedor vai ser pago
`transfer_enabled` | Indica se o recebedor pode receber os pagamentos automaticamente
`bank_account_id` | Id de uma conta bancária previamente criada
`anticipatable_volume_percentage` | Valor em porcentagem do quanto é possível antecipar
`automatic_anticipation_enabled` | Indica se o recebedor irá antecipar automaticamente

**Atenção** 

**Para atualizar a conta bancária, ela deve obrigatóriamente possuir o mesmo CPF ou CNPJ da conta bancária anterior**

```endpoint
PUT /recipients/{id}
```

#### Exemplo de requisição

```curl
# Atualizando um recebedor com uma outra conta bancária existente
curl -X PUT https://api.pagar.me/1/recipients/re_cim2ikkfy000hyg6dsfa3uotl \
-u "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH:x" \
-d "bank_account_id=13709856"

# Atualizando um recebedor para usar antecipação automática
curl -X PUT https://api.pagar.me/1/recipients/re_cionevq7g003sxr6dbcngs1xe \
-u "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH:x" \
-d "automatic_anticipation_enabled=true" \
-d "anticipatable_volume_percentage=88"

# Atualizando um recebedor com novo dia para transferência 
curl -X PUT https://api.pagar.me/1/recipients/re_cionevq7g003sxr6dbcngs1xe \
-u "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH:x" \
-d "transfer_day=5" \
-d "transfer_interval=weekly"
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
    "anticipatable_volume_percentage": 0,
    "automatic_anticipation_enabled": false,
    "bank_account": {
        "agencia": "0808",
        "agencia_dv": "8",
        "bank_code": "184",
        "charge_transfer_fees": true,
        "conta": "08808",
        "conta_dv": "8",
        "date_created": "2016-05-18T21:14:30.762Z",
        "document_number": "80802694594",
        "document_type": "cpf",
        "id": 13459415,
        "legal_name": "RICHARD DESCHAMPS",
        "object": "bank_account"
    },
    "date_created": "2016-05-25T21:57:26.764Z",
    "date_updated": "2016-05-25T21:57:26.764Z",
    "id": "re_cionevq7g003sxr6dbcngs1xe",
    "last_transfer": null,
    "object": "recipient",
    "transfer_day": 8,
    "transfer_enabled": true,
    "transfer_interval": "monthly"
}
```

### Retornar o saldo de um recebedor

Retorna o saldo de um recebedor específico

Parâmetro | Descrição
---|---
`id` (**Obrigatório**) | Id do recebedor

```endpoint
GET /recipients/{id}/balance
```

#### Exemplo de requisição

```curl
# Retornando o saldo de um recebedor
curl -X GET https://api.pagar.me/1/recipients/re_cim2ikkfy000hyg6dsfa3uotl/balance \
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

### Retornar uma operação de saldo de um recebedor

Retorna uma operação de saldo de um recebedor específico

Parâmetro | Descrição
---|---
`id` (**Obrigatório**) | Id da operação de saldo
`recipient_id` (**Obrigatório**) | Id da transação


```endpoint
GET /recipients/{recipient_id}/balance/operations/{id}
```

#### Exemplo de requisição

```curl
# Retornando uma operação de saldo de um recebedor
curl -X GET https://api.pagar.me/1/recipients/re_cim2ikkfy000hyg6dsfa3uotl/balance/operations/46490 \
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
    "amount": 1000,
    "balance_amount": 0,
    "balance_old_amount": null,
    "date_created": "2016-05-06T04:48:20.557Z",
    "fee": 50,
    "id": 46490,
    "movement_object": {
        "amount": 1000,
        "anticipation_fee": 0,
        "bulk_anticipation_id": null,
        "date_created": "2016-05-06T04:48:19.738Z",
        "fee": 50,
        "id": 23482,
        "installment": 1,
        "object": "payable",
        "original_payment_date": null,
        "payment_date": "2016-05-06T03:00:00.000Z",
        "payment_method": "credit_card",
        "recipient_id": "re_cim2ikkfy000hyg6dsfa3uotl",
        "split_rule_id": null,
        "status": "paid",
        "transaction_id": 479070,
        "type": "credit"
    },
    "object": "balance_operation",
    "status": "available",
    "type": "payable"
}
```

### Retornar todas as operações de saldo de um recebedor

Retorna todas as operações de saldo de um recebedor específico.

Parâmetro | Descrição
---|---
`recipient_id` (**Obrigatório**) | Id do recebedor
`page` (**Padrão: 1**) | Útil para implementação de uma paginação de resultados
`count` (**Padrão: 10**) | Retorna `n` objetos de `balance_operation`

```endpoint
GET /recipients/{recipient_id}/balance/operations
```

#### Exemplo de requisição

```curl
# Retornando todas as operações de saldo de um recebedor
curl -X GET https://api.pagar.me/1/recipients/re_cim2ikkfy000hyg6dsfa3uotl/balance/operations \
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
        "balance_amount": 0,
        "balance_old_amount": null,
        "date_created": "2016-05-25T17:57:43.922Z",
        "fee": -367,
        "id": 51734,
        "movement_object": {
            "amount": 100,
            "bank_account": {
                "agencia": "0000",
                "agencia_dv": null,
                "bank_code": "000",
                "charge_transfer_fees": true,
                "conta": "00000",
                "conta_dv": "0",
                "date_created": "2016-03-21T21:38:10.166Z",
                "document_number": "00000000000000",
                "document_type": "cnpj",
                "id": 12109080,
                "legal_name": "CONTA BANCARIA DE TESTES",
                "object": "bank_account"
            },
            "date_created": "2016-05-25T17:17:59.941Z",
            "fee": 367,
            "funding_date": null,
            "funding_estimated_date": "2016-05-26T03:00:00.000Z",
            "id": 3017,
            "object": "transfer",
            "status": "canceled",
            "transaction_id": null,
            "type": "ted"
        },
        "object": "balance_operation",
        "status": "available",
        "type": "transfer"
    }
]
```
