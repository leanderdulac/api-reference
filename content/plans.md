## Planos

Através dessas rotas você pode gerenciar todos os planos do seu negócio, para posteriormente criar cobranças recorrentes, que serão as assinaturas.

### Objeto plan

Propriedade | Tipo | Descrição
---|---|---
`object` | `String` | Nome do tipo do objeto criado/modificado
`id` | `Integer` | Id do plano
`amount` | `Integer` | Valor do plano em centavos
`days` | `Integer` | Dias para efetuação da próxima cobrança da assinatura atrelada ao plano
`name` | `String` | Nome do plano
`trial_days` | `Integer` | Dias que o usuário poderá testar o serviço gratuitamente
`date_created` | `String` | Data da criação do plano (ISODate)
`payment_methods` | `Array` | Formas de pagamento aceitas no plano
`color` | `String` | **Deprecado**
`charges` | `Integer` | Número de cobranças que podem ser feitas em uma assinatura <br />OBS: No caso de pagamento com cartão de crédito, esse valor **não inclui a cobrança feita na criação da assinatura**.<br /> **Ex**.:  Plano anual com no máximo 3 cobranças, days = 365 e charges = 2 (cartão de crédito) ou charges = 3 (boleto) 
`installments` | `Integer` | Informa em quantas vezes o pagamento será parcelado entre cada cobrança

#### Exemplo do objeto

```json
{
    "object": "plan",
    "id": 40651,
    "amount": 31000,
    "days": 30,
    name": "Plano de teste",
    "trial_days": 7,
    "date_created": "2016-03-03T17:31:47.000Z",
    "payment_methods": [
        "boleto"
    ],
    "color": "gold",
    "charges": null,
    "installments": 1
}
```

### Criar um plano

Através dessa rota você poderá criar um plano para ser usado para criar uma assinatura.

Parâmetro | Tipo | Descrição
--- | --- | ---
`api_key` | `String` | Chave de API, que está disponivel na dashboard
`amount` <br />**Obrigatório** | `Integer` | Valor em centavos a ser cobrado recorrentemente, em centavos. <br /> `Ex`.: R$ 49,90 = 4990
`days`<br /> **Obrigatório** | `Integer` | Prazo em dias para cobrança das parcelas
`name`<br /> **Obrigatório** | `String` |  Nome do plano
`payment_methods` | `Array`| Formas de pagamento aceitas nesse plano.<br /> **Valores possíveis:** `credit_card`, `boleto` e `credit_card,boleto`
`trial_days` <br />**Padrão: 0** | `Integer` | Dias para teste gratuito da assinatura. O valor começará a ser cobrado no dia `trial_days + 1`
`charges` | `Integer`| Número de cobranças que poderão ser feitas nesse plano.<br /> **Ex:** Plano cobrado 1x por ano, válido por no máximo 3 anos. Nesse caso, nossos parâmetros serão: `days=365`, `installments=1`, `charges=2` (cartão de crédito) ou `charges=3` (boleto).
`installments` | `Integer` | Número de parcelas entre cada `charge`.<br /> **Ex:** Plano anual, válido por 2 anos, podendo ser divido em até 12 vezes. Nesse caso, nossos parâmetros serão: `days=30`, `installments=12`, `charges=2` (cartão de crédito) ou `charges=3` (boleto).

**Atenção**

**No caso de cartão de crédito, a cobrança feita na ativação da assinatura não é considerada.**

**Se você definir o parâmetro `charges` igual a `null` irá cobrar o usuário indefinidamente, ou até o plano ser cancelado.**

**No caso de boleto sempre terá `installments=1`.**

```endpoint
POST /plans
```

#### Exemplo de requisição

```curl
# Criando um plano
curl -X POST https://api.pagar.m\
-d "days=30" \
-d "name=Plano de teste de 14 dias" \
-d "payment_methods[]=credit_card" \
-d "trial_days=14"

# Criando um plano anual válido por 3 anos com boleto
curl -X POST https://api.pagar.me/1/plans \
-u "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH:x" \
-d "amount=8000" \
-d "days=365" \
-d "name=Plano de três anos" \
-d "payment_methods[]=boleto" \
-d "installments=1" \
-d "charges=3"

# Criando um plano anual parcelado válido por 3 anos com boleto
curl -X POST https://api.pagar.me/1/plans \
-u "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH:x" \
-d "amount=8000" \
-d "days=365" \
-d "name=Plano Anual Parcelado por três anos com boleto" \
-d "payment_methods[]=boleto" \
-d "installments=12" \
-d "charges=3"
```

```ruby
# Criando um plano
require 'pagarme'

PagarMe.api_key = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH"

plan = PagarMe::Plan.new({
   "amount" => 8000,
   "days" => 30,
   "name" => "Plano de teste",
   "payment_methods" => ['credit_card', 'boleto']
})

plan.create

# Criando um plano com 14 dias de teste grátis
plan = PagarMe::Plan.new({
   "amount" => 8000,
   "days" => 365,
   "name" => "Plano de teste de 14 dias",
   "payment_methods" => ['credit_card'],
   "trial_days" => 14
})

plan.create

# Criando um plano anual válido por 3 anos com boleto
plan = PagarMe::Plan.new({
   "amount" => 8000,
   "days" => 365,
   "name" => "Plano Anual",
   "payment_methods" => ['boleto'],
   "installments" => 1,
   "charges" => 3
})

plan.create

# Criando um plano anual parcelado válido por 3 anos com boleto
plan = PagarMe::Plan.new({
   "amount" => 8000,
   "days" => 30,
   "name" => "Plano parcelado de três anos",
   "payment_methods" => ['boleto'],
   "installments" => 12,
   "charges" => 3
})

plan.create
```

```php
// Criando um plano
<?php

require("pagarme-php/Pagarme.php");

Pagarme::setApiKey("ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH");

$plan = new PagarMe_Plan(array(
   "amount" => 8000,
   "days" => 30,
   "name" => "Plano de teste",
   "payment_methods" => array('credit_card', 'boleto')
));

$plan->create();

// Criando um plano com 14 dias de teste grátis
$plan = new PagarMe_Plan(array(
   "amount" => 8000,
   "days" => 30,
   "name" => "Plano de teste de 14 dias",
   "payment_methods" => array('credit_card'),
   "trial_days" => 14
));

$plan->create();

// Criando um plano anual válido por 3 anos com boleto
$plan = new PagarMe_Plan(array(
   "amount" => 8000,
   "days" => 365,
   "name" => "Plano Anual de teste",
   "payment_methods" => array('boleto'),
   "installments" => 1,
   "charges" => 3
));

$plan->create();

// Criando um plano anual parcelado válido por 3 anos com boleto
$plan = new PagarMe_Plan(array(
   "amount" => 8000,
   "days" => 30,
   "name" => "Plano Anual parcelado de três anos",
   "payment_methods" => array('boleto'),
   "installments" => 12,
   "charges" => 3
));

$plan->create();
```

```csharp

// Criando um plano
PagarMeService.DefaultApiKey = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH";

Plan plan = new Plan();

plan.Amount = 8000;
plan.Days = 30;
plan.Name = "Plano de teste";
plan.PaymentMethod = new PaymentMethod[] { 'credit_card', 'boleto' }

plan.Save();

// Criando um plano com 14 dias de teste grátis

Plan plan = new Plan();

plan.Amount = 8000;
plan.Days = 30;
plan.Name = "Plano de teste de 14 dias";
plan.PaymentMethod = new PaymentMethod[] { 'credit_card' }
plan.TrialDays = 14

plan.Save();

// Criando um plano anual válido por 3 anos com boleto

Plan plan = new Plan();

plan.Amount = 8000;
plan.Days = 365;
plan.Name = "Plano Anual de teste";
plan.PaymentMethod = new PaymentMethod[] { 'boleto' }
plan.Installments = 1;
plan.Charges = 3;

plan.Save();

// Criando um plano anual parcelado válido por 3 anos com boleto

Plan plan = new Plan();

plan.Amount = 8000;
plan.Days = 30;
plan.Name = "Plano Anual de Teste";
plan.PaymentMethod = new PaymentMethod[] { 'boleto' }
plan.Installments = 12;
plan.Charges = 3;

plan.Save();

```

#### Exemplo de resposta

```json
{
    "object": "plan",
    "id": 40648,
    "amount": 8000,
    "days": 30,
    "name": "Plano de teste",
    "trial_days": 0
    "date_created": "2016-05-31T02:34:29.442Z",
    "payment_methods": [
        "credit_card",
        "boleto"
    ],
    "charges": null,
    "color": null,
    "installments": 1,
}
```

### Retornar um plano

Retorna um plano.

Parâmetro | Tipo | Descrição
---|---|---
`api_key` <br /> **Obrigatório** | `String` | Chave de API
`id` <br /> **Obrigatório** | `Integer` | Id do plano

```endpoint
GET /plans/{id}
```

#### Exemplo de requisição

```curl
# Retornando um plano
curl -X GET https://api.pagar.me/1/plans/40648 \
-u "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH:x"
```

```ruby
# Retornando um plano
require 'pagarme'

PagarMe.api_key = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH"

plan = PagarMe::Plan.find_by_id(4064)
```

```php
// Retornando um plano
<?php

require("pagarme-php/Pagarme.php");

Pagarme::setApiKey("ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH");

$plan = PagarMe_Plan::findById(4064);
```

```csharp
// Retornando um plano
PagarMeService.DefaultApiKey = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH";

var plan = PagarMeService.GetDefaultService().Plans.Find(4064);
```

#### Exemplo de resposta

```json
{
    "amount": 8000,
    "charges": null,
    "color": null,
    "date_created": "2016-05-31T02:34:29.442Z",
    "days": 30,
    "id": 40648,
    "installments": 1,
    "name": "Plano de teste",
    "object": "plan",
    "payment_methods": [
        "credit_card",
        "boleto"
    ],
    "trial_days": 0
}
```

### Retornar todos os planos

Retorna todos os planos cadastrados em sua conta.

Parâmetro | Descrição
---|---|---
`api_key` <br /> **Obrigatório** | `String` | Chave de API
`page` <br /> **Padrão: 1** | `Integer` | Útil para implementação de uma paginação de resultados
`count` <br /> **Padrão: 10** | `Integer` | Retorna `n` objetos de `plan`

```endpoint
GET /plans
```

#### Exemplo de requisição

```curl
# Retornando todos os planos
curl -X GET https://api.pagar.me/1/plans \
-u "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH:x" \
-d "page=1" \
-d "count=1"
```

```ruby
# Retornando todos os planos
require 'pagarme'

PagarMe.api_key = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH"

plans = PagarMe::Plan.all(1, 1)
```

```php
// Retornando todos os planos
<?php

require("pagarme-php/Pagarme.php");

Pagarme::setApiKey("ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH");

$plans = PagarMe_Plan::all(1, 1);
```

```csharp
// Retornando todos os planos
PagarMeService.DefaultApiKey = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH";

var plans = PagarMeService.GetDefaultService().Plans.FindAll(1, 1);
```

#### Exemplo de resposta

```json
[
    {
        "amount": 8000,
        "charges": 3,
        "color": null,
        "date_created": "2016-05-31T03:39:37.967Z",
        "days": 30,
        "id": 40651,
        "installments": 12,
        "name": "Plano Anual Parcelado de teste no boleto",
        "object": "plan",
        "payment_methods": [
            "boleto"
        ],
        "trial_days": 0
    }
]
```

### Atualizar um plano

Após criar um plano, você pode atualizar o nome e os dias de teste.

Parâmetro | Tipo | Descrição
---|---|---
`api_key` <br /> **Obrigatório** | `String` | Chave de API
`id` <br /> **Obrigatório** | `Integer` | Id do recebedor
`name`<br /> **Pode ser alterado** | `String` | Nome do plano
`trial_days`<br /> **Pode ser alterado** | `Integer` | Dias para teste gratuito da assinatura. O valor começará a ser cobrado no dia `trial_days + 1`

```endpoint
PUT /plans/{id}
```

#### Exemplo de requisição

```curl
# Atualizando um plano
curl -X PUT https://api.pagar.me/1/plans/40648 \
-u "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH:x" \
-d "name=Plano de Teste de Teste" \
-d "trial_days=8"
```

```ruby
# Atualizando um plano
require 'pagarme'

PagarMe.api_key = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH"

plan = PagarMe::Plan.find_by_id("40648")

plan.name = "Plano de Teste de Teste"
plan.trial_days = 8

plan.save
```

```php
// Atualizando um plano
<?php

require("pagarme-php/Pagarme.php");

Pagarme::setApiKey("ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH");

$plan = PagarMe_Plan::findById("40648");

$plan->setName("Plano de Teste de Teste");
$plan->setTrialDays(8);

$plan->save();
```

```csharp
// Atualizando um plano
PagarMeService.DefaultApiKey = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH";

var plan = PagarMeService.GetDefaultService().Plans.Find(4064);

plan.Name = "Plano de Teste de Teste"
plan.TrialDays = 8

plan.Save()
```

#### Exemplo de resposta

```json
{
    "object": "plan",
    "id": 40648,
    "amount": 8000,
    "days": 30,
    "name": "Plano de Teste de Teste",
    "trial_days": 8,
    "date_created": "2016-05-31T02:34:29.442Z",
    "payment_methods": [
        "credit_card",
        "boleto"
    ],
    "charges": null,
    "color": null,
    "installments": 1
}
```
