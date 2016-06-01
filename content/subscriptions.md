## Assinaturas

### Objeto subscription

Propriedade | Tipo | Descrição
---|---|---
`amount` | `integer` | Valor do plano em centavos
 
#### Exemplo do objeto

```json
```

### Criar uma assinatura

Para efetivamente cobrar seu cliente de forma recorrente, você deve criar uma **assinatura**, que atrelada a um **plano**, conterá os dados de cobrança.

A criação de uma `subscription` (assinatura) é parecida com a criação de uma transação. Veja mais detalhes sobre como cobrar seu cliente de forma recorrente [aqui](https://pagar.me/docs/plans-subscriptions/#criando-uma-assinatura).

Parâmetro | Descrição
---|---
`plan_id` (**Obrigatório**) | Id do plano a ser associado a assinatura
`payment_method` (**Obrigatório**) | Forma de pagamento da assinatura

**Atenção**

**Você pode passar os objetos `customer` e `metadata` na criação de uma assinatura, assim como feito na criação de uma transação. A diferença é que a propriedade `customer[email]` é obrigatória na criação da assinatura.**

**As transações criadas pelas assinaturas não passam pelo antifraude, devido a ocorrência de fraudes nesse tipo de serviço serem praticamente nulas.**

```endpoint
POST /subscriptions
```

#### Exemplo de requisição

```curl
# Criando um plano
curl -X POST https://api.pagar.me/1/plans \
-u "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH:x" \
-d "amount=8000" \
-d "days=30" \
-d "name=Plano do Richard" \
-d "payment_methods[]=credit_card,boleto"

# Criando um plano com 14 dias de teste grátis
curl -X POST https://api.pagar.me/1/plans \
-u "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH:x" \
-d "amount=8000" \
-d "days=30" \
-d "name=Plano do Richard" \
-d "payment_methods[]=credit_card" \
-d "trial_days=14"

# Criando um plano anual válido por 3 anos com boleto
curl -X POST https://api.pagar.me/1/plans \
-u "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH:x" \
-d "amount=8000" \
-d "days=365" \
-d "name=Plano Anual do Richard" \
-d "payment_methods[]=boleto" \
-d "installments=1" \
-d "charges=3"

# Criando um plano anual parcelado válido por 3 anos com boleto
curl -X POST https://api.pagar.me/1/plans \
-u "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH:x" \
-d "amount=8000" \
-d "days=30" \
-d "name=Plano Anual Parcelado do Richard" \
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
   "name" => "Plano do Richard",
   "payment_methods" => ['credit_card', 'boleto']
})

plan.create

# Criando um plano com 14 dias de teste grátis
plan = PagarMe::Plan.new({
   "amount" => 8000,
   "days" => 30,
   "name" => "Plano do Richard",
   "payment_methods" => ['credit_card'],
   "trial_days" => 14
})

plan.create

# Criando um plano anual válido por 3 anos com boleto
plan = PagarMe::Plan.new({
   "amount" => 8000,
   "days" => 365,
   "name" => "Plano Anual do Richard",
   "payment_methods" => ['boleto'],
   "installments" => 1,
   "charges" => 3
})

plan.create

# Criando um plano anual parcelado válido por 3 anos com boleto
plan = PagarMe::Plan.new({
   "amount" => 8000,
   "days" => 30,
   "name" => "Plano Anual do Richard",
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
   "name" => "Plano do Richard",
   "payment_methods" => array('credit_card', 'boleto')
));

$plan->create();

// Criando um plano com 14 dias de teste grátis
$plan = new PagarMe_Plan(array(
   "amount" => 8000,
   "days" => 30,
   "name" => "Plano do Richard",
   "payment_methods" => array('credit_card'),
   "trial_days" => 14
));

$plan->create();

// Criando um plano anual válido por 3 anos com boleto
$plan = new PagarMe_Plan(array(
   "amount" => 8000,
   "days" => 365,
   "name" => "Plano Anual do Richard",
   "payment_methods" => array('boleto'),
   "installments" => 1,
   "charges" => 3
));

$plan->create();

// Criando um plano anual parcelado válido por 3 anos com boleto
$plan = new PagarMe_Plan(array(
   "amount" => 8000,
   "days" => 30,
   "name" => "Plano Anual do Richard",
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
plan.Name = "Plano do Richard";
plan.PaymentMethod = new PaymentMethod[] { 'credit_card', 'boleto' }

plan.Save();

// Criando um plano com 14 dias de teste grátis

Plan plan = new Plan();

plan.Amount = 8000;
plan.Days = 30;
plan.Name = "Plano do Richard";
plan.PaymentMethod = new PaymentMethod[] { 'credit_card' }
plan.TrialDays = 14

plan.Save();

// Criando um plano anual válido por 3 anos com boleto

Plan plan = new Plan();

plan.Amount = 8000;
plan.Days = 365;
plan.Name = "Plano Anual do Richard";
plan.PaymentMethod = new PaymentMethod[] { 'boleto' }
plan.Installments = 1;
plan.Charges = 3;

plan.Save();

// Criando um plano anual parcelado válido por 3 anos com boleto

Plan plan = new Plan();

plan.Amount = 8000;
plan.Days = 30;
plan.Name = "Plano Anual do Richard";
plan.PaymentMethod = new PaymentMethod[] { 'boleto' }
plan.Installments = 12;
plan.Charges = 3;

plan.Save();
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
    "name": "Plano do Richard",
    "object": "plan",
    "payment_methods": [
        "credit_card",
        "boleto"
    ],
    "trial_days": 0
}
```
