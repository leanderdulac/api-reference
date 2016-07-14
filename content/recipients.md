## Recebedores

### Objeto recipient

Propriedade | Tipo | Descrição
---|---|---
`anticipatable_volume_percentage` | `Integer` | Porcentagem do valor passível de antecipação que será antecipado automaticamente
`automatic_anticipation_enabled` | `Boolean` | Identifica se o recebedor está habilitado para receber automaticamente ou não o valor disponível para antecipação
`bank_account` | `Object` | Objeto da conta bancária. [Saiba mais](/#objeto-bank_account)
`date_created` | `String` | Data de criação do recebedor<br />**Formato: **ISODate
`date_updated` | `String` | Data de atualização do recebedor<br />**Formato: **ISODate
`id` | `String` | Id do recebedor
`last_transfer` | `String` | Data da última transferência<br />**Formato: **ISODate
`object` | `String` | Nome do tipo do objeto criado/modificado
`transfer_day` | `Integer` | Dia no qual o recebedor vai ser pago. Para cada `transfer_day`, existe uma faixa de pagamento possível.<br />`weekly`: 1 a 5, onde 1 é segunda-feira e 5 é sexta-feira<br />`monthly`: 1 a 31<br />`daily`: 0
`transfer_enabled` | `Boolean` | Identifica se o recebedor está habilitado para receber automaticamente ou não
`transfer_interval` | `String` | Frequência na qual o recebedor irá ser pago.<br />**Valores possíveis:** `daily`, `weekly`, `monthly`

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

Propriedade | Tipo | Descrição
---|---|---
`transfer_interval`<br />**obrigatório** | `String` | Frequência na qual o recebedor irá ser pago.<br />**Valores possíveis: **`daily`, `weekly` e `monthly`
`transfer_day` | `Integer` | Dia no qual o recebedor vai ser pago. Para cada `transfer_day`, existe uma faixa de pagamento possível.<br />`weekly`: 1 a 5, onde 1 é segunda-feira e 5 é sexta-feira<br />`monthly`: 1 a 31<br />`daily`: 0
`transfer_enabled` | `Boolean` | Indica se o recebedor pode receber os pagamentos automaticamente
`bank_account_id` | `String` | Id de uma conta bancária previamente criada.<br />Caso você não tenha essa informação, você pode passar os parâmetros necessários para [criação de uma conta bancária](/#criar-uma-conta-bancária)
`anticipatable_volume_percentage` | `Double` | Valor em porcentagem do quanto é possível antecipar<br />**Valor mínimo: **1<br />**Valor máximo: **100
`automatic_anticipation_enabled` | `Boolean` | Indica se o recebedor irá antecipar automaticamente
`bank_account` | `Object` | Objeto contendo os dados bancários do recebedor. Este objeto, e as suas respectivas propriedades, serão obrigatórios caso não seja informado um `bank_account_id`
`bank_account[bank_code]` | `Integer` | Código do banco
`bank_account[agencia]` | `String` | Agência bancária onde a conta foi criada
`bank_account[agencia_dv]` | `String` | Dígito verificador da agência bancária
`bank_account[conta]` | `String` | Número da conta bancária
`bank_account[conta_dv]` | `String` | Dígito verificador da conta bancária
`bank_account[document_number]` | `String` | Documento identificador do titular da conta (CPF ou CNPJ).
`bank_account[legal_name]` | `String` | Nome completo (se pessoa física) ou razão social (se pessoa jurídica)

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
-d "bank_account[legal_name]=Teste PagarMe"
```

```ruby
require "pagarme"

PagarMe.api_key = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH"

# Criando um recebedor com uma conta bancária existente 
recipient = PagarMe::Recipient.new({
	transfer_interval: "monthly",
	transfer_day: 8,
	transfer_enabled: true,
	bank_account_id: 13459415
})

recipient.create()

# Criando um recebedor com antecipação automática
recipient = PagarMe::Recipient.new({
  transfer_interval: "monthly",
  transfer_day: 8,
  transfer_enabled: true,
  bank_account_id: 13459415,
  automatic_anticipation_enabled: false,
  anticipatable_volume_percentage: 88
})

recipient.create()

# Criando um recebedor com uma conta bancária nova
recipient = PagarMe::Recipient.new({
  transfer_interval: "weekly",
  transfer_day: 1,
  transfer_enabled: true,
  bank_account: PagarMe::BankAccount.new({
    bank_code: 184,
    agencia: "0808",
    agencia_dv: "8",
    conta: "08808",
    conta_dv: "8",
    document_number: "80802694594",
    legal_name: "Teste PagarMe"
  })
})

recipient.create()
```

```php
<?php

require("pagarme-php/Pagarme.php");

PagarMe::setApiKey("ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH");

// Criando um recebedor com uma conta bancária existente 
$recipient = new PagarMe_Recipient(array(
	"transfer_interval" => "monthly",
	"transfer_day" => 8,
	"transfer_enabled" => true,
	"bank_account_id" => 13459415
));

$recipient->create();

// Criando um recebedor com antecipação automática
$recipient = new PagarMe_Recipient(array(
  "transfer_interval" => "monthly",
  "transfer_day" => 8,
  "transfer_enabled" => true,
  "bank_account_id" => "13459415",
  "automatic_anticipation_enabled" => false,
  "anticipatable_volume_percentage" => 88
));

$recipient->create();

// Criando um recebedor com uma conta bancária nova
$recipient = new PagarMe_Recipient(array(
  "transfer_interval" => "weekly",
  "transfer_day" => 1,
  "transfer_enabled" => true,
  "bank_account" => array(
    "bank_code" => 184,
    "agencia" => "0808",
    "agencia_dv" => "8",
    "conta" => "08808",
    "conta_dv" => "8",
    "document_number" => "80802694594",
    "legal_name" => "Teste PagarMe"
  )
));

$recipient->create();

?>
```

```csharp
using PagarMe;

PagarMeService.DefaultApiKey = "ak_test_qtDOZfF5K0VDn17k04NxnQPIZ3r5wV";

// Criando um recebedor com uma conta bancária existente
Recipient recipient = new Recipient()
{
	BankAccount = PagarMeService.GetDefaultService ().BankAccounts.Find (13459415),
	TransferDay = 8,
	TransferEnabled = true,
	TransferInterval = TransferInterval.Monthly
};
recipient.Save();

// Criando um recebedor com antecipação automática
Recipient recipient = new Recipient()
{
	BankAccount = PagarMeService.GetDefaultService ().BankAccounts.Find (13459415),
	TransferDay = 8,
	TransferEnabled = true,
	TransferInterval = TransferInterval.Monthly,
	AnticipatableVolumePercentage = 88,
	AutomaticAnticipationEnabled = true
};
recipient.Save();

// Criando um recebedor com uma conta bancária nova

// Criando uma conta bancária
BankAccount BankAccount = new BankAccount()
{
	BankCode = "184",
	Agencia = "0808",
	AgenciaDv = "8",
	Conta = "08808",
	ContaDv = "8",
	DocumentNumber = "80802694594",
	LegalName = "Teste PagarMe"
};
BankAccount.Save ();

Recipient recipient = new Recipient()
{
	BankAccount = BankAccount,
	TransferDay = 8,
	TransferEnabled = true,
	TransferInterval = TransferInterval.Monthly
};
recipient.Save();
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
		"legal_name": "TESTE PAGARME",
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

Propriedade | Tipo | Descrição
---|---|--
`id` **obrigatório** | `String` | Id do recebedor

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
require "pagarme"

PagarMe.api_key = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH"

recipient = PagarMe::Recipient.find_by_id("re_cionevq7g003sxr6dbcngs1xe")
```

```php
<?php

require("pagarme-php/Pagarme.php");

PagarMe::setApiKey("ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH");

$recipient = PagarMe_Recipient::findById("re_cionevq7g003sxr6dbcngs1xe");

?>
```

```csharp
using PagarMe;

PagarMeService.DefaultApiKey = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH";

Recipient = PagarMeService.GetDefaultService ().Recipients.Find("re_cionevq7g003sxr6dbcngs1xe");

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
		"legal_name": "TESTE PAGARME",
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

Propriedade | Tipo | Descrição
---|---|---
`page` | `Integer` | Útil para implementação de uma paginação de resultados<br />**Valor padrão: **1
`count` | `Integer` | Retorna `n` objetos de `recipient`<br />**Valor padrão: **10

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
require "pagarme"

PagarMe.api_key = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH"

recipients = PagarMe::Recipient.all(1, 1)
```

```php
<?php

require("pagarme-php/Pagarme.php");

PagarMe::setApiKey("ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH");

$recipients = PagarMe_Recipient::all(1, 1);

?>
```

```csharp
using PagarMe;

PagarMeService.DefaultApiKey = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH";

List<Recipient> Recipients = PagarMeService.GetDefaultService ().Recipients.FindAll();
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
			"legal_name": "TESTE PAGARME",
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

Parâmetro | Tipo | Descrição
---|---|---
`id` **obrigatório** | `String` | Id do recebedor
`transfer_interval` | `String` | Frequência na qual o recebedor irá ser pago.<br />**Valores possíveis:** `daily`, `weekly` e `monthly`
`transfer_day` | `Integer` | Dia no qual o recebedor vai ser pago. Para cada `transfer_day`, existe uma faixa de pagamento possível.<br />`weekly`: 1 a 5, onde 1 é segunda-feira e 5 é sexta-feira<br />`monthly`: 1 a 31<br />`daily`: 0
`transfer_enabled` | `Boolean` | Indica se o recebedor pode receber os pagamentos automaticamente
`bank_account_id` | `String` | Id de uma conta bancária previamente criada
`anticipatable_volume_percentage` | `Double` | Valor em porcentagem do quanto é possível antecipar
`automatic_anticipation_enabled` | `Boolean` | Indica se o recebedor irá antecipar automaticamente

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
require "pagarme"

# Atualizando um recebedor com uma outra conta bancária existente
recipient = PagarMe::Recipient.find_by_id("re_cim2ikkfy000hyg6dsfa3uotl")
recipient.bank_account_id = 13709856
recipient.save()

# Atualizando um recebedor para usar antecipação automática
recipient = PagarMe::Recipient.find_by_id("re_cionevq7g003sxr6dbcngs1xe")
recipient.automatic_anticipation_enabled = true
recipient.anticipatable_volume_percentage = 88
recipient.save()

# Atualizando um recebedor com novo dia para transferência 
recipient = PagarMe::Recipient.find_by_id("re_cionevq7g003sxr6dbcngs1xe")
recipient.transfer_day = 5
recipient.transfer_interval = "weekly"
recipient.save()
```

```php
<?php

require("pagarme-php/Pagarme.php");

PagarMe::setApiKey("ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH");

// Atualizando um recebedor com uma outra conta bancária existente
$recipient = PagarMe_Recipient::findById("re_cim2ikkfy000hyg6dsfa3uotl");
$recipient->setBankAccountId(13709856);
$recipient->save();

// Atualizando um recebedor para usar antecipação automática
$recipient = PagarMe_Recipient::findById("re_cionevq7g003sxr6dbcngs1xe");
$recipient->setAutomaticAnticipationEnabled(true);
$recipient->setAnticipatableVolumePercentage(88);
$recipient->save();

// Atualizando um recebedor com novo dia para transferência 
$recipient = PagarMe_Recipient::findById("re_cionevq7g003sxr6dbcngs1xe");
$recipient->setTransferDay(5);
$recipient->setTransferInterval("weekly");
$recipient->save();

?>
```

```csharp
using PagarMe;

PagarMeService.DefaultApiKey = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH";

// Atualizando um recebedor com uma outra conta bancária existente
Recipient Recipient = PagarMeService.GetDefaultService ().Recipients.Find("re_cim2ikkfy000hyg6dsfa3uotl");
Recipient.BankAccount = PagarMeService.GetDefaultService ().BankAccounts.Find(13709856);
Recipient.Save();

// Atualizando um recebedor para usar antecipação automática
Recipient Recipient = PagarMeService.GetDefaultService ().Recipients.Find("re_cionevq7g003sxr6dbcngs1xe");
Recipient.AutomaticAnticipationEnabled = true;
Recipient.AnticipatableVolumePercentage = 88;
Recipient.Save();

// Atualizando um recebedor com novo dia para transferência 
Recipient Recipient = PagarMeService.GetDefaultService ().Recipients.Find("re_cionevq7g003sxr6dbcngs1xe");
Recipient.TransferDay = 5;
Recipient.TransferInterval = TransferInterval.Weekly;
Recipient.Save();
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
		"legal_name": "TESTE PAGARME",
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

Parâmetro | Tipo | Descrição
---|---|---
`id` **obrigatório** | `String` | Id do recebedor

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
